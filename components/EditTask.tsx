import { updateTask } from "@/utils/database";
import { TaskData } from "@/utils/interface";
import { useState } from "react";

interface EditTaskProps {
  taskData: TaskData;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditTask = ({ taskData, setEditOpen }: EditTaskProps) => {
  const handleSave = async () => {
    console.log("Saving Tasks");
    console.log(updatedTask);
    await updateTask(updatedTask);
    setEditOpen(false);
  };

  const handleCancel = () => {
    setEditOpen(false);
  };

  const [updatedTask, setUpdatedTask] = useState<TaskData>(taskData);

  const handleChange = (
    field: keyof TaskData,
    value: string | string[] | number
  ) => {
    setUpdatedTask((prevTask) => ({ ...prevTask, [field]: value }));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
      <div className="mb-4">
        <label htmlFor="taskName" className="block mb-1">
          Task Name
        </label>
        <input
          type="text"
          id="taskName"
          value={updatedTask.taskName}
          onChange={(e) => handleChange("taskName", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={updatedTask.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="assignedTo" className="block mb-1">
          Assigned To
        </label>
        <input
          type="text"
          id="assignedTo"
          value={updatedTask.assignedTo}
          onChange={(e) => handleChange("assignedTo", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block mb-1">
          Status
        </label>
        <select
          id="status"
          value={updatedTask.status}
          onChange={(e) => {} /*handleChange("status", e.target.value)*/}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="not started">Not Started</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="storyPoint" className="block mb-1">
          Story Point
        </label>
        <input
          type="number"
          id="storyPoint"
          value={updatedTask.storyPoint}
          onChange={(e) => handleChange("storyPoint", Number(e.target.value))}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="type" className="block mb-1">
          Type
        </label>
        <select
          id="type"
          value={updatedTask.type}
          onChange={(e) => handleChange("type", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="story">Story</option>
          <option value="bug">Bug</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="projectStage" className="block mb-1">
          Project Stage
        </label>
        <select
          id="projectStage"
          value={updatedTask.projectStage}
          onChange={(e) => handleChange("projectStage", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="planning">Planning</option>
          <option value="implementation">Implementation</option>
          <option value="testing">Testing</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="priority" className="block mb-1">
          Priority
        </label>
        <select
          id="priority"
          value={updatedTask.priority}
          onChange={(e) => handleChange("priority", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="tags" className="block mb-1">
          Tags
        </label>
        <input
          type="text"
          id="tags"
          value={updatedTask.tags?.join(", ")}
          onChange={(e) => handleChange("tags", e.target.value.split(", "))}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white rounded px-4 py-2 mr-2"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="border border-gray-300 rounded px-4 py-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditTask;
