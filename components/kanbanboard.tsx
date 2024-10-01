import React, { useEffect } from 'react';
import { TaskData } from '@/utils/interface';
import { fetchTask } from '@/utils/database';
import { useState } from 'react';
import PopUp from "@/components/PopUp";
import IndividualTaskInfo from "@/components/IndividualTask";
import EditTask from "@/components/EditTask";
import {updateTask} from "@/utils/database";

type KanbanBoardProps = {
  tasks: string[];
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks }) => {
  const [database, setDatabase] = useState<TaskData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayedTasks, setDisplayedTasks] = useState<TaskData[]>([]); // List of Sprint Tasks

  const [taskOpen, setTaskOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<TaskData | null>(null);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  
  useEffect(() => {
    if(database.length == 0){setIsLoading(true);}
    const getDatabase = async () => {
      let data: TaskData[] = await fetchTask();
      if (!data) {data = [];}
      const sprintAssignedTasks: TaskData[] = [];
      data.forEach((task:any)=>{
        if(tasks.includes(task._id)){sprintAssignedTasks.push(task);}
      })
      setDisplayedTasks(sprintAssignedTasks);
      setDatabase(data);
      setIsLoading(false);
    };
    getDatabase();
  }, []);
  
  
  const sortedTasks = tasks.sort((a, b) => {
    const priorityOrder = ["low", "medium", "high", "urgent"];
    return priorityOrder.indexOf(a.priority?.toLowerCase() || "") - priorityOrder.indexOf(b.priority?.toLowerCase() || "");
  });

  const updateChanges= async (id:string, status:string)=>{
    console.log("Assigning Task with ID:", id, "to Status:", status);
    let task = database.find(task => task._id === id);
    if(task){
      task.status = status;
      await updateTask(task);
      console.log("Task Updated");
    }else{
      console.log("Task is not found");
    }
  }

  useEffect(() => {
    let dragTemp: HTMLElement | null = null;

    // Handle drag start
    document.querySelectorAll('.drag').forEach(item => {
      item.addEventListener('dragstart', (e) => {
        dragTemp = e.target as HTMLElement;
        //console.log('dragStart', dragTemp);
      });
    });

    // Handle drag over for drop areas
    document.querySelectorAll('.drop').forEach(dropZone => {
      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
      });
    });

    // Handle drop
    document.querySelectorAll('.drop').forEach(dropZone => {
      dropZone.addEventListener('drop', () => {
        if (dragTemp) {
          dropZone.appendChild(dragTemp);
          updateChanges(dragTemp.id, dropZone.id);
        }
      });
    });

    return () => {
      // Cleanup event listeners
      document.querySelectorAll('.drag').forEach(item => {
        item.removeEventListener('dragstart', () => {});
      });

      document.querySelectorAll('.drop').forEach(dropZone => {
        dropZone.removeEventListener('dragover', () => {});
        dropZone.removeEventListener('drop', () => {});
      });
    };
  }, [displayedTasks]);

  return (
    <><div className="mt-6 grid grid-cols-3 gap-4 w-full">
      {/*style={{ transform: 'rotate(-5deg)' }}*/}
      <div id="Not Started" className="bg-blue-100 p-4 rounded-md drop w-52">
        <h3 className="font-bold text-blue-800">Not Started</h3>
        {displayedTasks.filter(task => task.status === 'Not Started').map((task:any) => 
          <div id={task._id} draggable="true" class="drag w-full bg-white my-2 px-5 pt-4 pb-3 rounded-md shadow-md text-black" onClick={()=>{setCurrentTask(task);setTaskOpen(true)}}>
              {task.taskName}
          </div>
        )}
        {/*sortedTasks.filter(task => task.status === 'Not Started').map(task => (
          <div key={task._id} draggable="true" className="mt-2 p-2 bg-white rounded-md shadow-md drag">
            {task.taskName}
          </div>
        ))*/}
        {/* Mock-up example tasks 
        <div draggable="true" className="mt-2 p-2 bg-white rounded-md shadow-md drag">Example Task 1</div>*/}
      </div>
      <div id="In Progress" className="bg-yellow-100 p-4 rounded-md drop w-52">
        <h3 className="font-bold text-yellow-800">In Progress</h3>
        {displayedTasks.filter(task => task.status === 'In Progress').map((task:any) => 
          <div id={task._id} draggable="true" class="drag w-full bg-white my-2 px-5 pt-4 pb-3 rounded-md shadow-md text-black" onClick={()=>{setCurrentTask(task);setTaskOpen(true)}}>
              {task.taskName}
          </div>
        )}
        {/*sortedTasks.filter(task => task.status === 'In Progress').map(task => (
          <div key={task._id} draggable="true" className="mt-2 p-2 bg-white rounded-md shadow-md drag">
            {task.taskName}
          </div>
        ))*/}
        {/* Mock-up example tasks 
        <div draggable="true" className="mt-2 p-2 bg-white rounded-md shadow-md drag">Example</div>*/}
      </div>
      <div id="Completed" className="bg-green-100 p-4 rounded-md drop w-52">
        <h3 className="font-bold text-green-800">Completed</h3>
        {displayedTasks.filter(task => task.status === 'Completed').map((task:any) => 
          <div id={task._id} draggable="true" class="drag w-full bg-white my-2 px-5 pt-4 pb-3 rounded-md shadow-md text-black" onClick={()=>{setCurrentTask(task);setTaskOpen(true)}}>
              {task.taskName}
          </div>
        )}
        {/*sortedTasks.filter(task => task.status === 'Completed').map(task => (
          <div key={task._id} draggable="true" className="mt-2 p-2 bg-white rounded-md shadow-md drag">
            {task.taskName}
          </div>
        ))*/}
        {/* Mock-up example tasks
        <div draggable="true" className="mt-2 p-2 bg-white rounded-md shadow-md drag">3</div>*/}
      </div>
    </div>
    <PopUp isOpen={taskOpen} setIsOpen={setTaskOpen}>
        {currentTask && <IndividualTaskInfo taskData={currentTask} setEditOpen={setEditOpen} setTaskOpen={setTaskOpen} />}
    </PopUp>
    <PopUp isOpen={editOpen} setIsOpen={setEditOpen}>
        {currentTask && <EditTask taskData={currentTask} setEditOpen={setEditOpen} />}
    </PopUp>
   </> 
  );
};

export default KanbanBoard;