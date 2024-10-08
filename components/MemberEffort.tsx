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
  const [startDate, setStartDate] = useState(subDays(new Date(), 7));
  const [endDate, setEndDate] = useState(new Date());

  if (!member) return null;

  const filteredData =
    member.workingHours?.filter(
      (entry) =>
        new Date(entry.date) >= startDate && new Date(entry.date) <= endDate
    ) || [];

  const totalHours = filteredData.reduce((sum, entry) => sum + entry.hours, 0);

  return (
    <PopUp isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">{member.name}'s Effort</h2>
        <div className="flex justify-between mb-4">
          <div>
            {format(startDate, "MMM d")} - {format(endDate, "MMM d")}
          </div>
          <div>{totalHours / filteredData.length} hours per day</div>
        </div>
        <BarChart width={400} height={300} data={filteredData}>
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
