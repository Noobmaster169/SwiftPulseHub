import { SprintData } from "@/utils/interface";
import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

interface IndividualSprintInfoProps {
    sprintData: SprintData;
    setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setTaskOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }
const SprintPage = ({
    sprintData,
    setEditOpen,
    setTaskOpen,
}: IndividualSprintInfoProps) => {
    // const [isEditing, setIsEditing] = useState(false);
    // const [updatedTaskData, setUpdatedTaskData] = useState(sprintData);
    return (
    <main className="flex flex-col items-center min-h-screen p-8">
        {/* Header Section */}
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">{sprintData.sprintName}</h1>
            <button className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 hover:ring hover:ring-gray-400">
            Force Start
            </button>
        </div>
        <table className="w-50">
            <tbody>
            <tr>
                <td className="text-sm text-black">
                    <strong>Start from:</strong>
                </td>
                <td className="text-sm text-black">
                    {sprintData.startDate.toLocaleDateString()}
                </td>
            </tr>
            <tr>
                <td className="text-sm text-black">
                    <strong>Ends by:</strong>
                </td>
                <td className="text-sm text-black">
                    {sprintData.endDate.toLocaleDateString()}
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

        {/* Sprint and Product Backlog */}
        <div className="w-full max-w-4xl grid grid-cols-2 gap-8">
        {/* Product Backlog */}
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Product Backlog</h2>
            <ul className="space-y-2">
            {Array(4).fill("Build Website Task Component").map((task, index) => (
                <li
                key={index}
                className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm"
                >
                {task}
                <span className="text-blue-500 ml-2"><AiOutlineArrowRight /></span> {/* Right Arrow Icon */}
                </li>
            ))}
            </ul>
        </div>

        {/* Sprint Backlog */}
        <div className="bg-purple-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Sprint Backlog</h2>
            <ul className="space-y-2">
            {Array(4).fill("Build Website Task Component").map((task, index) => (
                <li
                key={index}
                className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm"
                >
                <span className="text-purple-500 mr-2"><AiOutlineArrowLeft /></span> {/* Left Arrow Icon */}
                {task}
                </li>
            ))}
            </ul>
        </div>
        </div>
    </main>
    );
    }

    export default SprintPage;