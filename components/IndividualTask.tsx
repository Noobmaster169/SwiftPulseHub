/**
 * Renders a pop-up window that displays detailed information about an individual task. It includes various sections
 * such as task title, description, assigned personnel, progress status, edit history, and tags.
 */

import { TaskData, Log } from "@/utils/interface";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import EditTask from "./EditTask";
import { updateTask, addTask, deleteTask, fetchTask } from "@/utils/database";
import AddTimeLog from "@/components/AddTimeLog";
import PopUp from "@/components/PopUp";
import MediumPopUp from "@/components/MediumPopUp";
import {useUser} from '@/context/UserContext';
import TaskEditHistory from "./TaskEditHistory";

interface IndividualTaskInfoProps {
  taskData: TaskData;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const colour = ["bg-purple-400", "bg-blue-300", "bg-red-500", "bg-yellow-400 "];

const IndividualTaskInfo = ({
  taskData,
  setEditOpen,
  setTaskOpen,
}: IndividualTaskInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTaskData, setUpdatedTaskData] = useState(taskData);
  const [timeLogOpen, setTimeLogOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState<boolean>(false); 
  const [currentTask, setCurrentTask] = useState<TaskData | null>(null);

  const handleEdit = () => {
    setEditOpen(true);
    setTaskOpen(false);
  };
  const {currentUser} = useUser();

  return (
    <div className="w-full">
      {isEditing ? (
        <EditTask taskData={updatedTaskData} setEditOpen={setEditOpen} />
      ) : (
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-purple-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
                {taskData.assignedTo
                  ? taskData.assignedTo.charAt(0).toUpperCase()
                  : ""}
              </div>
              <h2 className="text-2xl font-semibold ml-4 ">
                {taskData.taskName ? taskData.taskName : "Unknown task name"}
              </h2>
            </div>
            <div className="flex space-x-3">
              {/* Edit History Button */}
              <button
                className="px-3 py-1 text-sm font-semibold rounded-md bg-gray-200 text-black hover:bg-gray-300"
                onClick={() => { setHistoryOpen(true); setCurrentTask(taskData); }}
              >
                Task Edit History
              </button>
              <button
                onClick={handleEdit}
                className="px-3 py-1 text-sm font-semibold rounded-md bg-gray-200 text-black hover:bg-gray-300"
              >
                Edit Task
              </button>
            </div>
          </div>

          <p className="mt-4 text-gray-700">
            Description: {taskData.description ? taskData.description : ""}
          </p>

          <div className="mt-4 flex flex-wrap space-x-2">
            {Array.from(
              { length: taskData.tags ? taskData.tags.length : 0 },
              (_, i) => (
                <span
                  className={`inline-block ${
                    colour[i % 4]
                  } text-white rounded-full px-3 py-1 text-sm font-semibold`}
                >
                  {taskData.tags ? taskData.tags[i] : ""}
                </span>
              )
            )}
          </div>

          <div className="mt-6 space-y-4">
            <p>
              <strong>Assigned to: </strong>
              {taskData.assignedTo}
            </p>
            <p>
              <strong>Project Stage: </strong>
              {taskData.projectStage}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <p>
                <strong>Progress status: </strong>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                    taskData.status?.toLowerCase() === "not started" ||
                    !taskData.status
                      ? "bg-blue-200 text-blue-800"
                      : taskData.status?.toLowerCase() === "in progress"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {taskData.status ? taskData.status : "not started"}
                </span>
              </p>
            </div>
            <div>
              <p>
                <strong>Storypoint: </strong>{" "}
                <span className="inline-block bg-red-300 text-black rounded-full px-3 py-1 text-sm font-semibold">
                  {taskData.storyPoint ? taskData.storyPoint : 0}
                </span>
              </p>
            </div>
            <div>
              <p>
                <strong>Type: </strong>
                {taskData.type ? taskData.type : "story"}
              </p>
            </div>
            <div>
              <p>
                <strong>Priority: </strong>
                {taskData.priority ? taskData.priority : "low"}
              </p>
            </div>
          </div>
          {currentUser.name === taskData.assignedTo ? <button onClick={()=>{setTimeLogOpen(true)}} className="bg-gray-200 text-black px-4 py-2 mt-10 rounded-md hover:bg-gray-300 hover:ring hover:ring-gray-400">
            Add Time Log
          </button>: ""}
          <div className="my-6 py-2 px-4 bg-purple-100 rounded-lg">
            <div className="text-lg font-semibold py-2">Time Logs</div>
            {taskData.timeLog ?
              taskData.timeLog.length === 0 ? 
                <div className="py-3 text-gray-500 border-t-2 border-black border-opacity-50">{"(Time Log is still empty)"}</div> 
                :
                taskData.timeLog.map((log:Log) => 
                  <div className="p-3 flex flex-col border-t-2 border-black border-opacity-50 hover:bg-purple-200">
                    <div className="flex flex-row items-center">
                      <div className="bg-purple-500 text-white rounded-full h-12 w-12 flex items-center justify-center mr-4 flex-shrink-0">
                        {taskData.assignedTo?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col justify-start">
                        <div className="flex flex-row">
                          <div className="text-lg font-semibold pr-1">{taskData.assignedTo}</div>
                          <div className="text-lg font-medium">({log.timeLogged} hours)</div>
                        </div>
                        <div>{log.message}</div>
                      </div>
                    </div>
                  </div>
                )
              : <div className="py-3 text-gray-500 border-t-2 border-black border-opacity-50">{"(Time Log is still empty)"}</div>
            }
          </div>
        </div>
      )}
      <MediumPopUp isOpen={timeLogOpen} setIsOpen={setTimeLogOpen}>
        <AddTimeLog taskData={taskData} setIsOpen={setTimeLogOpen} />
      </MediumPopUp>
      <PopUp isOpen={historyOpen} setIsOpen={setHistoryOpen}>
          {currentTask && <TaskEditHistory taskEditHistory={currentTask.taskEditHistory || []} />}
      </PopUp>
    </div>
  );
};

export default IndividualTaskInfo;
