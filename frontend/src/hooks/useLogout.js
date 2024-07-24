import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/logout");

      if (res.status >= 200 && res.status < 300) {
        // Removing the user data from local storage
        localStorage.removeItem("chatapp-user");

        // Setting the user data to null in context
        setAuthUser(null);

        toast.success("You have logged out successfully!");
        return { success: true };
      } else {
        toast.error(
          res.data.message ||
            "An error occurred during logout. Please try again."
        );
        return { success: false };
      }
    } catch (error) {
      toast.error(error.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
