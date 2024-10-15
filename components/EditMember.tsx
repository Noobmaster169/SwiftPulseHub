import React, { useState } from 'react';
import { memberData , TaskData} from '../utils/interface';
import { AiOutlineDelete,AiOutlineEdit } from "react-icons/ai";
import DeleteMemberConfirmation from './DeleteMemberConfirm'; // Import the confirmation component
import MediumPopUp from './MediumPopUp';
import {fetchTask} from '@/utils/database';


interface EditMemberProps {
  members: memberData[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteMember: (member: memberData) => void;
  updateMember: (updatedMember: memberData) => void;
//   hasAssignedTasks: (member: memberData) => boolean;
}

const EditMember: React.FC<EditMemberProps> = ({ members, setIsOpen, deleteMember , updateMember}) => {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<memberData | null>(null);
  const [editMemberOpen, setEditMemberOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState<memberData | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [assignedTasks, setAssignedTasks] = useState<TaskData[]>([]);

  const handleDeleteClick = async (member: memberData) => {
    setMemberToDelete(member);
    setDeleteConfirmationOpen(true);
  };
 
  const handleEditClick = (member: memberData) => {
    setMemberToEdit(member);
    setEditedName(member.name);
    setEditedEmail(member.email);
    setEditMemberOpen(true);
  };

  const handleUpdate = () => {
    if (memberToEdit) {
      const updatedMember = { ...memberToEdit, name: editedName, email: editedEmail};
      updateMember(updatedMember);
      setEditMemberOpen(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="p-3 pt-6 w-full bg-blue-100 rounded-md mt-20">
      <h2 className="text-xl font-semibold mb-4">Edit Members</h2>
      {members.map((member) => (member?
        <div key={member.name} className="flex justify-between items-center mb-2 p-2 bg-white rounded shadow">
          <span>{member.name}</span>
          <div className="flex items-center space-x-1">
          <button onClick={() => handleDeleteClick(member)}>
              <AiOutlineDelete size={20} className="text-red-500 hover:text-red-700" />
          </button>
          <button onClick={() => handleEditClick(member)}>
              <AiOutlineEdit size={20} className="text-blue-500 hover:text-blue-700" />
          </button>
          </div>
        </div>: ""
      ))}

      {deleteConfirmationOpen && memberToDelete && (
        <DeleteMemberConfirmation
          member={memberToDelete}
          setIsOpen={setDeleteConfirmationOpen}
          deleteMember={deleteMember}
        />
      )}
    {/* edit popup*/}
    <MediumPopUp
        isOpen={editMemberOpen}
        setIsOpen={setEditMemberOpen}>
        {memberToEdit && (
          <div>
            <h2>Edit Member</h2>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              placeholder="Name"
              className="mb-2 p-2 border rounded"
            />
            <input
              type="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              placeholder="Email"
              className="mb-2 p-2 border rounded"
            />
            <button
              className="bg-green-500 text-white rounded px-4 py-2"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        )}
      </MediumPopUp>
       
    </div>
  );
};

export default EditMember;