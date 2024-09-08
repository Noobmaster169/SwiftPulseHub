"use client";
import {SetStateAction, useState} from "react";
import { AiOutlineDelete } from "react-icons/ai";
import MiniPopUp from "./MiniPopUp";
import ProceedDelete from "./ProceedDelete";
import {TaskData} from "@/utils/interface";
import PopUp from "@/components/PopUp";
import IndividualTaskInfo from "@/components/IndividualTask";
import AddTaskPage from "@/components/AddTask";

const BacklogCard = () => {

    const [isInvisible, SetIsInvisible] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [taskOpen, setTaskOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState<TaskData | null>(null);

    const openTask = (task: TaskData) => {
      // Don't open task information if in deleting process
      if(isInvisible){return}
      setCurrentTask(task);
      setTaskOpen(true);
    }
 
    const mokcupData: TaskData[]= [
      {
        taskName    : "My Example Task 1",
        description : "My Example Description 1",
        type        : "Story",
        status      : "Not Started",
        storyPoint  : "5",
        assignedTo  : "Mario",
        finishedBy  : "2024-09-20",
        priority    : "High",
        tags        : ["Tag1", "Tag2", "Tag3"]
      },
      {
        taskName    : "My Example Task 2",
        description : "My Example Description 2",
        type        : "Story",
        status      : "In Progress",
        storyPoint  : "3",
        assignedTo  : "Shanwu",
        finishedBy  : "2024-09-22",
        priority    : "Low",
        tags        : ["Tag1", "Tag2", "Tag3"]
      },
      {
        taskName    : "My Example Task 3",
        description : "My Example Description 3",
        type        : "Story",
        status      : "In Progress",
        storyPoint  : "6",
        assignedTo  : "Shanwu",
        finishedBy  : "2024-09-22",
        priority    : "Medum",
        tags        : ["Tag1", "Tag2", "Tag3"]
      },
    ]

    return (
      <>
      <div className="flex min-h-screen flex-col items-start justify-start p-8 relative">
        {/*  "PRODUCT BACKLOG" title*/}
        <div className="h-16 bg-gray-400">
          Hi
        </div>
        <div className="absolute top-15 left-18 p-4 bg-blue-100 text-blue-800 font-bold text-lg rounded-md shadow-md">
          PRODUCT BACKLOG
        </div>
  
        {/* Filter Options */}
        <div className="flex items-center justify-between w-full mt-20 mb-4">
          <div className="flex items-center space-x-6">
            <button className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-300">
              Priority
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-300">
              Date
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-300">
              Tags
            </button>
          </div>
          <div className="space-x-4">
            <button 
              className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-400"
              onClick={() => SetIsInvisible(!isInvisible)}
            >
              Delete Task
            </button>
            <button className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-400" onClick={()=>{setCreateOpen(true)}}>
              Create Task
            </button>
          </div>
        </div>
  
  
        {/* Single-Column Table */}
        <div className="w-full flex items-center justify-center font-mono text-sm mt-4">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-4 px-4 border-b border-gray-300 text-left">Tasks</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 4 }, (_, i) => (  // Changed length from 10 to 4
                <tr key={i} className="relative hover:bg-gray-100" onClick={()=>{openTask(mokcupData[0])}}>
                  <td className="relative py-8 px-8 border-b border-gray-300 text-left">
                    <div className="flex items-center justify-between">
                      {/* task Name and Assigned To which member */}
                      <div className="flex-1">
                        <div className="text-lg font-bold">Task {i + 1}</div>
                        <div className="text-sm text-gray-600">Assigned to: Shanwu</div>
                        {/* the tags */}
                        {i === 0 && (
                          <div className="flex space-x-2 mt-2">
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Tag1#</span>
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Tag2#</span>
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Tag3#</span>
                          </div>
                        )}
                      </div>
                      {/* adding task Progress and Mark */}
                      <div className= {isInvisible? 'invisible':''}>
                        <div className = "flex items-center space-x-2">
                          <span className="px-3 py-1 text-sm font-semibold rounded-md bg-red-100 text-gray-800">3/10</span>
                          <span className={`px-3 py-1 text-sm font-semibold rounded-md ${
                            i % 3 === 0
                              ? 'bg-blue-200 text-blue-800'
                              : i % 3 === 1
                              ? 'bg-yellow-200 text-yellow-800'
                              : 'bg-green-200 text-green-800'
                          }`}>
                            {i % 3 === 0 ? 'Not Started' : i % 3 === 1 ? 'In Progress' : 'Complete'}
                          </span>
                        </div>
                      </div>
                      {/**Delete icon */}
                      <div className = "flex items-center space-x-2">
                        <button className= {isInvisible? '':'invisible'}>
                          <AiOutlineDelete size={20} onClick={()=>{setIsOpen(true)}}/>
                        </button>
                        <MiniPopUp isOpen={isOpen} setIsOpen={setIsOpen}>
                          <ProceedDelete isOpen={isOpen} setIsOpen={setIsOpen}/>
                        </MiniPopUp>
                      </div>
                      {/* Triangle */}
                      <div className={`absolute top-0 right-0 w-0 h-0 border-t-[40px] border-l-[40px] ${
                        i % 3 === 0
                          ? 'border-t-red-500'
                          : i % 3 === 1
                          ? 'border-t-yellow-500'
                          : 'border-t-green-500'
                      } border-transparent`}></div>
                    </div>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <PopUp isOpen={taskOpen} setIsOpen={setTaskOpen}>
          <IndividualTaskInfo taskData={mokcupData[0]}/> {/** Add Pop Up task detail */}
      </PopUp>
      <PopUp isOpen={createOpen} setIsOpen={setCreateOpen}>
          <AddTaskPage/>
      </PopUp>
      </>
    );
  }
  
  export default BacklogCard;