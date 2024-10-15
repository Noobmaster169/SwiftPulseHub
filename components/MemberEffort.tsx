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
  TooltipProps,
  ReferenceLine,
} from "recharts";
import { 
  format, 
  addDays, 
  subDays, 
  startOfDay, 
  endOfDay, 
  isSameDay, 
  isWithinInterval, 
  differenceInDays, 
  isBefore 
} from "date-fns";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

type MemberEffortProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  member: memberData | null;
};

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const MemberEffort: React.FC<MemberEffortProps> = ({
  isOpen,
  setIsOpen,
  member,
}) => {
  const [startDate, setStartDate] = useState<Date>(startOfDay(new Date()));
  const [endDate, setEndDate] = useState<Date>(addDays(startDate, 6));
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  if (!member) return null;

  const filteredData =
    member.workingHours?.filter(
      (entry) =>
        new Date(entry.date) >= startOfDay(startDate) && new Date(entry.date) <= endOfDay(endDate)
    ) || [];

  const dayCount = differenceInDays(endDate, startDate) + 1;
  const allDates = Array.from({ length: dayCount }, (_, i) => addDays(startDate, i));

  const chartData = allDates.map(date => {
    const matchingEntry = filteredData.find(entry => isSameDay(new Date(entry.date), date));
    return {
      date: date,
      dayOfWeek: format(date, "EEE"),
      fullDate: format(date, "MMM d, yyyy"),
      hours: matchingEntry ? matchingEntry.hours : 0
    };
  });

  const totalHours = filteredData.reduce((sum, entry) => sum + entry.hours, 0);
  const averageHoursPerDay = totalHours / dayCount;
  const hours = Math.floor(averageHoursPerDay);
  const minutes = Math.round((averageHoursPerDay - hours) * 60);

  const handleStartDateChange = (value: Value) => {
    if (value instanceof Date) {
      const newStartDate = startOfDay(value);
      setStartDate(newStartDate);
      if (isBefore(endDate, newStartDate) || differenceInDays(endDate, newStartDate) > 6) {
        setEndDate(addDays(newStartDate, 6));
      }
      setShowStartCalendar(false);
    }
  };

  const handleEndDateChange = (value: Value) => {
    if (value instanceof Date) {
      const newEndDate = endOfWeek(value);
      setEndDate(newEndDate);
      setStartDate(startOfWeek(newEndDate));
      setShowEndCalendar(false);
    }
  };

  const handlePreviousWeek = () => {
    const newStartDate = subDays(startDate, dayCount);
    setStartDate(newStartDate);
    setEndDate(subDays(endDate, dayCount));
  };

  const handleNextWeek = () => {
    const newStartDate = addDays(startDate, dayCount);
    setStartDate(newStartDate);
    setEndDate(addDays(endDate, dayCount));
  };

  const tileDisabled = ({ date, view }: { date: Date; view: string }) =>
    view === 'month' && !isWithinInterval(date, { start: startDate, end: addDays(startDate, 6) });

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '5px', border: '1px solid #ccc' }}>
          <p className="label">{`${payload[0].payload.fullDate}`}</p>
          <p className="intro">{`Hours: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const resetDates = () => {
    const currentStartDate = startOfWeek(new Date());
    const currentEndDate = endOfWeek(new Date());
    setStartDate(currentStartDate);
    setEndDate(currentEndDate);
  }

  return (
    <PopUp isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="p-2">
        <h2 className="text-xl font-bold mb-2">{member.name}'s Effort</h2>
        <div className="flex justify-between mb-2">
          <div className="space-x-2">
            <button
              onClick={() => setShowStartCalendar(!showStartCalendar)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Start: {format(startDate, "MMM d, yyyy")}
            </button>
            <button
              onClick={() => setShowEndCalendar(!showEndCalendar)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              End: {format(endDate, "MMM d, yyyy")}
            </button>
          </div>
          <div>
            {hours} hours {minutes} minutes per day
          </div>
        </div>
        
        <div className="flex justify-between mb-4">
          <button
            onClick={handlePreviousWeek}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Previous Period
          </button>
          <button
            onClick={handleNextWeek}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Next Period
          </button>
          <button
            onClick={resetDates}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Reset Dates
          </button>
        </div>
        
        {showStartCalendar && (
          <Calendar
            value={startDate}
            onChange={handleStartDateChange}
          />
        )}

        {showEndCalendar && (
          <Calendar
            value={endDate}
            onChange={handleEndDateChange}
            tileDisabled={tileDisabled}
          />
        )}

        <BarChart width={660} height={440} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="hours" fill="#8884d8" minPointSize={3} />
        </BarChart>
      </div>
    </PopUp>
  );
};

export default MemberEffort;