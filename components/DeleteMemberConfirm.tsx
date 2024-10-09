import React from 'react';
import { memberData } from '../utils/interface';

interface DeleteMemberConfirmProps {
  member: memberData;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteMember: (member: memberData) => void;
}

const DeleteMemberConfirm: React.FC<DeleteMemberConfirmProps> = ({ member, setIsOpen, deleteMember }) => {
  const handleDelete = () => {
    deleteMember(member);
    setIsOpen(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Delete Member</h2>
      <p>Are you sure you want to delete {member.name}?</p>
      <div className="flex justify-end space-x-2 mt-4">
        <button
          className="bg-gray-300 text-black rounded px-4 py-2"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
        <button
          className="bg-red-500 text-white rounded px-4 py-2"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteMemberConfirm;