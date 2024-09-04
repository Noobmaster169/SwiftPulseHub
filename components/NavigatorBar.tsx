"use client";
"use client";
import Link from 'next/link';
import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go';
import { usePathname } from 'next/navigation';

const links = [
    { name: 'Product Backlog', href: '/', icon: GoSidebarCollapse },
    { name: 'Sprint Board', href: '/sprint-board', icon: GoSidebarExpand },
];

export default function NavBar() {
    const [dropdown, setDropdown] = useState<boolean>(false);
    return (
        <nav className="h-full w-64 p-6 dark:bg-gray-900 fixed top-0 left-0 z-50 border-r-2 border-white">
            <div className="flex flex-col h-full justify-center">
                <button
                    className="md:hidden p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
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
                    className={`flex flex-col items-center ${pathname === link.href ? 'text-green-400 font-semibold text-2xl' : 'font-semibold text-2xl my-4'}`}
                >
                    <link.icon className="mb-2" size={32} />
                    <h2>{link.name}</h2>
                </Link>
            ))}
        </>
    );
}