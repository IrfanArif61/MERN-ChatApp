import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    setLoading(true);
    if (!username || !password) {
      toast.error("Login failed. username and password are required.");
      setLoading(false);
      return { success: false };
    }
    try {
      const res = await axios.post("/api/auth/login", { username, password });

      if (res.status >= 200 && res.status < 300) {
        const userData = res.data;
        if (userData.error) {
          // Throw an error to be caught in the catch block
          throw new Error(userData.error);
        }
        localStorage.setItem("chatapp-user", JSON.stringify(userData));
        setAuthUser(userData);
        toast.success("You have logged in successfully!");
        return { success: true };
      } else {
        toast.error(
          res.data.message ||
            "Login failed. Please check your credentials and try again."
        );
        return { success: false };
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
