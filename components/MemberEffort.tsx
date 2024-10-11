import React, { useState } from "react";
import { memberData } from "@/utils/interface";
import PopUp from "./PopUp";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { format, subDays } from "date-fns";
import Calendar from "react-calendar";

type MemberEffortProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  member: memberData | null;
};

const MemberEffort: React.FC<MemberEffortProps> = ({
  isOpen,
  setIsOpen,
  member,
}) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  if (!member) return null;

  const filteredData =
    member.workingHours?.filter(
      (entry) =>
        new Date(entry.date) >= startDate && new Date(entry.date) <= endDate
    ) || [];

  const totalHours = filteredData.reduce((sum, entry) => sum + entry.hours, 0);
  const averageHoursPerDay = totalHours / filteredData.length;
  const hours = Math.floor(averageHoursPerDay);
  const minutes = Math.round((averageHoursPerDay - hours) * 60);

  const handleDateChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end || start); // if no end date is selected, set end as start
    setShowCalendar(false); // Close calendar after date is selected
  };

  return (
    <PopUp isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="p-2">
        <h2 className="text-xl font-bold mb-2">{member.name}'s Effort</h2>
        <div className="flex justify-between mb-2">
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
          >
            {format(startDate, "MMM d")} - {format(endDate, "MMM d")}
          </button>
          <div>
            {hours} hours {minutes} minutes per day
          </div>
        </div>
        
        {/* Calendar to select the date range */}
        {showCalendar && (
          <Calendar
            value={[startDate, endDate] as [Date, Date]}
            selectRange={true}
            onChange={handleDateChange}
            tileClassName={({ date }) =>
              date.getTime() === new Date().getTime() ? "bg-yellow-100" : ""
            }
          />
        )}

        <BarChart width={660} height={440} data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => format(new Date(date), "EEE")}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="hours" fill="#8884d8" />
        </BarChart>
      </div>
    </PopUp>
  );
};

export default MemberEffort;
