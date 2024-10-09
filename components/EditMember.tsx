import React, { useState } from 'react';
import { memberData } from '../utils/interface';
import { AiOutlineDelete } from "react-icons/ai";
import DeleteMemberConfirmation from './DeleteMemberConfirm'; // Import the confirmation component

interface EditMemberProps {
  members: memberData[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteMember: (member: memberData) => void;
}

const EditMember: React.FC<EditMemberProps> = ({ members, setIsOpen, deleteMember }) => {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<memberData | null>(null);

  const handleDeleteClick = (member: memberData) => {
    setMemberToDelete(member);
    setDeleteConfirmationOpen(true);
  };

  return (
    <div className="p-4 bg-blue-100 rounded-md">
      <h2 className="text-xl font-semibold mb-4">Edit Members</h2>
      {members.map((member) => (
        <div key={member.name} className="flex justify-between items-center mb-2 p-2 bg-white rounded shadow">
          <span>{member.name}</span>
          <button onClick={() => handleDeleteClick(member)}>
            <AiOutlineDelete size={20} className="text-red-500 hover:text-red-700" />
          </button>
        </div>
      ))}
      <button
        className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded"
        onClick={() => setIsOpen(false)}
      >
        Close
      </button>

      {deleteConfirmationOpen && memberToDelete && (
        <DeleteMemberConfirmation
          member={memberToDelete}
          setIsOpen={setDeleteConfirmationOpen}
          deleteMember={deleteMember}
        />
      )}
    </div>
  );
};

export default EditMember;