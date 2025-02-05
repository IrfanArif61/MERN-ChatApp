import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversationStore from "../../zustand/useConversationStore";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } =
    useConversationStore();

  useEffect(() => {
    //cleanup function so that chat get unselected on logout
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-[#1d232a] px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-[#eeeeeec1] font-bold">
              {selectedConversation.fullName}
            </span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-[#ffffff] font-semibold flex flex-col items-center gap-2">
        <p>
          Welcome{" "}
          <span className="text-[#ffffff] font-extrabold ">
            {authUser.fullName}
          </span>{" "}
          👋{" "}
        </p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
