"use client";
import Image from "next/image";
import { title } from "process";
import { useState } from "react";
import PopUp from "@/components/PopUp";
import AddTaskPage from "@/components/AddTask";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const bounty = {
    title: "Bounty Title",
    description: "Description",
  };

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <button onClick={openModal}>Open Pop Up</button>
      </div>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      <PopUp isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="m-6 bg-white p-4 rounded-lg w-full">
          <h1 className="text-2xl font-bold">Example Data</h1>
          <p>Example Data</p>
        </div>
      </PopUp>
      <AddTaskPage />
    </main>
  );
}
