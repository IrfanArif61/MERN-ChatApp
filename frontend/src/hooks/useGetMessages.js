import { useEffect, useState } from "react";
import useConversationStore from "../zustand/useConversationStore";
import toast from "react-hot-toast";
import axios from "axios";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } =
    useConversationStore();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `/api/messages/${selectedConversation._id}`
        );

        const messagesData = res.data;
        if (messagesData.error) {
          throw new Error(messagesData.error);
        }
        setMessages(messagesData);
      } catch (error) {
        const message = error.response?.data?.message || error.message;
        toast.error(message);
        console.error("Error fetching messages:", message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
