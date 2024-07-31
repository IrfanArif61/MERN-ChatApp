import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversationStore from "../../zustand/useConversationStore";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";

import { ProfileDropdown } from "../../components/sidebar/ProfileDropdown";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSearchKeyword } = useConversationStore();
  const { authUser } = useAuthContext();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search) return;
    if (search.length < 3) {
      return toast.error("Please enter at least 3 characters to search");
    }

    setSearchKeyword(search);
  };

  return (
    <>
      <div className="flex justify-center items-center gap-4">
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
        </form>

        <ProfileDropdown />
      </div>
    </>
  );
};

export default SearchInput;
