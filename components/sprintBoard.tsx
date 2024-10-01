"use client";
import { SetStateAction, useState, useEffect } from "react";
import { AiOutlineDelete, AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import PopUp from "@/components/PopUp";
import CreateSprint from "@/components/CreateSprint";
import MiniPopUp from "./MiniPopUp";
import ProceedDelete from "./ProceedDelete";
import { SprintData } from "@/utils/interface";
import IndividualTaskInfo from "./IndividualTask";
import SprintPage from "./IndividualSprint";
import Link from "next/link";
import {fetchSprint, deleteSprint, updateSprint} from '@/utils/sprint';

type SprintBoardProps = {
  sprintOpen: boolean;
  setSprintOpen: React.Dispatch<React.SetStateAction<boolean>>;
  createOpen: boolean;
  setCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SprintBoard = ({
  sprintOpen,
  setSprintOpen,
  createOpen,
  setCreateOpen,
}: SprintBoardProps) => {
  const [isDeleting, SetIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [currentSprint, setCurrentSprint] = useState<SprintData | null>(null);
  const [dateSort, setDateSort] = useState<string | null>(null);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState<boolean>(false);
  const [showDateDropdown, setShowDateDropdown] = useState<boolean>(false);

  const [database, setDatabase] = useState<SprintData[]>([]);
  const [taskIds, setTaskIds] = useState<string[]>([]);

  useEffect(() => {
    if(database.length == 0){
      setIsLoading(true);
    }
    const getDatabase = async () => {
      let data: SprintData[] = await fetchSprint();
      if (!data) {
        data = [];
      }
      const modified_data = data.map((task: SprintData) => ({ ...task, isDeleted: false }));
      const ids:string[] = [];
      let activeSprint = false;
      modified_data.forEach((sprint:SprintData) => {
        // Check if any active sprint exists
        if(sprint.status === "Active"){
          activeSprint = true;
        }
        // Get the list of tasks in the sprint
        if(!sprint.tasks){return}
        sprint.tasks.forEach((task:string) => {
          ids.push(task)
        });
      });
      // Automatically Update Sprint Status
      modified_data.forEach(async (sprint:SprintData) => {
        const today = new Date();
        const start = new Date(sprint.startDate);
        const end = new Date(sprint.endDate);
        // Auto Start Sprints
        if(today >= start && sprint.status=="Not Started"){
          if(!activeSprint){
            console.log("Updating Sprint Status to Active")
            const newData: any = {...sprint, status: "Active"};
            await updateSprint(newData);
            sprint.status = "Active";
            activeSprint = true;
          }else{
            console.log("Auto Start Fail: A Sprint is still active")
          }
        }
        // Auto End Sprints
        if(today >= end && sprint.status!="Completed"){
          const newData: any = {...sprint, status: "Completed"};
          await updateSprint(newData);
          sprint.status = "Completed";
        }
      });

      setTaskIds(ids);
      //console.log(modified_data);
      setDatabase(modified_data);
      setIsLoading(false);
    };
    getDatabase();
  }, [createOpen, isOpen, editOpen, isUpdated]);



  const openSprint = (sprint: SprintData) => {
    if (isDeleting) return;
    setCurrentSprint(sprint);
    setSprintOpen(true);
  };

  const editTask = () => {
    setEditOpen(true);
    setSprintOpen(false);
  };

  const handleDelete = async (sprintId: string) =>{
    try {
      await deleteSprint(sprintId);
    } catch (e) {
      console.log(e);
    }
  }

  const startSprint = async (sprint :SprintData) => {
    let activeExist = false;
    database.forEach((sprint)=>{
      if(sprint.status === "Active"){activeExist = true;}
    })
    if(!activeExist){
      if(sprint.status === "Not Started"){
        const today = new Date();
        const todayDate = today.toString();
        
        const newData: any = {...currentSprint, startDate:todayDate, status: "Active"};
        await updateSprint(newData);
        setIsUpdated(!isUpdated);
      }else{
        alert("ERROR: Invalid Sprint Status")
      }
    }else{
      alert("ERROR: Can't start when an active sprint exists")
    }
  }

  const endSprint = async (sprint: SprintData)=>{
    const today = new Date();
    const todayDate = today.toString();

    if(sprint.status === "Active"){
      const newData: any = {...currentSprint, endDate:todayDate, status: "Completed"};
      await updateSprint(newData);
      setIsUpdated(!isUpdated);
    }else{
      alert("ERROR: Invalid Sprint Status")
    }
  }

  return (
    <>
      <div className="flex min-h-screen flex-col items-start justify-start p-8 relative">
        {/*  "PRODUCT BACKLOG" title */}
        <div className="absolute top-15 left-18 p-4 bg-blue-100 text-blue-800 font-bold text-lg rounded-md shadow-md">
          SPRINT BOARD
        </div>

        {/* Filter Options */}
        <div className="flex items-center justify-between w-full mt-20 mb-4">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-300"
                onClick={() => setCreateOpen(true)}
              >
                Create New Sprint
              </button>
            </div>
            <div className="relative">
              <button
                className={`px-4 py-2 font-semibold rounded-md shadow-md hover:ring hover:ring-red-500 
                              active:bg-red-400 active:text-white ${
                                isDeleting
                                  ? `bg-red-500 hover:bg-red-600`
                                  : `bg-gray-200 text-gray-700 hover:bg-gray-300`
                              }`}
                onClick={() => SetIsDeleting(!isDeleting)}
              >
                Delete sprint
              </button>
              <MiniPopUp isOpen={isOpen} setIsOpen={setIsOpen}>
                <ProceedDelete
                  taskToDelete={currentSprint}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  deleteTask={handleDelete}
                />
              </MiniPopUp>
            </div>
          </div>
        </div>

        {/* Single-Column Table */}
        <div className="w-full flex items-center justify-center font-mono text-sm mt-4">
          <table className="min-w-full bg-white bg-opacity-40 border border-gray-500">
            <thead>
              <tr>
                <th className="py-4 px-4 border-b border-gray-500 text-left">{isLoading ? "Loading Sprint..." : "Sprint"}</th>
              </tr>
            </thead>
            <tbody>
              {database
              .sort((a: SprintData, b: SprintData) => {
                const statusOrder = ["Active", "Not Started", "Completed"];
                return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
              })
              .map((sprint: SprintData, i: number) => {
                const today = new Date();
                const start = new Date(sprint.startDate);
                const end = new Date(sprint.endDate);
                const isActive = sprint.status === "Active";
                const isCompleted = sprint.status === "Completed";
                //const isActive: boolean = today >= start && today <= end;
                //const isCompleted: boolean = today >= end;
                return (
                  <tr
                    key={i}
                    className={`relative ${isActive?`hover:bg-opacity-50`:``}`}
                    onClick={() => {
                      // Open Sprint at every scenario
                      //isActive ? ``: isCompleted ? `` : openSprint(sprint);
                      openSprint(sprint);

                      {/**attemped to link to another page for editSprint feature*/}
                      // isActive? ``: isCompleted? ``: window.location.href = `/individualSprint?sprintData=${encodeURIComponent(JSON.stringify(sprint))}`;;
                    }}
                  >
                    <td className={`relative py-8 px-8 border-b border-gray-500 text-left `}>
                      <div className="flex items-center justify-between">
                        {/* task Name and Assigned To which member */}
                        <div className="flex-1">
                          <div className={`flex items-center text-lg font-bold `}>
                            <div className= {`${isActive? `` :`opacity-30`}`}>
                              {sprint.sprintName} 
                            </div>
                            
                            {isActive? <AiOutlineUnlock className="ml-3"/> : isCompleted? ``:<AiOutlineLock className="ml-3"/>}
                          </div>
                          <table className="w-60">
                              <tbody>
                                <tr>
                                  <td className="text-sm text-black">
                                    Start from:
                                  </td>
                                  <td className="text-sm text-black">
                                    {start.toLocaleDateString()} ({start.toLocaleDateString(undefined, { weekday: 'short' })})
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-sm text-black">
                                    Ends by:
                                  </td>
                                  <td className="text-sm text-black">
                                    {end.toLocaleDateString()} ({end.toLocaleDateString(undefined, { weekday: 'short' })})
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                        </div>
                        {/* adding task Progress and Mark */}
                        <div className="flex items-center space-x-3">
                          {/* <span className="px-3 py-1 text-sm font-semibold rounded-md bg-red-100 text-gray-800">{task.storyPoint? task.storyPoint : "1"}</span> */}
                          <span
                            className={`px-3 py-1 text-sm font-semibold rounded-md ${
                              sprint.status === "Not Started"
                                ? "bg-blue-200 text-blue-800"
                                : sprint.status === "Active"
                                ? "bg-yellow-200 text-yellow-800"
                                : "bg-green-200 text-green-800"
                            }`}
                          >
                            {sprint.status}
                          </span>
                          <button className={isDeleting ? '' : 'invisible'}>
                            <AiOutlineDelete size={20} color="red" onClick={()=>{setIsOpen(true); setCurrentSprint(sprint)}}/>
                          </button>
                          <MiniPopUp isOpen={isOpen} setIsOpen={setIsOpen}>
                            <ProceedDelete
                              taskToDelete={currentSprint?._id}
                              isOpen={isOpen}
                              setIsOpen={setIsOpen}
                              deleteTask={handleDelete}
                            />
                          </MiniPopUp>
                        </div>
                      </div>
                    </td>
                  </tr>
                  )}
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/** pop-up views for each sprint or any other features required */}
      {/** pop-up for each sprint */}
      <PopUp isOpen={sprintOpen} setIsOpen={setSprintOpen}> 
        {currentSprint &&
        <SprintPage sprintData={currentSprint} setEditOpen={setEditOpen} setTaskOpen={setSprintOpen} assignedTasks={taskIds} isUpdated={isUpdated} setIsUpdated={setIsUpdated} startSprint={startSprint} endSprint={endSprint} />
        } 
      </PopUp>
      <PopUp isOpen={createOpen} setIsOpen={setCreateOpen}>
        <CreateSprint setIsOpen={setCreateOpen} />
      </PopUp>
      {/* <PopUp isOpen={editOpen} setIsOpen={setEditOpen}> */}
      {/* {currentTask && <EditTask taskData={currentTask} setEditOpen={setEditOpen} />} */}
      {/* </PopUp> */}
    </>
  );
};

export default SprintBoard;
