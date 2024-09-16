"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import PopUp from "@/components/PopUp";
import AddTaskPage from "@/components/AddTask";
import BacklogCard from "@/components/BacklogCard";
import IndividualTaskInfo from "@/components/IndividualTask";
import DropDown from "@/components/DropDown/DropDown";
import NavBar from "@/components/NavigatorBar";
import { TaskData } from "@/utils/interface";
import { updateTask, addTask, deleteTask, fetchTask } from "@/utils/database";
import CreateSprint from "@/components/CreateSprint";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [databases, setDatabases] = useState<string[]>([]);
  const [taskOpen, setTaskOpen] = useState<boolean>(false);
  const [createOpen, setCreateOpen] = useState<boolean>(false);
  const bounty = {
    title: "Bounty Title",
    description: "Description",
  };
  const [createSprintOpen, setCreateSprintOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const getDatabase = async () => {
      const data = await fetchTask();
      console.log(data);
      setDatabases(data);
    };
    console.log("Getting Database");
    getDatabase();
  }, []);

  const mokcupData: TaskData[] = [
    {
      taskName: "My Example Task 1",
      description: "My Example Description 1",
      type: "Story",
      status: "Not Started",
      storyPoint: "5",
      assignedTo: "Mario",
      projectStage: "planning",
      priority: "High",
      tags: ["Tag1", "Tag2", "Tag3"],
      isDeleted: false,
    },
    {
      taskName: "My Example Task 2",
      description: "My Example Description 2",
      type: "Story",
      status: "In Progress",
      storyPoint: "3",
      assignedTo: "Shanwu",
      projectStage: "planning",
      priority: "Low",
      tags: ["Tag1", "Tag2", "Tag3"],
      isDeleted: false,
    },
    {
      taskName: "My Example Task 3",
      description: "My Example Description 3",
      type: "Story",
      status: "In Progress",
      storyPoint: "6",
      assignedTo: "Shanwu",
      projectStage: "planning",
      priority: "Medum",
      tags: ["Tag1", "Tag2", "Tag3"],
      isDeleted: false,
    },
  ];

  return (
    <main
      className="w-full flex min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background/background1.png')" }}
    >
      <NavBar />
      <div className="flex-1 flex flex-col items-center justify-between p-4 ml-64">
        <div className="w-full">
          <BacklogCard
            taskOpen={taskOpen}
            setTaskOpen={setTaskOpen}
            createOpen={createOpen}
            setCreateOpen={setCreateOpen}
          />{" "}
          {/* Add BacklogCard component here */}
        </div>
      </div>
      <PopUp isOpen={createOpen} setIsOpen={setCreateOpen}>
        <AddTaskPage setIsOpen={setCreateOpen} />
      </PopUp>
      <div className="fixed bottom-4 right-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setCreateSprintOpen(true)}
        >
          Create Sprint
        </button>
      </div>

      <PopUp isOpen={createSprintOpen} setIsOpen={setCreateSprintOpen}>
        <CreateSprint setIsOpen={setCreateSprintOpen} />
      </PopUp>
    </main>
  );
}
