"use client";
import { SetStateAction, useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import MediumPopUp from "./MediumPopUp";
import ProceedDelete from "./ProceedDelete";
import { TaskData, memberData, teamBoard, Log, UserData } from "@/utils/interface";
import PopUp from "@/components/PopUp";
import MiniPopUp from "@/components/MiniPopUp";
import IndividualTaskInfo from "@/components/IndividualTask";
import AddTaskPage from "@/components/AddTask";
import EditTask from "@/components/EditTask";
import { updateTask, addTask, deleteTask, fetchTask } from "@/utils/database";
import {updateUser} from '@/utils/users';
import React from "react";
import MemberEffort from "./MemberEffort";
import { useUser } from '@/context/UserContext';
import UserLogin from '@/components/UserLogin';
import { set } from "date-fns";
import sha256 from 'crypto-js/sha256';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type UserTeamBoardProps = {
  memberOpen: boolean;
  setMemberOpen: React.Dispatch<React.SetStateAction<boolean>>;
  createOpen: boolean;
  setCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// const AdminTeamBoard = ({ memberOpen, setMemberOpen, createOpen, setCreateOpen }: AdminTeamBoardProps) => {
const UserTeamBoard = ({setIsUserLogin}:any) => {
  const [database, setDatabase] = useState<TaskData[]>([]);
  const [isInvisible, SetIsInvisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null); // Manage active dropdown
  const [currentMember, setCurrentMember] = useState<memberData | null>(null);
  const [memberEffortOpen, setMemberEffortOpen] = useState(false);

  const [endDate, setEndDate] = useState<Date>(new Date(new Date().getTime() + 60 * 60 * 1000));
  const [startDate, setStartDate] = useState<Date>(new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000));

  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const changePassword = async()=>{
    setIsChangingPassword(true);
    if(password !== confirmPassword){
      alert("Passwords do not match");
    }else{
      const encrypted = sha256(password).toString();
      const newUser: UserData = {
        _id : currentUser._id,
        name: currentUser.name,
        email: currentUser.email,
        hash: encrypted,
      }
      await updateUser(newUser);
    }
    setIsChangingPassword(false);
    setChangePasswordOpen(false);
  }
  
  const {currentUser} = useUser();
  const [userInformation, setUserInformation] = useState<any>(null);  
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(()=>{
    if(currentUser){
      if(currentUser.name === "admin"){return}
      setLoggedIn(true);
    }
  })

  const getData= async ()=>{
    if(currentUser){
      setIsLoading(true);
      console.log("Fetching Users")
      const tasks = await fetchTask();

      currentUser.workingHours = [];
      currentUser.assignedTasks = [];
    
      tasks.forEach((task:TaskData) =>{
        if(currentUser.name === task.assignedTo){
          currentUser.assignedTasks.push(task._id);
          task.timeLog?.forEach((log:Log)=>{
            const logDate = log.date? new Date(log.date) : new Date();
            currentUser.workingHours.push({date: logDate.toString(), hours: log.timeLogged});
          })
        }
      });
      currentUser.HoursPerDay = calculateAverageHours(currentUser, startDate, endDate);
      // const today = new Date();
      // const firstDay = new Date();
      // let totalHours = 0
      // currentUser.workingHours.forEach((log:any)=>{
      //   const logDate = new Date(log.date);
      //   totalHours += log.hours;
      //   if(logDate < firstDay){firstDay.setTime(logDate.getTime())}
      // })
      // const diffInMs = today.getTime() - firstDay.getTime();
      // const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;
      // console.log("Difference in days:", diffInDays);
      // currentUser.HoursPerDay = totalHours / diffInDays;
      
      // console.log(currentUser);
      setUserInformation(currentUser);
      setIsLoading(false);
    }
  }
  useEffect(() =>{
    if(!isLoading){
      const currentUser = userInformation;
      currentUser.HoursPerDay = calculateAverageHours(currentUser, startDate, endDate);
      setUserInformation(currentUser);
    }
  }, [startDate, endDate]);

  const calculateAverageHours = (member: any, start: Date, end: Date) => {
    const relevantHours = member.workingHours.filter((log: any) => {
      const logDate = log.date ? new Date(log.date) : new Date();
      const included = logDate >= start && logDate <= end;
      //if(!included){console.log(member.name, 'log:', log, 'is not included')}
      return included
    });

    const totalHours = relevantHours.reduce((sum: number, log: any) => sum + log.hours, 0);
    const diffInDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    console.log(member.name, "worked for", totalHours, "hours in", diffInDays, "days");
    return totalHours / diffInDays;
  };

  const [memberUpdated, setMemberUpdated] = useState(false);
  useEffect(() =>{
    getData();
  }, [memberUpdated, loggedIn])


  const openGraph = (member: memberData) => {
    if (isInvisible) return;
    setCurrentMember(member);
    // setMemberOpen(true);
  };

  const openMemberEffort = (member: memberData) => {
    setCurrentMember(member);
    setMemberEffortOpen(true);
  };


  return (
    <>
      {loggedIn? <div className="z-50 flex min-h-screen flex-col items-start justify-start p-8 relative">
        {/*  "PRODUCT BACKLOG" title */}
        <div className="absolute top-15 left-18 p-4 bg-blue-100 text-blue-800 font-bold text-lg rounded-md shadow-md">
          Team Board
        </div>

        {/* Filter Options */}
        <div className="flex relative items-center justify-between w-full mt-20 mb-4">
          <div className="flex items-center space-x-6">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-300"
              onClick={() => setChangePasswordOpen(true)}
            >
              Change password
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4 z-20 relative">
            <div>
            <div className="text-white my-2 font-semibold text-lg">Select Date Range:</div>
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
                  //setStartDate(new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000));
                }}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </div>
            </div>
            </div>

        {/* Single-Column Table */}
        <div className="w-full flex items-center justify-center font-mono text-sm mt-4">
          <table className="min-w-full bg-white bg-opacity-40 border border-gray-500 z-0">
            <thead>
              <tr>
                <th className="py-4 px-4 pl-8 border-b border-gray-500 text-lg text-left">{isLoading ? "Loading Members..." : "Members"}</th>
              </tr>
            </thead>
            <tbody>
              {userInformation? (
                <tr className="relative hover:bg-gray-100 hover:bg-opacity-50">
                  <td className="relative py-8 px-8 border-b border-gray-500 text-left">
                    <div className="flex items-center justify-between">
                      {/* task Name and Assigned To which member */}
                      <div className="text-lg font-bold">{userInformation.name}</div>
                      {/* adding task Progress and Mark */}
                      <div className="text-lg font-bold">
                        {userInformation.HoursPerDay.toFixed(2)} Hours per day
                      </div>
                      <button
                        className="px-3 py-1 text-sm font-semibold rounded-md bg-black text-white hover:ring"
                        onClick={() => openMemberEffort(userInformation)}
                      >
                        Effort
                      </button>
                    </div>
                  </td>
                </tr>
              ): ""}
            </tbody>
          </table>
        </div>
        </div>: ""}
      <div className="z-50">
        <MemberEffort
          isOpen={memberEffortOpen}
          setIsOpen={setMemberEffortOpen}
          member={currentMember}
        />
      </div>
      <MediumPopUp isOpen={changePasswordOpen} setIsOpen={setChangePasswordOpen}>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">New Password:</label>
              <input
                type="password"
                className="border p-2 rounded w-full"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password:</label>
              <input
                type="password"
                className="border p-2 rounded w-full"
                placeholder=""
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2" disabled={isChangingPassword} onClick={changePassword}>
              Submit
            </button>
          </form>
        </div>
      </MediumPopUp>
      <MediumPopUp isOpen={!loggedIn} setIsOpen={setIsUserLogin}>
          <UserLogin />
      </MediumPopUp>
    </>
    
  );
};

export default UserTeamBoard;
