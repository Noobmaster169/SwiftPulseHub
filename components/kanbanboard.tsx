import React, { useEffect, useState } from 'react';
import { TaskData } from '@/utils/interface';
import { fetchTask, updateTask } from '@/utils/database';
import PopUp from "@/components/PopUp";
import IndividualTaskInfo from "@/components/IndividualTask";
import EditTask from "@/components/EditTask";
import AddTimeLog from "@/components/AddTimeLog";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";

type KanbanBoardProps = {
  tasks: string[];
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks }) => {
  const [database, setDatabase] = useState<TaskData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayedTasks, setDisplayedTasks] = useState<TaskData[]>([]);
  const [taskOpen, setTaskOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<TaskData | null>(null);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [timeLogOpen, setTimeLogOpen] = useState(false);

  useEffect(() => {
    if (database.length == 0) { setIsLoading(true); }
    const getDatabase = async () => {
      let data: TaskData[] = await fetchTask();
      if (!data) { data = []; }
      const sprintAssignedTasks: TaskData[] = [];
      data.forEach((task: any) => {
        if (tasks.includes(task._id)) { sprintAssignedTasks.push(task); }
      });
      setDisplayedTasks(sprintAssignedTasks);
      setDatabase(data);
      setIsLoading(false);
    };
    getDatabase();
  }, []);

  const toggleExpand = (taskId: string) => {
    setExpandedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const handleAddTimeLog = (task: TaskData) => {
    setCurrentTask(task);
    setTimeLogOpen(true);
  };

  const updateChanges = async (id: string, status: string) => {
    console.log("Assigning Task with ID:", id, "to Status:", status);
    let task = database.find(task => task._id === id);
    
    setDisplayedTasks(prevTasks => 
      prevTasks.map(task => 
        task._id === id ? { ...task, status} : task
      )
    );

    if (task) {
      task.status = status;
      //task.status = "Not Started";
      await updateTask(task);
      console.log("Task Updated");
    } else {
      console.log("Task is not found");
    }
  };

  useEffect(() => {
    let dragTemp: HTMLElement | null = null;

    // Handle drag start
    document.querySelectorAll('.drag').forEach(item => {
      item.addEventListener('dragstart', (e) => {
        dragTemp = e.target as HTMLElement;
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
          //dropZone.appendChild(dragTemp);
          updateChanges(dragTemp.id, dropZone.id);
          dragTemp=null;
        }
      });
    });

    return () => {
      // Cleanup event listeners
      document.querySelectorAll('.drag').forEach(item => {
        item.removeEventListener('dragstart', () => { });
      });

      document.querySelectorAll('.drop').forEach(dropZone => {
        dropZone.removeEventListener('dragover', () => { });
        dropZone.removeEventListener('drop', () => { });
      });
    };
  }, [displayedTasks]);

  return (
    <>
      <div className="mt-6 grid grid-cols-3 gap-4 w-full">
        <div id="Not Started" className="bg-blue-100 p-4 rounded-md drop w-52">
          <h3 className="font-bold text-blue-800">Not Started</h3>
          {displayedTasks.filter(task => task.status === 'Not Started').map((task: any) =>
            <div key={task._id} id={task._id} draggable="true" className="drag w-full bg-white my-2 px-5 pt-4 pb-3 rounded-md shadow-md text-black" onClick={() => { setCurrentTask(task); setTaskOpen(true) }}>
              <div className="flex justify-between items-center">
                <span>{task.taskName}</span>
                {/*expandedTasks.has(task._id) ? (
                  <VscChevronUp onClick={() => toggleExpand(task._id)} />
                ) : (
                  <VscChevronDown onClick={() => toggleExpand(task._id)} />
                )*/}
              </div>
              {/*expandedTasks.has(task._id) && (
                <div className="text-xs mt-2">
                  <p>Assigned to: {task.assignedTo || "None"}</p>
                  <p>Accumulated Time Logged: {task.timeLogged || 0} hours</p>
                  <button onClick={() => handleAddTimeLog(task)} className="text-blue-500">Add Time Log</button>
                </div>
              )*/}
            </div>
          )}
        </div>
        <div id="In Progress" className="bg-yellow-100 p-4 rounded-md drop w-52">
          <h3 className="font-bold text-yellow-800">In Progress</h3>
          {displayedTasks.filter(task => task.status === 'In Progress').map((task: any) =>
            <div key={task._id} id={task._id} draggable="true" className="drag w-full bg-white my-2 px-5 pt-4 pb-3 rounded-md shadow-md text-black" onClick={() => { setCurrentTask(task); setTaskOpen(true) }}>
              <div className="flex justify-between items-center">
                <span>{task.taskName}</span>
                {/*expandedTasks.has(task._id) ? (
                  <VscChevronUp onClick={() => toggleExpand(task._id)} />
                ) : (
                  <VscChevronDown onClick={() => toggleExpand(task._id)} />
                )*/}
              </div>
              {/*expandedTasks.has(task._id) && (
                <div className="text-xs mt-2">
                  <p>Assigned to: {task.assignedTo || "None"}</p>
                  <p>Accumulated Time Logged: {task.timeLogged || 0} hours</p>
                  <button onClick={() => handleAddTimeLog(task)} className="text-blue-500">Add Time Log</button>
                </div>
              )*/}
            </div>
          )}
        </div>
        <div id="Completed" className="bg-green-100 p-4 rounded-md drop w-52">
          <h3 className="font-bold text-green-800">Completed</h3>
          {displayedTasks.filter(task => task.status === 'Completed').map((task: any) =>
            <div key={task._id} id={task._id} draggable="true" className="drag w-full bg-white my-2 px-5 pt-4 pb-3 rounded-md shadow-md text-black" onClick={() => { setCurrentTask(task); setTaskOpen(true) }}>
              <div className="flex justify-between items-center">
                <span>{task.taskName}</span>
                {/*expandedTasks.has(task._id) ? (
                  <VscChevronUp onClick={() => toggleExpand(task._id)} />
                ) : (
                  <VscChevronDown onClick={() => toggleExpand(task._id)} />
                )*/}
              </div>
              {/*expandedTasks.has(task._id) && (
                <div className="text-xs mt-2">
                  <p>Assigned to: {task.assignedTo || "None"}</p>
                  <p>Accumulated Time Logged: {task.timeLogged || 0} hours</p>
                  <button onClick={() => handleAddTimeLog(task)} className="text-blue-500">Add Time Log</button>
                </div>
              )*/}
            </div>
          )}
        </div>
      </div>
      <PopUp isOpen={taskOpen} setIsOpen={setTaskOpen}>
        {currentTask && <IndividualTaskInfo taskData={currentTask} setEditOpen={setEditOpen} setTaskOpen={setTaskOpen} />}
      </PopUp>
      <PopUp isOpen={editOpen} setIsOpen={setEditOpen}>
        {currentTask && <EditTask taskData={currentTask} setEditOpen={setEditOpen} />}
      </PopUp>
      {/*<PopUp isOpen={timeLogOpen} setIsOpen={setTimeLogOpen}>
        {currentTask && <AddTimeLog taskData={currentTask} setIsOpen={setTimeLogOpen} />}
      </PopUp>*/}
    </>
  );
};

export default KanbanBoard;