import React, { useState } from "react";
import { memberData } from "@/utils/interface";
import { format, subDays } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type TeamInsightsProps = {
  members: memberData[];
};

const TeamInsights: React.FC<TeamInsightsProps> = ({ members }) => {
  const [startDate, setStartDate] = useState(subDays(new Date(), 7));
  const [endDate, setEndDate] = useState(new Date());

  const calculateInsights = (member: memberData) => {
    const filteredData =
      member.workingHours?.filter(
        (entry) =>
          new Date(entry.date) >= startDate && new Date(entry.date) <= endDate
      ) || [];

    const totalHours = filteredData.reduce(
      (sum, entry) => sum + entry.hours,
      0
    );
    const averageHoursPerDay = totalHours / filteredData.length;

    return {
      totalHours,
      averageHoursPerDay,
    };
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Team Insights</h2>
      <div className="mb-4">
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className="px-2 py-1 border border-gray-300 rounded"
        />
        <span className="mx-2">to</span>
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className="px-2 py-1 border border-gray-300 rounded"
        />
      </div>
      <table className="min-w-full bg-white bg-opacity-40 border border-gray-500">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-500 text-left">
              Member
            </th>
            <th className="py-2 px-4 border-b border-gray-500 text-left">
              Total Hours
            </th>
            <th className="py-2 px-4 border-b border-gray-500 text-left">
              Average Hours/Day
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, i) => {
            if(!member){
              return "";
            }
            const { totalHours, averageHoursPerDay } =
              calculateInsights(member);
            return (
              <tr key={i}>
                <td className="py-2 px-4 border-b border-gray-500">
                  {member.name}
                </td>
                <td className="py-2 px-4 border-b border-gray-500">
                  {totalHours.toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b border-gray-500">
                  {averageHoursPerDay.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TeamInsights;
