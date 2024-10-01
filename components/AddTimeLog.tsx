import React, { useState } from "react";
import { TaskData } from "@/utils/interface";
import { updateTask } from "@/utils/database";

interface AddTimeLogProps {
  taskData: TaskData;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTimeLog: React.FC<AddTimeLogProps> = ({ taskData, setIsOpen }) => {
  const [timeLogged, setTimeLogged] = useState<number>(0);
  const [member, setMember] = useState<string>("");

  const handleAddTimeLog = async () => {
    if (timeLogged > 0 && member) {
      const updatedTask = {
        ...taskData,
        timeLogged: (taskData.timeLogged || 0) + timeLogged,
        assignedTo: member,
      };
      await updateTask(updatedTask);
      setIsOpen(false);
    } else {
      alert("Please enter valid time and member.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Add Time Log</h2>
      <div className="mb-4">
        <label htmlFor="member" className="block mb-1">
          Member
        </label>
        <input
          type="text"
          id="member"
          value={member}
          onChange={(e) => setMember(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="timeLogged" className="block mb-1">
          Time Logged (hours)
        </label>
        <input
          type="number"
          id="timeLogged"
          value={timeLogged}
          onChange={(e) => setTimeLogged(parseFloat(e.target.value))}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleAddTimeLog}
          className="bg-blue-500 text-white rounded px-4 py-2 mr-2"
        >
          Add
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="border border-gray-300 rounded px-4 py-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddTimeLog;