import React, { useState } from 'react';
import { memberData } from '../utils/interface';
import MediumPopUp from './MediumPopUp'; // Assuming you have a MediumPopUp component
import PopUp from './PopUp';
interface DeleteMemberConfirmProps {
  member: memberData;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteMember: (member: memberData) => void;

  };


const DeleteMemberConfirm: React.FC<DeleteMemberConfirmProps> = ({ member, setIsOpen, deleteMember }) => {
  const [reassignOpen, setReassignOpen] = useState(false);

//   const handleDelete = () => {
//     if (hasAssignedTasks(member)) {
//       setReassignOpen(true);
//     } else {
//       deleteMember(member);
//       setIsOpen(false);
//     }
//   };
const handleDelete = () => {
    setReassignOpen(true);
    setIsOpen(true);
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
          Confirm
        </button>
      </div>

        <MediumPopUp isOpen={reassignOpen} setIsOpen={setReassignOpen}>
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Attention</h2>
            <p>This team member is assigned with tasks.</p>
            <div className="flex justify-end space-x-2 mt-4">
            <button
                className="bg-blue-500 text-white rounded px-4 py-2"
                onClick={() => {
                // Logic to reassign tasks
                setReassignOpen(false);
                setIsOpen(false);
                // Navigate back to the sprint board
                window.location.href = '/sprintBoard';
                }}
            >
                Reassign Task
            </button>
            </div>
        </div>
        </MediumPopUp>
    </div>
  );
};

export default DeleteMemberConfirm;