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
