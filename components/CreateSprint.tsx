"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addSprint } from "@/utils/database";
import { SprintData } from "@/utils/interface";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface CreateSprintProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateSprint = ({ setIsOpen }: CreateSprintProps) => {
  const router = useRouter();
  const [sprintName, setSprintName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [status, setStatus] = useState("Not Started");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: SprintData = {
      sprintName,
      startDate,
      endDate,
      status,
    };
    try {
      await addSprint(data);
      setIsOpen(false);
    } catch (e) {
      alert("Error creating sprint");
    }
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-semibold mb-4">Create Sprint</h1>
      <form onSubmit={handleSubmit} className="flex space-x-4">
        <div className="w-1/2">
          <div className="form-group">
            <label>Sprint name:</label>
            <input
              type="text"
              value={sprintName}
              onChange={(e) => setSprintName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Start Date:</label>
            <input
              type="date"
              value={startDate.toISOString().split("T")[0]}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              required
            />
          </div>

          <div className="form-group">
            <label>End Date:</label>
            <input
              type="date"
              value={endDate.toISOString().split("T")[0]}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              required
            />
          </div>

          <div className="form-group">
            <label>Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Not Started">Not Started</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create Sprint
            </button>
          </div>
        </div>

        <div className="w-1/2 flex items-center justify-center">
          <Calendar
            value={[startDate, endDate] as [Date, Date]}
            onChange={(value) => {
              const dates = value as [Date, Date];
              setStartDate(dates[0]);
              setEndDate(dates[1] || dates[0]);
            }}
            selectRange={true}
            tileClassName={({ date, view }) => {
              if (date >= startDate && date <= endDate && view === "month") {
                return "bg-purple-200";
              }
              if (
                (date.getTime() === startDate.getTime() ||
                  date.getTime() === endDate.getTime()) &&
                view === "month"
              ) {
                return "bg-purple-500 text-white rounded-full";
              }
            }}
          />
        </div>
      </form>

      <style jsx>{`
        .form-group {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
        }
        input,
        select {
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          padding: 8px 16px;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        :global(.react-calendar) {
          border-radius: 8px;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default CreateSprint;
