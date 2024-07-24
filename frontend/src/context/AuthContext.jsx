import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

//useContext(AuthContext): This hook allows any component to subscribe to the AuthContext. It simplifies the consumption of the context by returning the context value directly.

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  //checking localStorage for a stored user under the key "chatapp-user". If found, it parses the stored JSON string into an object; otherwise, it sets authUser to null
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chatapp-user")) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
