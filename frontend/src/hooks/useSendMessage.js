import { useState } from "react";
import useConversationStore from "../zustand/useConversationStore";
import axios from "axios";

import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } =
    useConversationStore();

  const sendMessage = async (message) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `/api/messages/send/${selectedConversation._id}`,
        { message }
      );

      const messagesData = res.data;
      if (messagesData.error) {
        throw new Error(messagesData.error);
      }
      setMessages([...messages, messagesData]);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
