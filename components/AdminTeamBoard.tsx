"use client";
import { SetStateAction, useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import MiniPopUp from "./MiniPopUp";
import ProceedDelete from "./ProceedDelete";
import { TaskData, memberData } from "@/utils/interface";
import PopUp from "@/components/PopUp";
import IndividualTaskInfo from "@/components/IndividualTask";
import AddTaskPage from "@/components/AddTask";
import EditTask from "@/components/EditTask";
import { updateTask, addTask, deleteTask, fetchTask } from "@/utils/database";
import React from "react";
import MemberEffort from "./MemberEffort";
import MediumPopUp from "./MediumPopUp";

type AdminTeamBoardProps = {
  memberOpen: boolean;
  setMemberOpen: React.Dispatch<React.SetStateAction<boolean>>;
  createOpen: boolean;
  setCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// const AdminTeamBoard = ({ memberOpen, setMemberOpen, createOpen, setCreateOpen }: AdminTeamBoardProps) => {
const AdminTeamBoard = () => {
  const [database, setDatabase] = useState<TaskData[]>([]);
  const [isInvisible, SetIsInvisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null); // Manage active dropdown
  const [currentMember, setCurrentMember] = useState<memberData | null>(null);
  const [memberOpen, setMemberOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<memberData | null>(null);
  const [memberEffortOpen, setMemberEffortOpen] = useState(false);

  const openGraph = (member: memberData) => {
    setSelectedMember(member);
    setMemberOpen(true);
  };
  const openMemberEffort = (member: memberData) => {
    setSelectedMember(member);
    setMemberEffortOpen(true);
  };

  //   const editTask = () => {
  //     setEditOpen(true);
  //     setTaskOpen(false);
  //   };

  //   const runDeleteTask = async (taskToDelete: TaskData) => {
  //     const taskData: any = taskToDelete;
  //     try {
  //       await deleteTask(taskData._id);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  const mokcupData: memberData[] = [
    {
      name: "Member1",
      totalHours: 3,
      workingHours: [
        { date: "2024-10-01", hours: 3 },
        { date: "2024-10-02", hours: 4 },
        { date: "2024-10-03", hours: 5 },
        { date: "2024-10-04", hours: 1 },
        { date: "2024-10-05", hours: 2.5 },
        { date: "2024-10-06", hours: 1.5 },
        { date: "2024-10-07", hours: 2 },
      ],
    },
    {
      name: "Member2",
      totalHours: 5,
      workingHours: [
        { date: "2024-10-01", hours: 1 },
        { date: "2024-10-02", hours: 3 },
        { date: "2024-10-03", hours: 3 },
        { date: "2024-10-04", hours: 2 },
        { date: "2024-10-05", hours: 1 },
        { date: "2024-10-06", hours: 2 },
        { date: "2024-10-07", hours: 0.5 },
      ],
    },
    {
      name: "Member3",
      totalHours: 2.5,
      workingHours: [
        { date: "2024-10-01", hours: 1 },
        { date: "2024-10-02", hours: 2 },
        { date: "2024-10-03", hours: 3 },
        { date: "2024-10-04", hours: 4 },
        { date: "2024-10-05", hours: 5 },
        { date: "2024-10-06", hours: 6 },
        { date: "2024-10-07", hours: 7 },
      ],
    },
  ];

  return (
    <>
      <div className="z-50 flex min-h-screen flex-col items-start justify-start p-8 relative">
        {/*  "PRODUCT BACKLOG" title */}
        <div className="absolute top-15 left-18 p-4 bg-blue-100 text-blue-800 font-bold text-lg rounded-md shadow-md">
          Team Board
        </div>

        {/* Filter Options */}
        <div className="flex relative items-center justify-between w-full mt-20 mb-4">
          <div className="flex items-center space-x-6">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-300"
              onClick={() => {}}
            >
              Add member
            </button>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-300"
              onClick={() => {}}
            >
              Edit
            </button>
          </div>
        </div>

        {/* Single-Column Table */}
        <div className="w-full flex items-center justify-center font-mono text-sm mt-4">
          <table className="min-w-full bg-white bg-opacity-40 border border-gray-500 z-0">
            <thead>
              <tr>
                {/* <th className="py-4 px-4 border-b border-gray-500 text-left">{isLoading ? "Loading Members..." : "Members"}</th> */}
              </tr>
            </thead>
            <tbody>
              {/* {!isLoading && sortedAndFilteredTasks.map((task: TaskData, i: number) => ( */}
              {mokcupData.map((member, i: number) => (
                <tr
                  key={i}
                  className="relative hover:bg-gray-100"
                  onClick={() => {}}
                >
                  <td className="relative py-8 px-8 border-b border-gray-500 text-left">
                    <div className="flex items-center justify-between">
                      {/* task Name and Assigned To which member */}
                      <div className="text-lg font-bold">{member.name}</div>
                      {/* adding task Progress and Mark */}
                      <div className="text-md font-bold">
                        {member.totalHours} Hours
                      </div>
                      <button
                        className="px-3 py-1 text-sm font-semibold rounded-md bg-black text-white hover:ring"
                        onClick={() => openMemberEffort(member)}
                      >
                        Effort
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <PopUp isOpen={memberEffortOpen} setIsOpen={setMemberEffortOpen}>
        {selectedMember && (
          <MemberEffort
            member={selectedMember}
            isOpen={memberEffortOpen}
            setIsOpen={setMemberEffortOpen}
          />
        )}
      </PopUp>
    </>
  );
};

export default AdminTeamBoard;
