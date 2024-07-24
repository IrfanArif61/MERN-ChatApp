import { create } from "zustand";

const useConversationStore = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  searchKeyword: "",
  setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
}));

export default useConversationStore;
