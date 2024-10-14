"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TaskData } from "@/utils/interface";
import { updateTask, addTask, deleteTask, fetchTask } from "@/utils/database";
import CreateSprint from "@/components/CreateSprint";
import SprintBoard from "@/components/sprintBoard";
import HorizontalNavBar from "@/components/HorizontalNavBar";
import ThemeSelector from "@/components/ThemeSelector";
import { useTheme } from "@/components/ThemeContext";

export default function sprintBoardHome() {
  const [isOpen, setIsOpen] = useState(false);
  const [databases, setDatabases] = useState<string[]>([]);
  const [taskOpen, setTaskOpen] = useState<boolean>(false);
  const [createOpen, setCreateOpen] = useState<boolean>(false);
  const { currentTheme, setCurrentTheme } = useTheme();
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState<boolean>(false);

  const bounty = {
    title: "Bounty Title",
    description: "Description",
  };
  const [createSprintOpen, setCreateSprintOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  const handleThemeChange = (newTheme: string) => {
    setCurrentTheme(newTheme);
    setIsThemeSelectorOpen(false);
  };

  // useEffect(() => {
  //   const getDatabase = async () => {
  //     const data = await fetchTask();
  //     console.log(data);
  //     setDatabases(data);
  //   };
  //   console.log("Getting Database");
  //   getDatabase();
  // }, []);

  return (
    <>
      <HorizontalNavBar setThemeSelectorOpen={setIsThemeSelectorOpen} />
      <main
        className="w-full flex min-h-screen bg-cover bg-center"
        style={{ 
          backgroundImage: `url('${currentTheme}')`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center' }}
      >
        <div className="flex-1 flex flex-col items-center justify-between p-4 ml-64">
          <div className="w-full mt-12">
            <SprintBoard
              sprintOpen={taskOpen}
              setSprintOpen={setTaskOpen}
              createOpen={createOpen}
              setCreateOpen={setCreateOpen}
            />
            {/* Add BacklogCard component here */}
          </div>
        </div>
        {/* <PopUp isOpen={createOpen} setIsOpen={setCreateOpen}>
          <AddTaskPage setIsOpen={setCreateOpen} />
        </PopUp> */}
        {/* <PopUp isOpen={createSprintOpen} setIsOpen={setCreateSprintOpen}>
          <CreateSprint setIsOpen={setCreateSprintOpen} />
        </PopUp> */}
        {isThemeSelectorOpen && (
          <ThemeSelector 
            onThemeChange={handleThemeChange}
            onClose={() => setIsThemeSelectorOpen(false)}
          />
        )}
      </main>
    </>
  );
}