import { useSocketContext } from "../../context/SocketContext";
import useConversationStore from "../../zustand/useConversationStore";

const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } =
    useConversationStore();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isUserOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-[#1d232a]" : "hover:bg-[#1d232a]"
        }`}
        onClick={() => setSelectedConversation(conversation)}
        title={isUserOnline ? "Online now" : ""}
      >
        <div className={`avatar ${isUserOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="Profile" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-[#EEEEEE]">{conversation.fullName}</p>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
