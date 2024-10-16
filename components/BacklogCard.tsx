"use client";
import { SetStateAction, useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import MiniPopUp from "./MiniPopUp";
import ProceedDelete from "./ProceedDelete";
import { TaskData } from "@/utils/interface";
import PopUp from "@/components/PopUp";
import IndividualTaskInfo from "@/components/IndividualTask";
import AddTaskPage from "@/components/AddTask";
import EditTask from "@/components/EditTask";
import TaskEditHistory from "@/components/TaskEditHistory"; 
import { updateTask, addTask, deleteTask, fetchTask } from '@/utils/database';
import React from 'react';

type BacklogCardProps = {
  taskOpen: boolean;
  setTaskOpen: React.Dispatch<React.SetStateAction<boolean>>;
  createOpen: boolean;
  setCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BacklogCard = ({ taskOpen, setTaskOpen, createOpen, setCreateOpen }: BacklogCardProps) => {
  const [database, setDatabase] = useState<TaskData[]>([]);
  const [isInvisible, SetIsInvisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [historyOpen, setHistoryOpen] = useState<boolean>(false); 
  const [currentTask, setCurrentTask] = useState<TaskData | null>(null);
  const [prioritySort, setPrioritySort] = useState<string | null>(null);
  const [dateSort, setDateSort] = useState<string | null>(null);
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (database.length == 0) {
      setIsLoading(true);
    }
    const getDatabase = async () => {
      let data: TaskData[] = await fetchTask();
      if (!data) {
        data = [];
      }
      const modified_data = data.map((task: TaskData) => ({ ...task, isDeleted: false }));
      setDatabase(modified_data);
      setIsLoading(false);

      const tags = new Set<string>();
      modified_data.forEach(task => {
        task.tags?.forEach(tag => tags.add(tag));
      });
      setAvailableTags(Array.from(tags));
    };
    getDatabase();
  }, [createOpen, isOpen, editOpen, historyOpen]);

  const openTask = (task: TaskData) => {
    if (isInvisible) return;
    setCurrentTask(task);
    setTaskOpen(true);
  };

  const editTask = () => {
    setEditOpen(true);
    setTaskOpen(false);
  };

  const openTaskEditHistory = () => {
    setHistoryOpen(true);
    setTaskOpen(false);
  };

  const runDeleteTask = async (taskToDelete: TaskData) => {
    const taskData: any = taskToDelete;
    try {
      await deleteTask(taskData._id);
    } catch (e) {
      console.log(e);
    }
  };

  const sortedAndFilteredTasks = database
    .filter((task: TaskData) => !task.isDeleted && (filterTags.length === 0 || filterTags.some(tag => task.tags?.includes(tag))))
    .sort((a: TaskData, b: TaskData) => {
      const priorityOrder = ["low", "medium", "high", "urgent"];
      const priorityComparison = priorityOrder.indexOf(a.priority?.toLowerCase() || "") - priorityOrder.indexOf(b.priority?.toLowerCase() || "");
      const dateComparison = new Date(a.createdAt || "").getTime() - new Date(b.createdAt || "").getTime();

      if (prioritySort === "low-to-high") {
        return priorityComparison;
      } else if (prioritySort === "high-to-low") {
        return -priorityComparison;
      } else if (dateSort === "recent-to-past") {
        return -dateComparison;
      } else if (dateSort === "old-to-latest") {
        return dateComparison;
      }
      return 0;
    });

  const handlePrioritySort = (sortOption: string) => {
    setPrioritySort(sortOption);
    setDateSort(null); 
    setActiveDropdown(null); 
  };

  const handleDateSort = (sortOption: string) => {
    setDateSort(sortOption);
    setPrioritySort(null); 
    setActiveDropdown(null); 
  };

  const toggleDropdown = (dropdownName: string) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-start justify-start p-8 relative">
        <div className="absolute top-15 left-18 p-4 bg-blue-100 text-blue-800 font-bold text-lg rounded-md shadow-md">
          PRODUCT BACKLOG
        </div>

        <div className="flex items-center justify-between w-full mt-20 mb-4">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-300"
                onClick={() => toggleDropdown('priority')}
              >
                Priority
              </button>
              {activeDropdown === 'priority' && (
                <div className="absolute mt-2 min-w-max bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 whitespace-nowrap"
                    onClick={() => handlePrioritySort("low-to-high")}
                  >
                    Low to High
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => handlePrioritySort("high-to-low")}
                  >
                    High to Low
                  </button>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-300"
                onClick={() => toggleDropdown('date')}
              >
                Date
              </button>
              {activeDropdown === 'date' && (
                <div className="absolute mt-2 min-w-max bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 whitespace-nowrap"
                    onClick={() => handleDateSort("recent-to-past")}
                  >
                    Latest to Oldest
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => handleDateSort("old-to-latest")}
                  >
                    Oldest to Latest
                  </button>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-300"
                onClick={() => toggleDropdown('tags')}
              >
                Tags
              </button>
              {activeDropdown === 'tags' && (
                <div className="absolute mt-2 min-w-max bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {availableTags.map((tag, index) => (
                    <label key={index} className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 whitespace-nowrap">
                      <input
                        type="checkbox"
                        value={tag}
                        checked={filterTags.includes(tag)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilterTags([...filterTags, tag]);
                          } else {
                            setFilterTags(filterTags.filter(t => t !== tag));
                          }
                        }}
                      />
                      <span>{tag}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="space-x-4">
            <button
              className={`px-4 py-2 ${isInvisible ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'} font-semibold rounded-md shadow-md hover:bg-red-400`}
              onClick={() => SetIsInvisible(!isInvisible)}
            >
              Delete Task
            </button>
            <button className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-400" onClick={() => { setCreateOpen(true) }}>
              Create Task
            </button>
          </div>
        </div>

        <div className="w-full flex items-center justify-center font-mono text-sm mt-4">
          <table className="min-w-full bg-white bg-opacity-40 border border-gray-500 z-0">
            <thead>
              <tr>
                <th className="py-4 px-4 border-b border-gray-500 text-left">{isLoading ? "Loading Tasks..." : "Tasks"}</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && sortedAndFilteredTasks.map((task: TaskData, i: number) => (
                <tr key={i} className="relative hover:bg-gray-100" onClick={() => { openTask(task) }}>
                  <td className="relative py-8 px-8 border-b border-gray-500 text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-lg font-bold">{task.taskName}</div>
                        <div className="text-sm text-gray-600">Assigned to: {task.assignedTo ? task.assignedTo : "NONE"}</div>
                        {task.tags && (
                          <div className="flex space-x-2 mt-2">
                            {task.tags.map((tag: string, index: number) => (
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
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 text-sm font-semibold rounded-md bg-red-100 text-gray-800">{task.storyPoint ? task.storyPoint : "1"}</span>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-md ${
                          task.status === 'Not Started'
                            ? 'bg-blue-200 text-blue-800'
                            : task.status === 'In Progress'
                              ? 'bg-yellow-200 text-yellow-800'
                              : 'bg-green-200 text-green-800'
                        }`}>
                          {task.status}
                        </span>
                        {/* Edit History Button */}
                        {/* <button
                          className="px-3 py-1 text-sm font-semibold rounded-md bg-gray-200 text-black hover:bg-gray-300"
                          onClick={() => { setHistoryOpen(true); setCurrentTask(task); }}
                        >
                          Task Edit History
                        </button> */}
                        <button className={isInvisible ? '' : 'invisible'}>
                          <AiOutlineDelete size={20} onClick={() => { setIsOpen(true); setCurrentTask(task); }} />
                        </button>
                        <MiniPopUp isOpen={isOpen} setIsOpen={setIsOpen}>
                          <ProceedDelete
                            taskToDelete={currentTask}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            deleteTask={runDeleteTask}
                          />
                        </MiniPopUp>
                      </div>
                      <div className={`absolute top-0 right-0 w-0 h-0 border-t-[40px] border-l-[40px] ${
                        task.priority?.toLowerCase() === 'urgent'
                          ? 'border-t-red-500'
                          : task.priority?.toLowerCase() === 'high'
                            ? 'border-t-orange-500'
                            : task.priority?.toLowerCase() === 'medium'
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
      <div className="z-50">
        <PopUp isOpen={taskOpen} setIsOpen={setTaskOpen}>
          {currentTask && <IndividualTaskInfo taskData={currentTask} setEditOpen={setEditOpen} setTaskOpen={setTaskOpen} />}
        </PopUp>
        <PopUp isOpen={createOpen} setIsOpen={setCreateOpen}>
          <AddTaskPage setIsOpen={setCreateOpen} />
        </PopUp>
        <PopUp isOpen={editOpen} setIsOpen={setEditOpen}>
          {currentTask && <EditTask taskData={currentTask} setEditOpen={setEditOpen} />}
        </PopUp>
        {/* <PopUp isOpen={historyOpen} setIsOpen={setHistoryOpen}>
          {currentTask && <TaskEditHistory taskEditHistory={currentTask.taskEditHistory || []} />}
        </PopUp> */}
      </div>
    </>
  );
};

export default BacklogCard;
