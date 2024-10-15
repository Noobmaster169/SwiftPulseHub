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
import { fetchUsers, addUser } from '@/utils/users';
import { fetchTask} from '@/utils/database';
import TeamInsights from "./TeamInsights";
import Link from "next/link";

const AdminTeamBoard = () => {
  const [users, setUsers] = useState<UserData[]>([])
  const [usersData, setUsersData] = useState<any>([])
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
    const tasks = await fetchTask();
    const users = await fetchUsers();

    const usersData = users.map((user:UserData) => {
      // Make sure admin is not in the list of users
      if(user.name !== "admin"){return {...user, workingHours:[], assignedTasks:[]}}
      else{return}
    });
    tasks.forEach((task:TaskData) =>{
      const assignedUser = usersData.find((user:UserData) => user? user.name === task.assignedTo : false);
      if(assignedUser){
        console.log("Found user with name:", assignedUser.name)
        assignedUser.assignedTasks.push(task._id);
        task.timeLog?.forEach((log:Log)=>{
          console.log("Log:", log);
          const logDate = log.date? new Date(log.date) : new Date();
          assignedUser.workingHours.push({date: logDate.toString(), hours: log.timeLogged});
        })
      }
      else{console.log("Didn't find user with the name:", task.assignedTo)};
    })
    usersData.forEach((user:any) => {
      if(user){
        const today = new Date();
        const firstDay = new Date();
        let totalHours = 0
        user.workingHours.forEach((log:any)=>{
          const logDate = new Date(log.date);
          totalHours += log.hours;
          // console.log("FOUND LOG AT:", logDate.toString());
          if(logDate < firstDay){firstDay.setTime(logDate.getTime())}
        })
        const diffInMs = today.getTime() - firstDay.getTime();
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;
        // console.log(user.name, "started at:", firstDay.toString())
        // console.log("Today is:", today.toString());
        console.log("Difference in days:", diffInDays);
        user.HoursPerDay = totalHours / diffInDays;
      }
    })
    console.log(usersData);
    setUsers(users);
    setUsersData(usersData);
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
  const updateMember = (updatedMember: memberData) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.name === updatedMember.name ? updatedMember : member
      )
    );
  };


  const assignTaskToMember = (memberName: string, task: string, action: 'add' | 'remove') => {
    setMembers((prevMembers) =>
      prevMembers.map((member) => {
        if (member.name === memberName) {
          const updatedTasks = action === 'add'
            ? [...(member.assignedTasks || []), task]
            : (member.assignedTasks || []).filter((t) => t !== task);
          return { ...member, assignedTasks: updatedTasks };
        }
        return member;
      })
    );
  };
  // const hasAssignedTasks = (member: memberData): boolean => {
  //   return Array.isArray(member.assignedTasks) && member.assignedTasks.length > 0;
  // };

  // const handleAssignTask = (memberName: string, task: string) => {
  //   assignTaskToMember(memberName, task, 'add');
  // };
  // const handleUnassignTask = (memberName: string, task: string) => {
  //   assignTaskToMember(memberName, task, 'remove');
  // };

  const [sortCriteria, setSortCriteria] = useState<'name' | 'hours'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [openDropdown, setOpenDropdown] = useState<'name' | 'hours' | null>(null);

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
      assignedTasks: ["Task1", "Task2"]
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
      assignedTasks: ["Task1", "Task2"],
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
      assignedTasks: ["Task1", "Task2"],
    },
  ]);

  const [teamBoard, setTeamBoard] = useState<teamBoard>({
    startDate: new Date("2024-10-01"),
    endDate: new Date("2024-10-16"),
    memberList: members,
  });

  const addMember = async (name: string, email: string, password: string) => {
    const newMember: memberData = {
      name,
      totalHours: 0,
      HoursPerDay: 0,
      workingHours: [],
      email,
      assignedTasks: [],
    };
    setMembers([...members, newMember]);
    
    const newUserData: UserData = {
      name,
      email,
      hash: password, // Note: In a real application, you should hash the password before sending it to the server
    };
    await addUser(newUserData);
    
    console.log(`Added member: ${name}, ${email}`);
    memberAdded();
  };

  const toggleDropdown = (dropdown: 'name' | 'hours') => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const toggleSort = (criteria: 'name' | 'hours', order: 'asc' | 'desc') => {
    setSortCriteria(criteria);
    setSortOrder(order);
    setOpenDropdown(null);
  };

  const sortedMembers = [...members].sort((a, b) => {
    if (sortCriteria === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else {
      return sortOrder === 'asc' ? 
        (a.HoursPerDay || 0) - (b.HoursPerDay || 0) : 
        (b.HoursPerDay || 0) - (a.HoursPerDay || 0);
    }
  });

  members.forEach((m) => {
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
    <div className="relative min-h-screen p-8">
      <div className="absolute top-4 left-4 p-4 bg-blue-100 text-blue-800 font-bold text-lg rounded-md shadow-md z-10">
        Team Board
      </div>

      <div className="mt-20 relative">
        {/* Control bar */}
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

        {/* Team members table */}
        <div className="w-full flex items-center justify-center font-mono text-sm">
          <table className="min-w-full bg-white bg-opacity-40 border border-gray-500">
            <tbody>
              {/*sortedMembers.map((member, i: number) => (
                <tr key={i} className="relative hover:bg-gray-100">
                  <td className="relative py-8 px-8 border-b border-gray-500 text-left">
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold">{member.name}</div>
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
              ))*/}
              {usersData.map((member:any, i: number) => 
                member ? <tr key={i} className="relative hover:bg-gray-100">
                  <td className="relative py-8 px-8 border-b border-gray-500 text-left">
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold">{member.name}</div>
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
                </tr> : ""
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popups */}
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
        <AddMemberForm setIsOpen={setAddMemberOpen} memberAdded={memberAdded} addMember={addMember} />
      </PopUp>
      <PopUp isOpen={editMemberOpen} setIsOpen={setEditMemberOpen}>
        <EditMember
          members={members}
          setIsOpen={setEditMemberOpen}
          deleteMember={deleteMember}
          updateMember={updateMember}
        />
      </PopUp>
      <PopUp isOpen={insightsOpen} setIsOpen={setInsightsOpen}>
        <TeamInsights members={members} />
      </PopUp>
    </div>
  );
};

export default AdminTeamBoard;