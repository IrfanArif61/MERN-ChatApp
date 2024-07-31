//models
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    //checking if convo btw 2 person already exists
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      // creating new conversation if it dont exists
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    //create new message
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      // add new message to messages array of Conversation model
      conversation.messages.push(newMessage._id);
    }

    //run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    //xocket.io functionality
    // io.emit send to all clients but io.to send to specific clients

    //socket.broadcast.emit -> Sends to all clients except the sender.
    // socket.to('room').emit -> Sends to all clients in a specific room except the sender.

    const receiverSocketId = getReceiverSocketId(receiverId);

    console.log("ReceiverSocketId: " + receiverSocketId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in send message controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    })
      .populate("messages")
      .sort({ "conversations.updatedAt": -1 }); // populate give not reference but actual messages

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in get messages controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
