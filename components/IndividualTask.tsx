/**
 * Renders a pop-up window that displays detailed information about an individual task. It includes various sections
 * such as task title, description, assigned personnel, progress status, edit history, and tags.
 */

import { TaskData } from "@/utils/interface";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoMdArrowDropup } from "react-icons/io";

interface IndividualTaskInfoProps {
  taskData: TaskData;
}

const colour = ['bg-purple-400','bg-blue-300','bg-red-500','bg-yellow-400 ']

const IndividualTaskInfo= ({taskData}:IndividualTaskInfoProps)=> {
  return (
    <div className="w-full">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-purple-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
              {(taskData.assignedTo)? (taskData.assignedTo).charAt(0).toUpperCase(): ''}
            </div>
            <h2 className="text-2xl font-semibold ml-4 ">{taskData.taskName?taskData.taskName:'Unknown task name'}</h2>
          </div>
          <button className="text-gray-400 hover:text-gray-600 mb-2 mr-4">
            <FaRegEdit size={20} />
          </button>
        </div>

        <p className="mt-4 text-gray-700">Description: {taskData.description?taskData.description:''}</p>

        <div className="mt-4 flex flex-wrap space-x-2">
          {Array.from({length:((taskData.tags)? taskData.tags.length : 0)}, (_,i) => (
            <span className={`inline-block ${colour[i % 4]} text-white rounded-full px-3 py-1 text-sm font-semibold`}>{taskData.tags? taskData.tags[i]:''}</span>
          ))}
        </div>

        <div className="mt-6 space-y-4">
            <p><strong>Assigned to: </strong>{taskData.assignedTo}</p>
            <p><strong>Finished by: </strong>{taskData.finishedBy}</p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <p><strong>Progress status: </strong> 
                <span 
                  className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                    taskData.status?.toLowerCase() === "not started" || !taskData.status
                    ? 'bg-blue-200 text-blue-800'
                    : taskData.status?.toLowerCase() === "in progress"
                    ? 'bg-yellow-200 text-yellow-800'
                    : 'bg-green-200 text-green-800'
                  }`}>
                  {taskData.status?taskData.status:'not started'}
                </span>
              </p>
            </div>
            <div>
              <p><strong>Storypoint: </strong> <span className="inline-block bg-red-300 text-black rounded-full px-3 py-1 text-sm font-semibold">{taskData.storyPoint?taskData.storyPoint:0}</span></p>
            </div>
            <div>
              <p><strong>Type: </strong>{taskData.type?taskData.type:'story'}</p>
            </div>
            <div>
              <p><strong>Priority: </strong>{taskData.priority?taskData.priority:'low'}</p>
            </div>
          </div>
          

        <div className="mt-6 ">
          <div className="flex justify between mb-2 gap-2">
            <h3 className="text-lg font-semibold">Edit history</h3>
            <button className="text-sm text-gray-400 hover:text-gray-600">
            <IoMdArrowDropup size={22}/>
            </button>
          </div>
            
          <ul className="list-none mb-6">
            <li className="flex justify-start items-center bg-purple-100 p-2 rounded mb-1 gap-3">
              <div className="ml-1.5 bg-purple-500 text-white rounded-full h-8 w-8 flex items-center justify-center">
                V
              </div>
              <span className="text-sm">Edited by Vanessa at 9.00am today</span>
            </li>
            <li className="flex justify-start items-center bg-purple-100 p-2 rounded mb-1 gap-3">
              <div className="ml-1.5 bg-purple-500 text-white rounded-full h-8 w-8 flex items-center justify-center">
                S
              </div>
              <span className="text-sm">Edited by Shanwu at 2.20pm</span>  
            </li>
            <li className="flex justify-start items-center bg-purple-100 p-2 rounded mb-1 gap-3">
              <div className="ml-1.5 bg-purple-500 text-white rounded-full h-8 w-8 flex items-center justify-center">
                JQ
              </div>
              <span className="text-sm">Edited by Jia Qian at 6.45pm</span> {/* Adjusted margin-left */}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default IndividualTaskInfo;
