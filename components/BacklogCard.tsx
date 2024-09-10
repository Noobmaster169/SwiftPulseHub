"use client";
import {SetStateAction, useState, useEffect} from "react";
import { AiOutlineDelete } from "react-icons/ai";
import MiniPopUp from "./MiniPopUp";
import ProceedDelete from "./ProceedDelete";
import {TaskData} from "@/utils/interface";
import PopUp from "@/components/PopUp";
import IndividualTaskInfo from "@/components/IndividualTask";
import AddTaskPage from "@/components/AddTask";
import EditTask from "@/components/EditTask";
import { updateTask, addTask, deleteTask, fetchTask } from '@/utils/database';

type BacklogCardProps = {
  taskOpen: boolean;
  setTaskOpen: React.Dispatch<React.SetStateAction<boolean>>;
  createOpen: boolean;
  setCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BacklogCard = ({taskOpen, setTaskOpen, createOpen, setCreateOpen}: BacklogCardProps) => {
    const [database, setDatabase] = useState<any>([]);
    const [isInvisible, SetIsInvisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [editOpen, setEditOpen] = useState<boolean>(false);
    
    const [currentTask, setCurrentTask] = useState<TaskData | null>(null);

    useEffect(() => {
      setIsLoading(true);
      const getDatabase = async ()=>{
          const data: TaskData[] = await fetchTask();
          let modified_data = data.map((task: TaskData) => {return {...task, isDeleted: false}});
          if(!modified_data){
            modified_data = [];
          }
          setDatabase(modified_data);
          setIsLoading(false);
      }
      getDatabase();
    }, [createOpen, isOpen, editOpen]);

    const openTask = (task: TaskData) => {
      // Don't open task information if in deleting process
      if(isInvisible){return}
      setCurrentTask(task);
      setTaskOpen(true);
    }

    const editTask = ()=>{
      setEditOpen(true);
      setTaskOpen(false);
    }

    const runDeleteTask = async (taskToDelete: TaskData) => {
      const taskData:any = taskToDelete;
      try{
        await deleteTask(taskData._id);
      }catch(e){
        console.log(e);
      }
    };
 
    return (
      <>
      <div className="flex min-h-screen flex-col items-start justify-start p-8 relative">
        {/*  "PRODUCT BACKLOG" title*/}
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
              className={`px-4 py-2 ${isInvisible?'bg-red-500 text-white':'bg-gray-300 text-gray-700'} font-semibold rounded-md shadow-md hover:bg-red-400`}
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
                <th className="py-4 px-4 border-b border-gray-300 text-left">{isLoading? "Loading Tasks..." : "Tasks"}</th>
              </tr>
            </thead>
            <tbody>      
              {!isLoading && database
              .filter((task:any) => !task.isDeleted)
              .map((task:any, i:number) => (
                <tr key={i} className="relative hover:bg-gray-100" onClick={()=>{openTask(task)}}>
                  <td className="relative py-8 px-8 border-b border-gray-300 text-left">
                    <div className="flex items-center justify-between">
                      {/* task Name and Assigned To which member */}
                      <div className="flex-1">
                        <div className="text-lg font-bold">{task.taskName}</div>
                        <div className="text-sm text-gray-600">Assigned to: {task.assignedTo}</div>
                        {/* the tags */}
                        {task.tags && (
                        <div className="flex space-x-2 mt-2">
                          {task.tags.map((tag:any, index:number) => (
                            <span
                              key={index}
                              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                index % 3 === 0
                                  ? 'bg-purple-100 text-purple-800'
                                  : index % 3 === 1
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      </div>
                      {/* adding task Progress and Mark */}
                      <div className= {isInvisible? 'invisible':''}>
                        <div className = "flex items-center space-x-2">
                          <span className="px-3 py-1 text-sm font-semibold rounded-md bg-red-100 text-gray-800">{task.storyPoint}</span>
                          <span className={`px-3 py-1 text-sm font-semibold rounded-md ${
                            task.status === 'Not Started'
                              ? 'bg-blue-200 text-blue-800'
                              : task.status === 'In Progress'
                              ? 'bg-yellow-200 text-yellow-800'
                              : 'bg-green-200 text-green-800'
                          }`}>
                            {task.status}
                          </span>
                        </div>
                      </div>
                      {/**Delete icon */}
                      <div className = "flex items-center space-x-2">
                        <button className= {isInvisible? '':'invisible'}>
                          <AiOutlineDelete size={20} onClick={()=>{setIsOpen(true), setCurrentTask(task)}}/>
                        </button>
                        <MiniPopUp isOpen={isOpen} setIsOpen={setIsOpen}>
                          <ProceedDelete 
                            taskToDelete={currentTask} 
                            isOpen={isOpen} 
                            setIsOpen={setIsOpen}
                            deleteTask = {runDeleteTask}
                          />
                        </MiniPopUp>
                      </div>
                      {/* Triangle */}
                      <div className={`absolute top-0 right-0 w-0 h-0 border-t-[40px] border-l-[40px] ${
                        task.priority === 'Urgent'
                          ? 'border-t-red-500'
                          : task.priority === 'High'
                          ? 'border-t-orange-500'
                          : task.priority === 'Medium'
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
          {currentTask && <IndividualTaskInfo taskData={currentTask} setEditOpen={setEditOpen} setTaskOpen={setTaskOpen}/>} {/** Add Pop Up task detail */}
      </PopUp>
      <PopUp isOpen={createOpen} setIsOpen={setCreateOpen}>
          <AddTaskPage setIsOpen={setCreateOpen}/>
      </PopUp>
      <PopUp isOpen={editOpen} setIsOpen={setEditOpen}>
          {currentTask && <EditTask taskData={currentTask} setEditOpen={setEditOpen}/>}
      </PopUp>
      </>
    );
  }
  
  export default BacklogCard;