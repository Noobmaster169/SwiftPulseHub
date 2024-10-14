"use client";
import { SetStateAction, useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import MiniPopUp from "./MiniPopUp";
import ProceedDelete from "./ProceedDelete";
import { TaskData, memberData, UserData, teamBoard } from "@/utils/interface";
import PopUp from "@/components/PopUp";
import IndividualTaskInfo from "@/components/IndividualTask";
import AddTaskPage from "@/components/AddTask";
import EditTask from "@/components/EditTask";
import { updateTask, addTask, deleteTask, fetchTask } from "@/utils/database";
import React from "react";
import MemberEffort from "./MemberEffort";
import MediumPopUp from "./MediumPopUp";
import AddMemberForm from "./AddMemberForm";
import { FaRegEdit } from "react-icons/fa";
import EditMember from "./EditMember";
import {fetchUsers} from '@/utils/users';


import TeamInsights from "./TeamInsights";
import Link from "next/link";

type AdminTeamBoardProps = {
  memberOpen: boolean;
  setMemberOpen: React.Dispatch<React.SetStateAction<boolean>>;
  createOpen: boolean;
  setCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// const AdminTeamBoard = ({ memberOpen, setMemberOpen, createOpen, setCreateOpen }: AdminTeamBoardProps) => {
const AdminTeamBoard = () => {
  const [users, setUsers] = useState<UserData[]>([])
  const [isInvisible, SetIsInvisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null); // Manage active dropdown
  const [currentMember, setCurrentMember] = useState<memberData | null>(null);
  const [memberOpen, setMemberOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<memberData | null>(null);
  // effort
  const [memberEffortOpen, setMemberEffortOpen] = useState(false);
  // adding member
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  // editing member
  const [editMemberOpen, setEditMemberOpen] = useState(false);
  // deleting member
  const [deleteMemberOpen, setDeleteMemberOpen] = useState(false);
  const [deleteMemberConfirmationOpen, setDeleteMemberConfirmationOpen] =
    useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const openGraph = (member: memberData) => {
    setSelectedMember(member);
    setMemberOpen(true);
  };
  const openMemberEffort = (member: memberData) => {
    setSelectedMember(member);
    setMemberEffortOpen(true);
  };

  const deleteMember = (memberToDelete: memberData) => {
    setMembers(members.filter((member) => member.name !== memberToDelete.name));
  };

  const getData= async ()=>{
    console.log("Fetching Users")
    const users = await fetchUsers();
    console.log(users);
    setUsers(users);
  }

  const [memberUpdated, setMemberUpdated] = useState(false);
  useEffect(() =>{
    getData();
  }, [memberUpdated])

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

  const memberAdded = ()=>{
    setMemberUpdated(!memberUpdated);
  }
  const addMember = (name: string, email: string, password: string) => {
    const newMember: memberData = {
      name,
      totalHours: 0,
      HoursPerDay: 0,
      workingHours: [],
      email,
    };
    setMembers([...members, newMember]);
    console.log(`Added member: ${name}, ${email}`);
  };

  const [members, setMembers] = useState<memberData[]>([
    {
      name: "Member1",
      workingHours: [
        { date: "2024-10-01", hours: 3 },
        { date: "2024-10-02", hours: 4 },
        { date: "2024-10-03", hours: 5 },
        { date: "2024-10-04", hours: 1 },
        { date: "2024-10-05", hours: 2.5 },
        { date: "2024-10-06", hours: 1.5 },
        { date: "2024-10-07", hours: 2 },
      ],
      email: "member1@gmail.com",
    },
    {
      name: "Member2",
      workingHours: [
        { date: "2024-10-01", hours: 1 },
        { date: "2024-10-02", hours: 3 },
        { date: "2024-10-03", hours: 3 },
        { date: "2024-10-04", hours: 2 },
        { date: "2024-10-05", hours: 1 },
        { date: "2024-10-06", hours: 2 },
        { date: "2024-10-07", hours: 0.5 },
      ],
      email: "member2@gmail.com",
    },
    {
      name: "Member3",
      workingHours: [
        { date: "2024-10-01", hours: 1 },
        { date: "2024-10-02", hours: 2 },
        { date: "2024-10-03", hours: 3 },
        { date: "2024-10-04", hours: 4 },
        { date: "2024-10-05", hours: 5 },
        { date: "2024-10-06", hours: 6 },
        { date: "2024-10-07", hours: 7 },
      ],
      email: "member3@gmail.com",
    },
  ]);

  {
    /**mockup data for teamBoard */
  }
  const [teamBoard, setTeamBoard] = useState<teamBoard>({
    startDate: new Date("2024-10-01"),
    endDate: new Date("2024-10-16"),
    memberList: members,
  });

  {
    /**calculate total working Hours and average working Hours per day*/
  }
  members.map((m) => {
    const today = new Date("2024-10-07");
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const diffInDays = (today.getTime() - teamBoard.startDate.getTime()) / day;
    m.totalHours = m.workingHours?.reduce((sum, v) => sum + v.hours, 0);
    m.HoursPerDay = m.totalHours
      ? parseFloat((m.totalHours / diffInDays).toFixed(1))
      : 0;
  });

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
              onClick={() => setAddMemberOpen(true)}
            >
              Add member
            </button>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-300"
              onClick={() => setEditMemberOpen(true)}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-300"
              onClick={() => setInsightsOpen(true)}
            >
              Insights
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
              {members.map((member, i: number) => (
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
      <PopUp isOpen={memberEffortOpen} setIsOpen={setMemberEffortOpen}>
        {selectedMember && (
          <MemberEffort
            member={selectedMember}
            isOpen={memberEffortOpen}
            setIsOpen={setMemberEffortOpen}
          />
        )}
      </PopUp>
      {/* add member */}
      <PopUp isOpen={addMemberOpen} setIsOpen={setAddMemberOpen}>
        <AddMemberForm setIsOpen={setAddMemberOpen} memberAdded={memberAdded} />
      </PopUp>
      <MiniPopUp isOpen={editMemberOpen} setIsOpen={setEditMemberOpen}>
        {/*Change members[0] to other data*/}
        <ProceedDelete isOpen={editMemberOpen} setIsOpen={setEditMemberOpen} taskToDelete={members[0]} deleteTask={deleteMember}/>
      </MiniPopUp>
      <MediumPopUp isOpen={editMemberOpen} setIsOpen={setEditMemberOpen}>
        <EditMember
          members={members}
          setIsOpen={setEditMemberOpen}
          deleteMember={deleteMember}
        />
      </MediumPopUp>
      <PopUp isOpen={insightsOpen} setIsOpen={setInsightsOpen}>
        <TeamInsights members={members} />
      </PopUp>
    </>
  );
};

export default AdminTeamBoard;
