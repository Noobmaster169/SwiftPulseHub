import { SprintData } from "@/utils/interface";
import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import SprintTasks from "./SprintTasks";
import {fetchSprint, updateSprint} from '@/utils/sprint';

interface IndividualSprintInfoProps {
    sprintData: SprintData;
    setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setTaskOpen: React.Dispatch<React.SetStateAction<boolean>>;
    assignedTasks: string[];
    isUpdated: boolean;
    setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  }
const SprintPage = ({
    sprintData,
    setEditOpen,
    setTaskOpen,
    assignedTasks,
    isUpdated,
    setIsUpdated,
}: IndividualSprintInfoProps) => {
    // const [isEditing, setIsEditing] = useState(false);
    // const [updatedTaskData, setUpdatedTaskData] = useState(sprintData);
    const startDate = new Date(sprintData.startDate);
    const endDate = new Date(sprintData.endDate);
    const status = sprintData.status;

    const updateTasks = async (taskIds: string[]) => {
        const newData = {...sprintData, tasks: taskIds};
        console.log("Updated Sprint Data:", newData);
        await updateSprint(newData);
        setIsUpdated(!isUpdated);
        setTaskOpen(false);
    }

    return (
    <div className="w-full flex flex-col items-center p-8">
        {/* Header Section */}
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">{sprintData.sprintName}</h1>
            {status == "Not Started"? 
                <button className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 hover:ring hover:ring-gray-400">
                    Force Start
                </button>
                :
                <button className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 hover:ring hover:ring-gray-400">
                    Force End
                </button>
            }
        </div>
        <table className="w-50">
            <tbody>
            <tr>
                <td className="text-sm text-black">
                    <strong>Start from:</strong>
                </td>
                <td className="text-sm text-black">
                    {startDate.toLocaleDateString()}
                </td>
            </tr>
            <tr>
                <td className="text-sm text-black">
                    <strong>Ends by:</strong>
                </td>
                <td className="text-sm text-black">
                    {endDate.toLocaleDateString()}
                </td>
            </tr>
            <tr>
                <td className="text-sm text-black">
                    <strong>Status:</strong>
                </td>
                <td className="text-sm text-black">
                    {sprintData.status}
                </td>
            </tr>
            </tbody>
        </table>
        </div>
        {sprintData.status == "Not Started" ?
            <SprintTasks sprintData={sprintData} assignedTasks={assignedTasks} updateTasks={updateTasks}/>
            : 
            /** Kanban Board Component Here */
        }
    </div>
    );
    }

    export default SprintPage;