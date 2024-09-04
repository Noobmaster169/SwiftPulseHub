/**
 * Renders a pop-up window that displays detailed information about an individual task. It includes various sections
 * such as task title, description, assigned personnel, progress status, edit history, and tags.
 */

import React from "react";

const IndividualTaskInfo = ()=> {
  return (
    <div className="w-full">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-purple-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
              JQ
            </div>
            <h2 className="text-2xl font-semibold ml-4 ">Important task 1</h2>
          </div>
          <button className="text-gray-400 hover:text-gray-600 mr-2">
            (Edit button)
          </button>
        </div>

        <p className="text-gray-700">Description: this is the description of important task 1</p>

        <div className="mt-4 flex flex-wrap space-x-2">
          <span className="inline-block bg-purple-400 text-white rounded-full px-3 py-1 text-sm font-semibold">#tag1</span>
          <span className="inline-block bg-blue-300 text-white rounded-full px-3 py-1 text-sm font-semibold">#tag2</span>
          <span className="inline-block bg-red-500 text-white rounded-full px-3 py-1 text-sm font-semibold">#tag3</span>
          <span className="inline-block bg-yellow-400 text-white rounded-full px-3 py-1 text-sm font-semibold">#tag4</span>
        </div>
        

        <div className="mt-6 space-y-4">
            <p><strong>Assigned to:</strong> Jia Qian</p>
            <p><strong>Finished by:</strong> 11/09/2024 </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <p><strong>Progress status:</strong> <span className="inline-block bg-blue-300 text-black rounded-full px-3 py-1 text-sm font-semibold">not started</span></p>
            </div>
            <div>
              <p><strong>Storypoint:</strong> <span className="inline-block bg-red-300 text-black rounded-full px-3 py-1 text-sm font-semibold">3 / 10</span></p>
            </div>
            <div>
              <p><strong>Type:</strong> user story</p>
            </div>
            <div>
              <p><strong>Priority:</strong> medium</p>
            </div>
          </div>
          

        <div className="mt-6 ">
          <div className="flex justify between mb-2 gap-2">
            <h3 className="text-lg font-semibold">Edit history</h3>
            <button className="text-sm text-gray-400 hover:text-gray-600">
              (drop-down/up button)
            </button>
          </div>
            
          <ul className="list-none">
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
