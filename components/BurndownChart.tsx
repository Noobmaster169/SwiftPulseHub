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
import { format, eachDayOfInterval } from "date-fns";
import { fetchTask } from "@/utils/database";

interface BurndownChartProps {
  sprintData: SprintData;
  tasks: TaskData[];
}

const BurndownChart: React.FC<BurndownChartProps> = ({ sprintData, tasks }) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartView, setChartView] = useState<"storyPoints" | "tasks">("tasks");
  const [taskData, setTaskData] = useState<TaskData[]>([]);

  const mockSprintData: SprintData = {
    _id: "1",
    sprintName: "Sprint 1",
    startDate: new Date("2024-10-01"),
    endDate: new Date("2024-10-14"),
    status: "active",
    tasks: ["1", "2", "3", "4"],
  };

  const mockTaskData: TaskData[] = [
    {
      _id: "1",
      taskName: "Task 1",
      description: "Implement user authentication",
      assignedTo: "Jonathan",
      storyPoint: "5",
      status: "completed",
      completedAt: "2024-10-03",
    },
    {
      _id: "2",
      taskName: "Task 2",
      description: "Design user interface",
      assignedTo: "Shanwu Zhang",
      storyPoint: "3",
      status: "completed",
      completedAt: "2024-10-05",
    },
    {
      _id: "3",
      taskName: "Task 3",
      description: "Implement search functionality",
      assignedTo: "Mario Taning",
      storyPoint: "8",
      status: "in-progress",
      completedAt: "2024-10-07",
    },
    {
      _id: "4",
      taskName: "Task 4",
      description: "Write unit tests",
      assignedTo: "Tadiwa Vambe",
      storyPoint: "2",
      status: "todo",
      completedAt: "2024-10-09",
    },
  ];

  const compileData = async () => {
    const startDate = new Date(sprintData.startDate);
    const endDate = new Date(sprintData.endDate);
    const today = new Date();
    const stopDate = today < endDate && today > startDate ? today : endDate;

    const database = await fetchTask();
    const taskData = database.filter((task: TaskData) =>
      sprintData.tasks.includes(task._id || "")
    ); // Fix linter error
    setTaskData(taskData);

    //const endDate = new Date(sprintData.endDate);
    const totalDays = eachDayOfInterval({ start: startDate, end: endDate });
    const totalStoryPoints = taskData.reduce(
      (sum: number, task: TaskData) => sum + parseInt(task.storyPoint || "0"),
      0
    );
    const totalTasks = taskData.length;

    taskData.forEach((task: TaskData) => {
      console.log(task);
    });

    const initialData = totalDays.map((date, index) => {
      const completedTasks = taskData.filter((task: TaskData) => {
        if (!task.completedAt) return false;
        const completedDate = new Date(task.completedAt);
        const dayLimit = new Date(date.getTime() + 24 * 60 * 60 * 1000);
        const isCompleted = completedDate <= dayLimit;
        console.log(
          "Task Finished At:",
          completedDate,
          "But Date is:",
          date,
          "Is Completed:",
          isCompleted
        );
        return isCompleted;
      }).length;
      const completedStoryPoints = taskData
        .filter(
          (task: TaskData) =>
            task.completedAt && new Date(task.completedAt) <= date
        )
        .reduce(
          (sum: number, task: TaskData) =>
            sum + parseInt(task.storyPoint || "0"),
          0
        );

      if (date > stopDate) {
        return {
          date: format(date, "MM/dd"),
          idealTasks:
            totalTasks - (index * totalTasks) / (totalDays.length - 1),
          idealPoints:
            totalStoryPoints -
            (index * totalStoryPoints) / (totalDays.length - 1),
        };
      }

      return {
        date: format(date, "MM/dd"),
        remainingPoints: totalStoryPoints - completedStoryPoints,
        remainingTasks: totalTasks - completedTasks,
        completedTasks,
        completedStoryPoints,
        idealPoints:
          totalStoryPoints -
          (index * totalStoryPoints) / (totalDays.length - 1),
        idealTasks: totalTasks - (index * totalTasks) / (totalDays.length - 1),
      };
    });

    setChartData(initialData);
  };

  useEffect(() => {
    compileData();
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
        {/*<button
          className={`px-4 py-2 rounded ${
            chartView === "storyPoints"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setChartView("storyPoints")}
        >
          Story Points
        </button>*/}
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
        {/*<Line
          type="monotone"
          dataKey={
            chartView === "storyPoints"
              ? "completedStoryPoints"
              : "completedTasks"
          }
          stroke="#ff7300"
        />*/}
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
