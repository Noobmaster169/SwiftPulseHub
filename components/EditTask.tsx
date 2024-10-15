import { updateTask } from "@/utils/database";
import { TaskEditHistoryEntry, TaskData, UserData } from "@/utils/interface";
import { useState, useEffect } from "react";
import { fetchUsers } from "@/utils/users";

interface EditTaskProps {
  taskData: TaskData;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditTask = ({ taskData, setEditOpen }: EditTaskProps) => {
  const [updatedTask, setUpdatedTask] = useState<TaskData>(taskData);
  const [members, setMembers] = useState<string[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<string[]>(members);
  const [showMemberDropdown, setShowMemberDropdown] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [availableTags, setAvailableTags] = useState<string[]>([
    "UI",
    "API",
    "Backend",
    "Frontend",
    "Bug",
    "Enhancement",
  ]);
  const [filteredTags, setFilteredTags] = useState<string[]>(availableTags);
  const [showTagDropdown, setShowTagDropdown] = useState(false);

  const getUsersData = async ()=>{
    const users = await fetchUsers();
    const names:string[] = [];
    users.forEach((user:UserData)=>{
      if(user){
        if(user.name && user.name !== "admin"){
          names.push(user.name);
        }
      } 
    });
    setMembers(names);
  }
  useEffect(()=>{
    getUsersData();
  }, [])

  const handleSave = async () => {
    const historyEntries: TaskEditHistoryEntry[] = [];
  
    if (taskData.status !== updatedTask.status) {
      historyEntries.push({
        date: new Date().toISOString(),
        modifiedBy: 'User Name', 
        type: 'status',
        details: `Status changed from ${taskData.status} to ${updatedTask.status}`,
      });
    }
  
    if (taskData.assignedTo !== updatedTask.assignedTo) {
      historyEntries.push({
        date: new Date().toISOString(),
        modifiedBy: 'User Name', 
        type: 'reassignment',
        details: `Assigned to changed from ${taskData.assignedTo} to ${updatedTask.assignedTo}`,
      });
    }
  
    if (taskData.description !== updatedTask.description) {
      historyEntries.push({
        date: new Date().toISOString(),
        modifiedBy: 'User Name', 
        type: 'description',
        details: `Description updated from "${taskData.description}" to "${updatedTask.description}".`,
      });
    }
  
    const updatedTaskEditHistory = [...(updatedTask.taskEditHistory || []), ...historyEntries];
    const taskToUpdate = { ...updatedTask, taskEditHistory: updatedTaskEditHistory };
  
    await updateTask(taskToUpdate);
    setEditOpen(false);
  };
  

  const handleCancel = () => {
    setEditOpen(false);
  };

  const handleAssignedToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUpdatedTask((prevTask) => ({ ...prevTask, assignedTo: value }));
    setFilteredMembers(
      members.filter((member) =>
        member.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleMemberSelect = (member: string) => {
    setUpdatedTask((prevTask) => ({ ...prevTask, assignedTo: member }));
    setShowMemberDropdown(false);
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagInput(value);
    setFilteredTags(
      availableTags.filter((tag) =>
        tag.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleTagSelect = (tag: string) => {
    if (!(updatedTask.tags ?? []).includes(tag)) {
      setUpdatedTask((prevTask) => ({
        ...prevTask,
        tags: [...(prevTask.tags ?? []), tag],
      }));
      setTagInput("");
      setFilteredTags(availableTags);
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
        <select
            value={updatedTask.assignedTo}
            onChange={(e) => handleChange("assignedTo", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
        >
          {members.map((member) => <option value={member}>{member}</option>)}
        </select>
        {/*<div className="member-input">
          <input
            type="text"
            id="assignedTo"
            value={updatedTask.assignedTo}
            onChange={handleAssignedToChange}
            onFocus={() => setShowMemberDropdown(true)}
            onBlur={() => setShowMemberDropdown(false)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {showMemberDropdown && (
            <ul className="member-list">
              {filteredMembers.map((member) => (
                <li
                  key={member}
                  onClick={() => handleMemberSelect(member)}
                  className="member-item"
                >
                  {member}
                </li>
              ))}
            </ul>
          )}
        </div>*/}
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
          min={0}
          max={10}
          onChange={(e) =>
            handleChange(
              "storyPoint",
              Math.min(10, Math.max(0, Number(e.target.value)))
            )
          }
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
          <option value="bugs">Bugs</option>
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
        <div className="relative">

          
          <div className="tags-input flex items-center space-x-2 ">
              <input
                type="text"
                value={tagInput}
                onChange={handleTagInputChange}
                onFocus={() => setShowTagDropdown(true)}
                onBlur={() => setShowTagDropdown(false)}
                className="flex-grow p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => handleTagSelect(tagInput)}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add Tag
              </button>
            {showTagDropdown && (
              <ul className="tag-list absolute left-0 w-full bg-white border border-gray-300 rounded mt-30">
                {filteredTags.map((tag) => (
                  <li
                    key={tag}
                    onMouseDown={() => handleTagSelect(tag)}
                    className="tag-item p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="tags-list">
            {(updatedTask.tags ?? []).map((tag) => (
              <span key={tag} className="tag">
                {tag}{" "}
                <button type="button" onMouseDown={() => handleRemoveTag(tag)}>
                  &times;
                </button>
              </span>
            ))}
          </div>
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
