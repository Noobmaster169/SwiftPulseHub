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
  const [tagInput, setTagInput] = useState("");
  const [availableTags, setAvailableTags] = useState<string[]>([
    "UI",
    "API",
    "Backend",
    "Frontend",
    "Bug",
    "Enhancement",
  ]);

  const handleAddTag = () => {
    if (tagInput && !(updatedTask.tags ?? []).includes(tagInput)) {
      const newTags = tagInput.split(",").map((tag) => tag.trim());
      setUpdatedTask((prevTask) => ({
        ...prevTask,
        tags: [...(prevTask.tags ?? []), ...newTags],
      }));
      setAvailableTags([...availableTags, ...newTags]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setUpdatedTask((prevTask) => ({
      ...prevTask,
      tags: (prevTask.tags ?? []).filter((t) => t !== tag),
    }));
  };

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
        <div className="tags-input">
          <input
            type="text"
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            list="tagOptions"
            onSelect={(e) => {
              const selectedTag = e.currentTarget.value;
              if (
                selectedTag &&
                !(updatedTask.tags ?? []).includes(selectedTag)
              ) {
                setUpdatedTask((prevTask) => ({
                  ...prevTask,
                  tags: [...(prevTask.tags ?? []), selectedTag],
                }));
                setTagInput("");
              }
            }}
          />
          <datalist id="tagOptions">
            {availableTags
              .filter(
                (tag) =>
                  tag.toLowerCase().includes(tagInput.toLowerCase()) &&
                  !(updatedTask.tags ?? []).includes(tag)
              )
              .map((tag) => (
                <option key={tag} value={tag} />
              ))}
          </datalist>
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <div className="tags-list">
          {(updatedTask.tags ?? []).map((tag) => (
            <span key={tag} className="tag">
              {tag}{" "}
              <button type="button" onClick={() => handleRemoveTag(tag)}>
                &times;
              </button>
            </span>
          ))}
        </div>
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
