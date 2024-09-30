import React, { useState, useEffect } from "react";
import { TaskData, SprintData } from "@/utils/interface";
import { fetchTask } from '@/utils/database';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import PopUp from "@/components/PopUp";
import IndividualTaskInfo from "@/components/IndividualTask";
import EditTask from "@/components/EditTask";

interface SprintTaskProps{
    sprintData: SprintData;
    assignedTasks: string[];
    updateTasks: any;
}

export default function SprintTasks({sprintData, assignedTasks, updateTasks}: SprintTaskProps){
    const [database, setDatabase] = useState<TaskData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [displayedTasks, setDisplayedTasks] = useState<TaskData[]>([]);

    const [taskOpen, setTaskOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState<TaskData | null>(null);
    const [editOpen, setEditOpen] = useState<boolean>(false);

    let sprintTasks = sprintData.tasks;
    if(!sprintTasks){
        sprintTasks = [];
    }
    console.log("Sprint Tasks:", sprintTasks);
    console.log("Undisplayed Tasks:", assignedTasks);

    useEffect(() => {
        if(database.length == 0){
          setIsLoading(true);
        }
        const getDatabase = async () => {
          let data: TaskData[] = await fetchTask();
          if (!data) {
            data = [];
          }
          const sprintAssignedTasks: TaskData[] = [];
          data.forEach((task:any)=>{
            if(sprintTasks.includes(task._id)){
              sprintAssignedTasks.push(task);
            }
          })
          setDisplayedTasks(sprintAssignedTasks);

          setDatabase(data);
          setIsLoading(false);
        };
        getDatabase();
    }, []);

    useEffect(() => {
        console.log("Show Drag n Drop")
        let dragTemp: HTMLElement | null = null;
    
        // Handle drag start
        document.querySelectorAll('.drag').forEach(item => {
          item.addEventListener('dragstart', (e) => {
            dragTemp = e.target as HTMLElement;
            console.log('dragStart', dragTemp);
          });
        });
    
        // Handle drag over for drop areas
        document.querySelectorAll('.drop').forEach(dropZone => {
          dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
          });
        });
    
        // Handle drop for dp1
        const dp1 = document.getElementById('dp1');
        if (dp1) {
          dp1.addEventListener('drop', () => {
            if (dragTemp) dp1.appendChild(dragTemp);
          });
        }
    
        // Handle drop for dp2
        const dp2 = document.getElementById('dp2');
        if (dp2) {
          dp2.addEventListener('drop', () => {
            if (dragTemp) {
              dp2.appendChild(dragTemp);
              dp2.querySelectorAll('.drag').forEach((item:any) => {
                console.log(item.innerText);
              });
            }
          });
        }
    
        return () => {
          // Cleanup event listeners
          document.querySelectorAll('.drag').forEach(item => {
            item.removeEventListener('dragstart', () => {});
          });
    
          document.querySelectorAll('.drop').forEach(dropZone => {
            dropZone.removeEventListener('dragover', () => {});
          });
        };
    }, [database]);

    const handleUpdate = () =>{
        const dp1 = document.getElementById('dp1');    
        const selectedTasks: string[] = []
        dp1?.querySelectorAll('.drag').forEach((item) => {selectedTasks.push(item.id)});
        console.log(selectedTasks);
        updateTasks(selectedTasks);
    }

    return(
    <>
    <div className="w-full max-w-4xl grid grid-cols-2 gap-8">
        <div id="dp1" droppable="true" class="drop flex-1 bg-gray-100 rounded-lg shadow-lg p-5 space-y-1">
            <h2 className="text-lg font-semibold mb-3">Sprint Backlog</h2>
            {displayedTasks.map((task:any) => 
                <div id={task._id} draggable="true" class="drag w-full bg-white px-5 pt-4 pb-3 rounded-md shadow-md text-black" onClick={()=>{setCurrentTask(task);setTaskOpen(true)}}>
                    {task.taskName}
                    <div className="flex flex-row text-sm text-gray-500 pt-0.5">
                        <div className="mr-4">Type: {task.type}</div>
                        <div className="mr-4">Priority: {task.priority}</div>
                    </div>
                </div>
            )}
            {/*<div id="123" draggable="true" class="drag w-full bg-blue-100 p-5 rounded-md shadow-md text-white">Item1</div>
            <div id="124" draggable="true" class="drag w-full bg-blue-200 p-5 rounded-md shadow-md text-white">Item2</div>
            <div id="125" draggable="true" class="drag w-full bg-blue-300 p-5 rounded-md shadow-md text-white">Item3</div>
            <div id="1249" draggable="true" class="drag w-full bg-blue-400 p-5 rounded-md shadow-md text-white">Item4</div>
            <div id="168" draggable="true" class="drag w-full bg-blue-500 p-5 rounded-md shadow-md text-white">Item5</div>*/}
        </div>
        <div id="dp2" droppable="true" class="drop flex-1 bg-gray-100 rounded-lg shadow-lg p-5 space-y-1">
            <h2 className="text-lg font-semibold mb-3">Product Backlog</h2>
            {database.map((task:any) => {
               if(assignedTasks.includes(task._id)){return}
               return <div id={task._id} draggable="true" class="drag w-full bg-white px-5 pt-4 pb-3 rounded-md shadow-md text-black" onClick={()=>{setCurrentTask(task);setTaskOpen(true)}}>
                {task.taskName}
                <div className="flex flex-row text-sm text-gray-500 pt-0.5">
                    <div className="mr-4">Type: {task.type}</div>
                    <div className="mr-4">Priority: {task.priority}</div>
                </div>
                </div>
            })}
        </div>
    </div>
    <button className="w-1/2 p-2 m-6 bg-blue-500 font-semibold text-white rounded-md " onClick={handleUpdate}>Update Sprint</button>
    <PopUp isOpen={taskOpen} setIsOpen={setTaskOpen}>
        {currentTask && <IndividualTaskInfo taskData={currentTask} setEditOpen={setEditOpen} setTaskOpen={setTaskOpen} />}
    </PopUp>
    <PopUp isOpen={editOpen} setIsOpen={setEditOpen}>
        {currentTask && <EditTask taskData={currentTask} setEditOpen={setEditOpen} />}
    </PopUp>
    </>)
}