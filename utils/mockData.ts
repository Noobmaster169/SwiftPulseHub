import { SprintData, TaskData } from "./interface";

export const mockSprintData: SprintData = {
  _id: "1",
  sprintName: "Sprint 1",
  startDate: new Date("2024-10-01"),
  endDate: new Date("2024-10-14"),
  status: "active",
  tasks: ["1", "2", "3", "4"],
};

export const mockTaskData: TaskData[] = [
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
