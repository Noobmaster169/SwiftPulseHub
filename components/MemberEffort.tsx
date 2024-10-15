// import React, { useState, useEffect } from "react";
// import { memberData } from "@/utils/interface";
// import PopUp from "./PopUp";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";
// import { 
//   format, 
//   addDays, 
//   subDays, 
//   startOfWeek, 
//   endOfWeek, 
//   isSameDay 
// } from "date-fns";
// import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';

// type MemberEffortProps = {
//   isOpen: boolean;
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   member: memberData | null;
// };

// type ValuePiece = Date | null;
// type Value = ValuePiece | [ValuePiece, ValuePiece];

// const MemberEffort: React.FC<MemberEffortProps> = ({
//   isOpen,
//   setIsOpen,
//   member,
// }) => {
//   const [startDate, setStartDate] = useState<Date>(startOfWeek(new Date()));
//   const [endDate, setEndDate] = useState<Date>(endOfWeek(new Date()));
//   const [showStartCalendar, setShowStartCalendar] = useState(false);
//   const [showEndCalendar, setShowEndCalendar] = useState(false);
//   const [workingHours, setWorkingHours] = useState(member?.workingHours || []);

//   useEffect(() => {
//     setWorkingHours(member?.workingHours || []);
//   }, [member]);

//   if (!member) return null;

//   const filteredData =
//     workingHours?.filter(
//       (entry) =>
//         new Date(entry.date) >= startDate && new Date(entry.date) <= endDate
//     ) || [];

//   const allDates = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

//   const chartData = allDates.map(date => {
//     const matchingEntry = filteredData.find(entry => isSameDay(new Date(entry.date), date));
//     return {
//       date: format(date, "EEE"),
//       hours: matchingEntry ? matchingEntry.hours : 0
//     };
//   });

//   const totalHours = filteredData.reduce((sum, entry) => sum + entry.hours, 0);
//   const averageHoursPerDay = totalHours / 7;
//   const hours = Math.floor(averageHoursPerDay);
//   const minutes = Math.round((averageHoursPerDay - hours) * 60);

//   const handleStartDateChange = (value: Date) => {
//     const newStartDate = startOfWeek(value);
//     setStartDate(newStartDate);
//     setEndDate(addDays(newStartDate, 6));
//     setShowStartCalendar(false);
//   };

//   const handleEndDateChange = (value: Date) => {
//     if (value < startDate) {
//       alert("End date cannot be before start date");
//       return;
//     }
//     const newEndDate = endOfWeek(value);
//     setEndDate(newEndDate);
//     setStartDate(startOfWeek(newEndDate));
//     setShowEndCalendar(false);
//   };

//   const handlePreviousWeek = () => {
//     const newStartDate = subDays(startDate, 7);
//     setStartDate(newStartDate);
//     setEndDate(addDays(newStartDate, 6));
//   };

//   const handleNextWeek = () => {
//     const newStartDate = addDays(startDate, 7);
//     setStartDate(newStartDate);
//     setEndDate(addDays(newStartDate, 6));
//   };

//   const resetDates = () => {
//     const currentStartDate = startOfWeek(new Date());
//     const currentEndDate = endOfWeek(new Date());
//     setStartDate(currentStartDate);
//     setEndDate(addDays(currentStartDate, 6));
//   }

//   return (
//     <PopUp isOpen={isOpen} setIsOpen={setIsOpen}>
//       <div className="p-2 w-full">
//         <h2 className="text-xl font-bold mb-2">{member.name}'s Effort</h2>
//         <div className="flex justify-between mb-2">
//           <div className="space-x-2">
//             <button
//               onClick={() => setShowStartCalendar(!showStartCalendar)}
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Start: {format(startDate, "MMM d, yyyy")}
//             </button>
//             <button
//               onClick={() => setShowEndCalendar(!showEndCalendar)}
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               End: {format(endDate, "MMM d, yyyy")}
//             </button>
//           </div>
//           <div>
//             {hours} hours {minutes} minutes per day
//           </div>
//         </div>
        
