import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/users");

        // console.log("API Response: ", res.data); // Log API response

        const userData = res.data;
        if (userData.error) {
          throw new Error(userData.error);
        }

        setConversations(userData);
        // console.log("Conversations set: ", userData); // Log state update
      } catch (error) {
        const message = error.response?.data?.message || error.message;
        toast.error(message);
        console.error("Error fetching conversations: ", message); // Log error
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
