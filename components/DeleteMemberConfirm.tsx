import React, { useState, useEffect } from 'react';
import { memberData, TaskData } from '../utils/interface';
import MediumPopUp from './MediumPopUp'; // Assuming you have a MediumPopUp component
import PopUp from './PopUp';
import {fetchTask} from '@/utils/database';
import IndividualTaskInfo from "@/components/IndividualTask";
import EditTask from "@/components/EditTask";

interface DeleteMemberConfirmProps {
  member: any;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteMember: (member: any) => void;
  };


const DeleteMemberConfirm: React.FC<DeleteMemberConfirmProps> = ({ member, setIsOpen, deleteMember}) => {
  const [reassignOpen, setReassignOpen] = useState(false);
  const [assignedTasks, setAssignedTasks] = useState<TaskData[]>([]);
  const [isChecking, setIsChecking] = useState(true);
  const [taskOpen, setTaskOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<TaskData | null>(null);
  const [editOpen, setEditOpen] = useState<boolean>(false);

  //   const handleDelete = () => {
  //     if (hasAssignedTasks(member)) {
  //       setReassignOpen(true);
  //     } else {
  //       deleteMember(member);
  //       setIsOpen(false);
  //     }
  //   };
  const handleDelete = async () => {
    if(assignedTasks.length > 0){
      alert("Please Remove Task Before Deleting Member")
      return;
    }
    await deleteMember(member);  
    //setReassignOpen(true);
    setIsOpen(false);
  };

  const getTasks = async () => {
    const tasks = await fetchTask();
    const assignedTasks = tasks.filter((task: TaskData) => task.assignedTo === member.name);
    setAssignedTasks(assignedTasks);
    if(assignedTasks.length > 0){
      setReassignOpen(true);
    }else{
      setReassignOpen(false);
    }
    setIsChecking(false);
  }
  useEffect(()=>{
    getTasks();
  }, [editOpen])

  return (
    <div className="p-4 pt-6">
      {
      isChecking?<h2 className="text-xl text-center font-semibold mb-4">Checking For Member's Assigned Tasks</h2>:
      assignedTasks.length > 0? 
        <>
        <h2 className="text-xl text-center font-semibold mb-4">Member Has Assigned Task</h2>
        <div className="flex flex-row w-full justify-center items-center">
          <button className="bg-blue-400 px-4 py-2 rounded-md gont-semibold text-white"onClick={()=>{setReassignOpen(true)}}>Reassign Tasks</button>
        </div>
        </>:
        <>
        <h2 className="text-xl font-semibold mb-4">Delete Member</h2>
        <p>Are you sure you want to delete {member.name}?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="bg-gray-300 text-black rounded px-4 py-2"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white rounded px-4 py-2"
            onClick={handleDelete}
          >
            Confirm
          </button>
        </div>
        </>
      }
        <PopUp isOpen={reassignOpen} setIsOpen={setReassignOpen}>
          <div className="flex flex-col items-center p-4 w-full">
            <h2 className="text-2xl text-center font-bold mb-2">Attention!</h2>
            <p className="text-center font-semibold mb-4">Unassign these tasks from {member.name} before removing it!</p>
            <div className="flex flex-col justify-center items-center bg-yellow-100 p-4 rounded-md w-3/4">
              {assignedTasks.map((task: TaskData, i: number) => <>
                <div key={i} className="text-center w-full my-1 p-2 bg-white rounded shadow" onClick={()=>{setCurrentTask(task); setTaskOpen(true)}}>
                  <span>{task.taskName}</span>
                </div>
              </>)}
            </div>
            
            <div className="flex justify-center space-x-2 mt-10">
            <button
              className="bg-blue-500 text-white rounded px-4 py-2"
              onClick={() => {
              // Logic to reassign tasks
              setReassignOpen(false);
              setIsOpen(false);
              // Navigate back to the sprint board
              window.location.href = '/sprintBoard';
              }}
            >
              Head to Product Backlog
            </button>
            </div>
          </div>
        </PopUp>
        <PopUp isOpen={taskOpen} setIsOpen={setTaskOpen}>
          {currentTask && <IndividualTaskInfo taskData={currentTask} setEditOpen={setEditOpen} setTaskOpen={setTaskOpen} />}
        </PopUp>
        <PopUp isOpen={editOpen} setIsOpen={setEditOpen}>
          {currentTask && <EditTask taskData={currentTask} setEditOpen={setEditOpen} />}
        </PopUp>
    </div>
  );
};

export default DeleteMemberConfirm;