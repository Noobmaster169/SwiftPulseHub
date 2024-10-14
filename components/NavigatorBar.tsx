"use client";
import Link from 'next/link';
import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go';
import { LiaClipboardListSolid } from "react-icons/lia";
import { RiKanbanView2 } from "react-icons/ri";
import { RiTeamLine } from "react-icons/ri";
import { usePathname } from 'next/navigation';

const links = [
    { name: 'Product Backlog', href: '/', icon: LiaClipboardListSolid },
    { name: 'Sprint Board', href: '/sprintBoard', icon: RiKanbanView2 },
    { name: 'Team Board', href: '/dashboard', icon: RiTeamLine}
];

export default function NavBar() {
    const [dropdown, setDropdown] = useState<boolean>(false);
    return (
        <nav className={"h-full w-64 p-6 fixed top-0 left-0 z-40 bg-white bg-opacity-30 backdrop-blur-lg dark:bg-gray-700 dark:bg-opacity-30 dark:backdrop-blur-lg"/*border-r-2 border-white*/}>
            <div className="flex flex-col h-full justify-center">
                <button
                    className="md:hidden p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 "
                    onClick={() => setDropdown(!dropdown)}
                >
                    {dropdown ? <IoMdClose /> : <GiHamburgerMenu />}
                </button>
                <div className="flex flex-col mt-4">
                    <PCNavLinks />
                </div>
            </div>
        </nav>
    );
}

function PCNavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => (
                <Link
                    key={link.name}
                    href={link.href}
                    className={`flex flex-col items-center my-10 ${pathname === link.href ? 'text-white font-semibold text-xl' : 'font-semibold text-xl my-4'}`}
                >
                    <link.icon className="mb-2" size={32} />
                    <h2>{link.name}</h2>
                </Link>
            ))}
        </>
    );
}