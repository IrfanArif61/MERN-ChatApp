import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversationStore from "../../zustand/useConversationStore";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSearchKeyword } = useConversationStore();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search) return;
    if (search.length < 3) {
      return toast.error("Please enter at least 3 characters to search");
    }

    setSearchKeyword(search);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setSearchKeyword(e.target.value); // Update search keyword in real-time
        }}
      />
      <button
        type="submit"
        className="btn btn-circle bg-gray-300 text-[#393e46cd] hover:text-gray-300"
      >
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
