"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaSort, FaCaretDown } from "react-icons/fa";
import MiniPopUp from "./MiniPopUp";
import ProceedDelete from "./ProceedDelete";
import { TaskData, memberData, UserData, teamBoard, Log } from "@/utils/interface";
import PopUp from "@/components/PopUp";
import MemberEffort from "./MemberEffort";
import MediumPopUp from "./MediumPopUp";
import AddMemberForm from "./AddMemberForm";
import { FaRegEdit } from "react-icons/fa";
import EditMember from "./EditMember";
import { fetchUsers, addUser, deleteUser, updateUser} from '@/utils/users';
import { fetchTask} from '@/utils/database';
import TeamInsights from "./TeamInsights";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import sha256 from 'crypto-js/sha256';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AdminTeamBoard = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [usersData, setUsersData] = useState<any>([]);
  const [isInvisible, SetIsInvisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentMember, setCurrentMember] = useState<memberData | null>(null);
  const [memberOpen, setMemberOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<memberData | null>(null);
  const [memberEffortOpen, setMemberEffortOpen] = useState(false);
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [editMemberOpen, setEditMemberOpen] = useState(false);
  const [deleteMemberOpen, setDeleteMemberOpen] = useState(false);
  const [deleteMemberConfirmationOpen, setDeleteMemberConfirmationOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const {setCurrentUser} = useUser();
  const [memberUpdated, setMemberUpdated] = useState(false);
  const [sortCriteria, setSortCriteria] = useState<'name' | 'hours'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [openDropdown, setOpenDropdown] = useState<'name' | 'hours' | null>(null);

  // Updated state for date range feature
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000));
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const getData = async () => {
      console.log("Fetching Users");
      const tasks = await fetchTask();
      const users = await fetchUsers();

      const usersData = users.map((user: UserData) => {
        if (user.name !== "admin") {
          return { ...user, workingHours: [], assignedTasks: [] };
        } else {
          setCurrentUser(user);
          return;
        }
      });

      tasks.forEach((task: TaskData) => {
        const assignedUser = usersData.find((user: UserData) => user ? user.name === task.assignedTo : false);
        if (assignedUser) {
          console.log("Found user with name:", assignedUser.name);
          assignedUser.assignedTasks.push(task._id);
          task.timeLog?.forEach((log: Log) => {
            console.log("Log:", log);
            const logDate = log.date ? new Date(log.date) : new Date();
            assignedUser.workingHours.push({ date: logDate.toString(), hours: log.timeLogged });
          });
        } else {
          console.log("Didn't find user with the name:", task.assignedTo);
        }
      });

      usersData.forEach((user: any) => {
        if (user) {
          user.HoursPerDay = calculateAverageHours(user, startDate, endDate);
        }
      });

      console.log(usersData);
      setUsers(users);
      setUsersData(usersData);
      setIsLoading(false);
    };

    getData();
  }, [memberUpdated, startDate, endDate]);

  const calculateAverageHours = (member: any, start: Date, end: Date) => {
    const relevantHours = member.workingHours.filter((log: any) => {
      const logDate = new Date(log.date);
      return logDate >= start && logDate <= end;
    });

    const totalHours = relevantHours.reduce((sum: number, log: any) => sum + log.hours, 0);
    const diffInDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return totalHours / diffInDays;
  };

  const openGraph = (member: memberData) => {
    setSelectedMember(member);
    setMemberOpen(true);
  };

  const openMemberEffort = (member: memberData) => {
    setSelectedMember(member);
    setMemberEffortOpen(true);
  };

  const deleteMember = (memberToDelete: any) => {
    if (memberToDelete._id) {
      deleteUser(memberToDelete._id);
    } else {
      alert("Unknown Member");
    }
    setMemberUpdated(!memberUpdated);
    setEditMemberOpen(false);
  };

  const addMember = async (name: string, email: string, password: string) => {
    console.log(`Added member: ${name}, ${email}`);
    setMemberUpdated(!memberUpdated);
  };

  const updateMember = async (updatedMember: any) => {
    await updateUser(updatedMember);
    setMemberUpdated(!memberUpdated);
  };

  const toggleDropdown = (dropdown: 'name' | 'hours') => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const toggleSort = (criteria: 'name' | 'hours', order: 'asc' | 'desc') => {
    setSortCriteria(criteria);
    setSortOrder(order);
    setOpenDropdown(null);
  };

  const sortedUsersData = [...usersData].sort((a, b) => {
    if (sortCriteria === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else {
      return sortOrder === 'asc' ? 
        (a.HoursPerDay || 0) - (b.HoursPerDay || 0) : 
        (b.HoursPerDay || 0) - (a.HoursPerDay || 0);
    }
  });

  return (
    <div className="relative min-h-screen p-8">
      <div className="absolute top-4 left-4 p-4 bg-blue-100 text-blue-800 font-bold text-lg rounded-md shadow-md z-10">
        Team Board
      </div>

      <div className="mt-20 relative">
        <div className="flex justify-between items-center mb-4 z-20 relative">
          <div className="flex space-x-2">
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
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-300"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              Set Date Range
            </button>
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <button
                onClick={() => toggleDropdown('name')}
                className="px-3 py-1 bg-gray-200 rounded-md flex items-center"
              >
                Name <FaCaretDown className="ml-1" />
              </button>
              {openDropdown === 'name' && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-30">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button
                      onClick={() => toggleSort('name', 'asc')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      A-Z
                    </button>
                    <button
                      onClick={() => toggleSort('name', 'desc')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Z-A
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => toggleDropdown('hours')}
                className="px-3 py-1 bg-gray-200 rounded-md flex items-center"
              >
                Hours <FaCaretDown className="ml-1" />
              </button>
              {openDropdown === 'hours' && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-30">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button
                      onClick={() => toggleSort('hours', 'desc')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Highest to Lowest
                    </button>
                    <button
                      onClick={() => toggleSort('hours', 'asc')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Lowest to Highest
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {showDatePicker && (
          <div className="mb-4 flex space-x-4">
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
            <DatePicker
              selected={endDate}
              onChange={(date: Date) => {
                setEndDate(date);
                setStartDate(new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000));
              }}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </div>
        )}

        <div className="w-full flex items-center justify-center font-mono text-sm">
          <table className="min-w-full bg-white bg-opacity-40 border border-gray-500">
            <thead>
              <tr>
                <th className="py-4 px-4 pl-8 border-b border-gray-500 text-lg text-left">{isLoading ? "Loading Members..." : "Members"}</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsersData.map((member: any, i: number) => 
                member ? (
                  <tr key={i} className="relative hover:bg-gray-100 hover:bg-opacity-50">
                    <td className="relative py-8 px-8 border-b border-gray-500 text-left">
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold">{member.name}</div>
                        <div className="text-lg font-bold">
                          {member.HoursPerDay.toFixed(2)} Hours per day
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
                ) : null
              )}
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
      <PopUp isOpen={addMemberOpen} setIsOpen={setAddMemberOpen}>
        <AddMemberForm setIsOpen={setAddMemberOpen} memberAdded={() => setMemberUpdated(!memberUpdated)} addMember={addMember} />
      </PopUp>
      <PopUp isOpen={editMemberOpen} setIsOpen={setEditMemberOpen}>
        <EditMember
          members={usersData}
          setIsOpen={setEditMemberOpen}
          deleteMember={deleteMember}
          updateMember={updateMember}
        />
      </PopUp>
      <PopUp isOpen={insightsOpen} setIsOpen={setInsightsOpen}>
        <TeamInsights members={usersData} />
      </PopUp>
    </div>
  );
};

export default AdminTeamBoard;