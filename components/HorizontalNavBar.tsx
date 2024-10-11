import React, { useState, useRef, useEffect } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import 'tailwindcss/tailwind.css';

interface HorizontalNavbarProps {
  setThemeSelectorOpen: (isOpen: boolean) => void;
}

const HorizontalNavbar: React.FC<HorizontalNavbarProps> = ({ setThemeSelectorOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onToggleAvatarDropdown = () => {
    setAvatarDropdownOpen(!avatarDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAvatarDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md z-50 w-full fixed top-0 left-0">
      <nav className="flex justify-between items-center w-[92%] mx-auto h-16">
        <div>
          <img
            className="w-19 h-20 cursor-pointer" 
            src="/logo.png"
            alt="logo"
          />
        </div>

        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-8">
            <li>
              <a className="hover:text-gray-500" href="signIn">
                Sign In
              </a>
            </li>
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
            <li>
              <div className="hover:text-gray-500" onClick={() => setThemeSelectorOpen(true)}>
                Set Theme
              </div>
            </li>
          </ul>

          {/*<div className="relative" ref={dropdownRef}>
            <Avatar onClick={onToggleAvatarDropdown} className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            {avatarDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <a href="#" className="block px-4 py-2 text-sm font-bold text-black hover:bg-gray-100">
                  Profile
                </a>
                <button
                  className="block px-4 py-2 text-sm font-bold text-black hover:bg-gray-100 w-full text-left"
                  onClick={() => setThemeSelectorOpen(true)}
                >
                  Theme
                </button>
                <a href="#" className="block px-4 py-2 text-sm font-bold text-black hover:bg-red-100">
                  Logout
                </a>
              </div>
            )}
          </div>*/}

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-3xl cursor-pointer">
            {menuOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default HorizontalNavbar;