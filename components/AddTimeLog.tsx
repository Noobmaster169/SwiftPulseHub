import React, { useState } from "react";
import { TaskData } from "@/utils/interface";
import { updateTask } from "@/utils/database";
import { addDays, format, startOfWeek, endOfWeek } from 'date-fns';

const newDate = addDays(new Date(), 5);
const formattedDate = format(new Date(), 'yyyy-MM-dd');
const startDate = startOfWeek(new Date()); 
const endDate = endOfWeek(new Date());

interface AddTimeLogProps {
  taskData: TaskData;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTimeLog: React.FC<AddTimeLogProps> = ({ taskData, setIsOpen }) => {
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [member, setMember] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setHours(value);
    }
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || (/^\d+$/.test(value) && parseInt(value) <= 59)) {
      setMinutes(value);
    }
  };

  const handleIncrement = (setter: React.Dispatch<React.SetStateAction<string>>, max?: number) => {
    setter(prev => {
      const value = prev === "" ? 0 : parseInt(prev);
      const newValue = max ? Math.min(value + 1, max) : value + 1;
      return newValue.toString();
    });
  };

  const handleDecrement = (setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(prev => {
      const value = prev === "" ? 0 : parseInt(prev);
      const newValue = Math.max(value - 1, 0);
      return newValue.toString();
    });
  };

  const handleAddTimeLog = async () => {
    const hoursNum = hours === "" ? 0 : parseInt(hours);
    const minutesNum = minutes === "" ? 0 : parseInt(minutes);
    
    if ((hoursNum > 0 || minutesNum > 0) && member) {
      const timeLogged = hoursNum + minutesNum / 60;
      if (!taskData.timeLog) {
        taskData.timeLog = [];
      }
      const today = new Date();
      taskData.timeLog.push({
        timeLogged: parseFloat(timeLogged.toFixed(2)),
        date: today,
        member: member,
        message: message,
      });
      await updateTask(taskData);
      setIsOpen(false);
    } else {
      alert("Please enter valid time and member.");
    }
  };

  //     if (!taskData.timeLog) {
  //       taskData.timeLog = [];
  //     }
  //     const today = new Date();
  //     taskData.timeLog.push({
  //       timeLogged: parseFloat(timeLogged.toFixed(2)),
  //       date: today,
  //       member: member,
  //       message: message,
  //     });
  //     await updateTask(taskData);
  //     setIsOpen(false);
  //   } else {
  //     alert("Please enter valid time and member.");
  //   }
  // };

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
      <div className="mb-4 flex space-x-4">
        <div className="flex-1">
          <label htmlFor="hours" className="block mb-1">
            Hours
          </label>
          <div className="relative">
            <input
              type="text"
              id="hours"
              value={hours}
              onChange={handleHoursChange}
              placeholder="0"
              className="w-full border border-gray-300 rounded px-3 py-2 pr-8"
            />
            <div className="absolute inset-y-0 right-0 flex flex-col">
              <button onClick={() => handleIncrement(setHours)} className="h-1/2 px-2 text-xs">▲</button>
              <button onClick={() => handleDecrement(setHours)} className="h-1/2 px-2 text-xs">▼</button>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <label htmlFor="minutes" className="block mb-1">
            Minutes
          </label>
          <div className="relative">
            <input
              type="text"
              id="minutes"
              value={minutes}
              onChange={handleMinutesChange}
              placeholder="0"
              className="w-full border border-gray-300 rounded px-3 py-2 pr-8"
            />
            <div className="absolute inset-y-0 right-0 flex flex-col">
              <button onClick={() => handleIncrement(setMinutes, 59)} className="h-1/2 px-2 text-xs">▲</button>
              <button onClick={() => handleDecrement(setMinutes)} className="h-1/2 px-2 text-xs">▼</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block mb-1">
          Log Message
        </label>
        <input
          type="text"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="flex justify-end">      
        <button
        onClick={handleAddTimeLog}
        className="bg-blue-500 text-white rounded px-4 py-2"
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

