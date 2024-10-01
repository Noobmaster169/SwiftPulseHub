"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TaskData } from "@/utils/interface";
import { updateTask, addTask, deleteTask, fetchTask } from "@/utils/database";
import CreateSprint from "@/components/CreateSprint";
import SprintBoard from "@/components/sprintBoard";
import HorizontalNavBar from "@/components/HorizontalNavBar";

export default function sprintBoardHome() {
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

//   useEffect(() => {
//     const getDatabase = async () => {
//       const data = await fetchTask();
//       console.log(data);
//       setDatabases(data);
//     };
//     console.log("Getting Database");
//     getDatabase();
//   }, []);


  return (
    <>
    <HorizontalNavBar />
      <main
        className="w-full flex min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/background/background1.png')" }}
      >
        <div className="flex-1 flex flex-col items-center justify-between p-4 ml-64">
          <div className="w-full">
            <SprintBoard
              sprintOpen={taskOpen}
              setSprintOpen={setTaskOpen}
              createOpen={createOpen}
              setCreateOpen={setCreateOpen}
            />{" "}
            {/* Add BacklogCard component here */}
          </div>
        </div>
        {/* <PopUp isOpen={createOpen} setIsOpen={setCreateOpen}>
          <AddTaskPage setIsOpen={setCreateOpen} />
        </PopUp> */}
        {/* <PopUp isOpen={createSprintOpen} setIsOpen={setCreateSprintOpen}>
          <CreateSprint setIsOpen={setCreateSprintOpen} />
        </PopUp> */}
      </main>
    </>
  );
}
