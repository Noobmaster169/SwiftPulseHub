import React, { useState, useEffect } from "react";
import { SprintData, TaskData } from "@/utils/interface";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { format, eachDayOfInterval, addDays } from "date-fns";

interface BurndownChartProps {
  sprintData: SprintData;
  tasks: TaskData[];
}

const BurndownChart: React.FC<BurndownChartProps> = ({ sprintData, tasks }) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartView, setChartView] = useState<"storyPoints" | "tasks">(
    "storyPoints"
  );

  useEffect(() => {
    const startDate = new Date(sprintData.startDate);
    const endDate = new Date(sprintData.endDate);
    const totalDays = eachDayOfInterval({ start: startDate, end: endDate });

    const totalStoryPoints = tasks.reduce(
      (sum, task) => sum + parseInt(task.storyPoint || "0"),
      0
    );
    const totalTasks = tasks.length;

    const initialData = totalDays.map((date, index) => ({
      date: format(date, "MM/dd"),
      remainingPoints: totalStoryPoints,
      remainingTasks: totalTasks,
      completedTasks: 0,
      idealPoints:
        totalStoryPoints - (index * totalStoryPoints) / (totalDays.length - 1),
      idealTasks: totalTasks - (index * totalTasks) / (totalDays.length - 1),
    }));

    setChartData(initialData);
  }, [sprintData, tasks]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow">
          <p className="text-gray-600">{label}</p>
          <p>Completed Tasks: {payload[0].payload.completedTasks}</p>
          <p>Remaining Tasks: {payload[0].payload.remainingTasks}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Burndown Chart</h2>
      <div className="mb-4">
        <button
          className={`px-4 py-2 rounded ${
            chartView === "storyPoints"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setChartView("storyPoints")}
        >
          Story Points
        </button>
        <button
          className={`ml-2 px-4 py-2 rounded ${
            chartView === "tasks"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setChartView("tasks")}
        >
          Number of Tasks
        </button>
      </div>
      <LineChart width={600} height={400} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey={
            chartView === "storyPoints" ? "remainingPoints" : "remainingTasks"
          }
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey={chartView === "storyPoints" ? "idealPoints" : "idealTasks"}
          stroke="#82ca9d"
          strokeDasharray="5 5"
        />
      </LineChart>
    </div>
  );
};

export default BurndownChart;
