"use client";
import Image from "next/image";
import { useState } from "react";
import PopUp from "@/components/PopUp";
import AddTaskPage from "@/components/AddTask";
import BacklogCard from "@/components/BacklogCard";
import IndividualTaskInfo from "@/components/IndividualTask";
import DropDown from "@/components/DropDown/DropDown";
import NavBar  from "@/components/NavigatorBar";

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
    <main className="w-full flex min-h-screen ">
    <NavBar />
    <div className="flex-1 flex flex-col items-center justify-between p-24 ml-64">
      <div className="w-full mt-8">
        <BacklogCard /> {/* Add BacklogCard component here */}
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Open Pop Up
        </button>
      </div>
      <PopUp isOpen={isOpen} setIsOpen={setIsOpen}>
        <IndividualTaskInfo /> {/** Add Pop Up task detail */}
      </PopUp>
      <section className="w-full mt-10">
        <h2 className="text-xl font-bold mb-4">Task Form</h2>
        {/*<DropDown /> {/* Adding your DropDown component */}
      </section>
      <AddTaskPage />
      </div>
    </main>
  );
}
