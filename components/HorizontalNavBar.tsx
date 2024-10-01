import React, { useState, useRef, useEffect } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5'; // Importing menu and close icons from Ionicons
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar"
import 'tailwindcss/tailwind.css'; // Ensure Tailwind is set up correctly

const HorizontalNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref to track the dropdown element

  const onToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Toggle dropdown when avatar is clicked
  const onToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="bg-white shadow-md z-50 w-full fixed top-0 left-0"> {/* Added z-50 and fixed positioning */}
        <nav className="flex justify-between items-center w-[92%] mx-auto h-16">
          <div>
            <img
              className="w-19 h-20 cursor-pointer" 
              src="/logo.png"
              alt="logo"
            />
          </div>

          {/* Right-aligned content */}
          <div className="flex items-center gap-6">
            {/* Links for notifications, help, settings */}
            <ul className="flex items-center gap-8">
              <li>
                <a className="hover:text-gray-500" href="#">
                  Notifications
                </a>
              </li>
              <li>
                <a className="hover:text-gray-500" href="#">
                  Help
                </a>
              </li>
              <li>
                <a className="hover:text-gray-500" href="#">
                  Settings
                </a>
              </li>
            </ul>

            {/* Avatar with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <Avatar onClick={onToggleDropdown} className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              
              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                  <a href="#" className="block px-4 py-2 text-sm font-bold text-black hover:bg-gray-100">
                    Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm font-bold text-black hover:bg-gray-100">
                    Theme
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm font-bold text-black hover:bg-red-400">
                    Logout
                  </a>
                </div>
              )}
            </div>

            {/* Hamburger menu for mobile */}
            <button onClick={onToggleMenu} className="md:hidden text-3xl cursor-pointer">
              {menuOpen ? <IoClose /> : <IoMenu />}
            </button>
          </div>
        </nav>
      </header>

      {/* Spacer below the navbar */}
      <div className="h-10"></div>
    </>
  );
};

export default HorizontalNavbar;
