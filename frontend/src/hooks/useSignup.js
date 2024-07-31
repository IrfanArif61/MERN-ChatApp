// import { useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";
// import { data } from "autoprefixer";

// const useSignUp = () => {
//   const [loading, setLoading] = useState(false);
//   const { setAuthUser } = useAuthContext();

//   const handleSignup = async ({
//     fullName,
//     username,
//     password,
//     confirmPassword,
//     gender,
//   }) => {
//     if (!fullName || !username || !password || !confirmPassword || !gender) {
//       toast.error("Please fill in all fields");
//       return { success: false };
//     }

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return { success: false };
//     }

//     if (password.length < 6) {
//       toast.error("Password must be at least 6 characters long");
//       return { success: false };
//     }

//     setLoading(true);

//     try {
//       const res = await axios.post("api/auth/signup", {
//         fullName,
//         username,
//         password,
//         confirmPassword,
//         gender,
//       });

//       if (res.status >= 200 && res.status < 300) {
//         const userData = res.data;
//         if (userData.error) {
//           throw new Error(userData.error);
//         }
//         // Storing the user data in local storage
//         localStorage.setItem("chatapp-user", JSON.stringify(userData));

//         // Setting the user data in context
//         setAuthUser(userData);

//         toast.success("You have signed up successfully!");
//         return { success: true };
//       } else {
//         toast.error(
//           res.data.message ||
//             "Signup failed. Please check your details and try again."
//         );
//         return { success: false };
//       }
//     } catch (error) {
//       const message = error.response?.data?.message || error.message;
//       toast.error(message);
//       return { success: false };
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loading, handleSignup };
// };

// export default useSignUp;

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const handleSignup = async (formData) => {
    if (
      !formData.get("fullName") ||
      !formData.get("username") ||
      !formData.get("password") ||
      !formData.get("confirmPassword") ||
      !formData.get("gender")
    ) {
      toast.error("Please fill in all fields");
      return { success: false };
    }

    if (formData.get("password") !== formData.get("confirmPassword")) {
      toast.error("Passwords do not match");
      return { success: false };
    }

    if (formData.get("password").length < 6) {
      toast.error("Password must be at least 6 characters long");
      return { success: false };
    }

    setLoading(true);

    try {
      const res = await axios.post("/api/auth/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status >= 200 && res.status < 300) {
        const userData = res.data;
        if (userData.error) {
          throw new Error(userData.error);
        }
        // Storing the user data in local storage
        localStorage.setItem("chatapp-user", JSON.stringify(userData));

        // Setting the user data in context
        setAuthUser(userData);

        toast.success("You have signed up successfully!");
        return { success: true };
      } else {
        toast.error(
          res.data.message ||
            "Signup failed. Please check your details and try again."
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

  return { loading, handleSignup };
};

export default useSignUp;
