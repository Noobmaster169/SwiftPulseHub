"use client";
import { SetStateAction, useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import MiniPopUp from "./MiniPopUp";
import ProceedDelete from "./ProceedDelete";
import { TaskData, memberData, teamBoard } from "@/utils/interface";
import PopUp from "@/components/PopUp";
import IndividualTaskInfo from "@/components/IndividualTask";
import AddTaskPage from "@/components/AddTask";
import EditTask from "@/components/EditTask";
import { updateTask, addTask, deleteTask, fetchTask } from "@/utils/database";
import React from "react";
import MemberEffort from "./MemberEffort";

type UserTeamBoardProps = {
  memberOpen: boolean;
  setMemberOpen: React.Dispatch<React.SetStateAction<boolean>>;
  createOpen: boolean;
  setCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// const AdminTeamBoard = ({ memberOpen, setMemberOpen, createOpen, setCreateOpen }: AdminTeamBoardProps) => {
const UserTeamBoard = () => {
  const [database, setDatabase] = useState<TaskData[]>([]);
  const [isInvisible, SetIsInvisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null); // Manage active dropdown
  const [currentMember, setCurrentMember] = useState<memberData | null>(null);
  const [memberEffortOpen, setMemberEffortOpen] = useState(false);

  const openGraph = (member: memberData) => {
    if (isInvisible) return;
    setCurrentMember(member);
    // setMemberOpen(true);
  };

  const openMemberEffort = (member: memberData) => {
    setCurrentMember(member);
    setMemberEffortOpen(true);
  };

  const mokcupData: memberData[] = [
    {
      name: "Member1",
      totalHours: 3,
      email: "member1@example.com",
      workingHours: [
        { date: "2024-10-01", hours: 1 },
        { date: "2024-10-02", hours: 2 },
        { date: "2024-10-03", hours: 3 },
        { date: "2024-10-04", hours: 4 },
        { date: "2024-10-05", hours: 5 },
        { date: "2024-10-06", hours: 6 },
        { date: "2024-10-07", hours: 7 },
        { date: "2024-10-08", hours: 8 },
        { date: "2024-10-09", hours: 9 },
        { date: "2024-10-10", hours: 10 },
        { date: "2024-10-11", hours: 11 },
        { date: "2024-10-12", hours: 12 },
      ],
    },
  ];

    {/**mockup data for teamBoard */}
    const [teamBoard, setTeamBoard] = useState<teamBoard>(
      {
        startDate: new Date("2024-10-01"),
        endDate: new Date("2024-10-16"),
        memberList: mokcupData,
      }
    )
  
    {/**calculate total working Hours and average working Hours per day*/}
    mokcupData.map( m => {
      const today = new Date ("2024-10-12")
      const minute = 1000 * 60;
      const hour = minute * 60;
      const day = hour * 24;
  
      const diffInDays = (today.getTime() - teamBoard.startDate.getTime())/day
      m.totalHours = m.workingHours?.reduce((sum,v) => (sum + v.hours), 0) 
      m.HoursPerDay = m.totalHours? parseFloat((m.totalHours / diffInDays).toFixed(1)) : 0
    })

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
              Change password
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
              {mokcupData.map((member, i: number) => (
                <tr key={i} className="relative hover:bg-gray-100">
                  <td className="relative py-8 px-8 border-b border-gray-500 text-left">
                    <div className="flex items-center justify-between">
                      {/* task Name and Assigned To which member */}
                      <div className="text-lg font-bold">{member.name}</div>
                      {/* adding task Progress and Mark */}
                      <div className="text-md font-bold">
                        {member.HoursPerDay} Hours per day
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
      <div className="z-50">
        <MemberEffort
          isOpen={memberEffortOpen}
          setIsOpen={setMemberEffortOpen}
          member={currentMember}
        />
      </div>
    </>
  );
};

export default UserTeamBoard;
