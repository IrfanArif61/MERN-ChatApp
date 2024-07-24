import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";
import useConversationStore from "../../zustand/useConversationStore";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  const { searchKeyword } = useConversationStore();

  const filteredConversations = conversations.filter((conversation) =>
    conversation.fullName.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {filteredConversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === filteredConversations.length - 1}
        />
      ))}

      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  );
};

export default Conversations;