//         <div className="flex justify-between mb-4">
//           <button
//             onClick={handlePreviousWeek}
//             className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
//           >
//             Previous Week
//           </button>
//           <button
//             onClick={handleNextWeek}
//             className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
//           >
//             Next Week
//           </button>
//           <button
//             onClick={resetDates}
//             className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
//           >
//             Reset Dates
//           </button>
//         </div>
        
//         {showStartCalendar && (
//           <Calendar
//             value={startDate}
//             onChange={handleStartDateChange}
//           />
//         )}

//         {showEndCalendar && (
//           <Calendar
//             value={endDate}
//             onChange={handleEndDateChange}
//           />
//         )}
//         <BarChart width={660} height={440} data={chartData.length > 0 ? chartData : Array(7).fill({ date: '', hours: 0 })}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="hours" fill="#8884d8" minPointSize={3} />
//         </BarChart>
//       </div>
//     </PopUp>
//   );
// };

// export default MemberEffort;

import React, { useState, useEffect } from "react";
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
import { format, addDays, subDays, startOfWeek, endOfWeek, isSameDay } from "date-fns";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

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
  const [startDate, setStartDate] = useState<Date>(startOfWeek(new Date()));
  const [endDate, setEndDate] = useState<Date>(endOfWeek(new Date()));
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [workingHours, setWorkingHours] = useState(member?.workingHours || []);

  useEffect(() => {
    setWorkingHours(member?.workingHours || []);
  }, [member]);

  if (!member) return null;

  const filteredData =
    workingHours?.filter(
      (entry) =>
        new Date(entry.date) >= startDate && new Date(entry.date) <= endDate
    ) || [];

  const allDates = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const chartData = allDates.map((date) => {
    const matchingEntry = filteredData.find((entry) => isSameDay(new Date(entry.date), date));
    return {
      date: format(date, "EEE"),
      hours: matchingEntry ? matchingEntry.hours : 0,
    };
  });

  const totalHours = filteredData.reduce((sum, entry) => sum + entry.hours, 0);
  const averageHoursPerDay = totalHours / 7;
  const hours = Math.floor(averageHoursPerDay);
  const minutes = Math.round((averageHoursPerDay - hours) * 60);

  const handleStartDateChange = (value: Date) => {
    if (value instanceof Date) {
      const newStartDate = startOfWeek(value);
      setStartDate(newStartDate);
      setEndDate(addDays(newStartDate, 6));
      setShowStartCalendar(false);
    }
  };

  const handleEndDateChange = (value: Date) => {
    if (value instanceof Date) {
      if (value < startDate) {
        alert("End date cannot be before start date");
        return;
      }
      const newEndDate = endOfWeek(value);
      setEndDate(newEndDate);
      setStartDate(startOfWeek(newEndDate));
      setShowEndCalendar(false);
    }
  };

  const handlePreviousWeek = () => {
    const newStartDate = subDays(startDate, 7);
    setStartDate(newStartDate);
    setEndDate(addDays(newStartDate, 6));
  };

  const handleNextWeek = () => {
    const newStartDate = addDays(startDate, 7);
    setStartDate(newStartDate);
    setEndDate(addDays(newStartDate, 6));
  };

  const resetDates = () => {
    const currentStartDate = startOfWeek(new Date());
    const currentEndDate = endOfWeek(new Date());
    setStartDate(currentStartDate);
    setEndDate(addDays(currentStartDate, 6));
  };

  return (
    <PopUp isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="p-2 w-full">
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
            Previous Week
          </button>
          <button
            onClick={handleNextWeek}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Next Week
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
        />
        )}
        <BarChart width={660} height={440} data={chartData.length > 0 ? chartData : Array(7).fill({ date: '', hours: 0 })}>
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
