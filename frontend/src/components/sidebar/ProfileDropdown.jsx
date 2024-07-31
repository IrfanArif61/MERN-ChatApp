import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { useAuthContext } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";

const ProfileDropdown = () => {
  const { authUser } = useAuthContext();
  const { loading, logout } = useLogout();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="mt-2">
        <MenuButton className="">
          <img
            src={authUser.profilePic}
            alt="Profile"
            className="w-8 h-8 rounded-full cursor-pointer"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[#121111] shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-white data-[focus]:bg-[#1f1d1dd1] data-[focus]:text-gray-200"
            >
              Account settings
            </a>
          </MenuItem>

          <MenuItem>
            {!loading ? (
              <button
                onClick={logout}
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-white data-[focus]:bg-[#1f1d1dd1] data-[focus]:text-gray-200"
              >
                Sign out
              </button>
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};

export { ProfileDropdown };
