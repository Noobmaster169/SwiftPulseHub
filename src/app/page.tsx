"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import PopUp from "@/components/PopUp";
import AddTaskPage from "@/components/AddTask";
import BacklogCard from "@/components/BacklogCard";
import IndividualTaskInfo from "@/components/IndividualTask";
import NavBar from "@/components/NavigatorBar";
import { TaskData } from "@/utils/interface";
import { updateTask, addTask, deleteTask, fetchTask } from "@/utils/database";
import HorizontalNavbar from "@/components/HorizontalNavBar";
import ThemeSelector from "@/components/ThemeSelector";
import { useTheme } from "@/components/ThemeContext";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [databases, setDatabases] = useState<string[]>([]);
  const [taskOpen, setTaskOpen] = useState<boolean>(false);
  const [createOpen, setCreateOpen] = useState<boolean>(false);
  const { currentTheme, setCurrentTheme } = useTheme();
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);
  
  const bounty = {
    title: "Bounty Title",
    description: "Description",
  };
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

  const handleThemeChange = (newTheme: string) => {
    setCurrentTheme(newTheme);
    setIsThemeSelectorOpen(false);
  };


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
    <>
    <HorizontalNavbar setThemeSelectorOpen={setIsThemeSelectorOpen} />
      <main
        className="w-full flex min-h-screen bg-cover bg-center"
        style={{ 
          backgroundImage: `url('${currentTheme}')`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center', }}
      > 
        <NavBar/>
        <div className="flex-1 flex flex-col items-center justify-between p-4 ml-64">
          <div className="w-full mt-12">
            <BacklogCard
              taskOpen={taskOpen}
              setTaskOpen={setTaskOpen}
              createOpen={createOpen}
              setCreateOpen={setCreateOpen}
            />
          </div>
        </div>
        <PopUp isOpen={createOpen} setIsOpen={setCreateOpen}>
          <AddTaskPage setIsOpen={setCreateOpen} />
        </PopUp>
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