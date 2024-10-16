import React, { useState } from 'react';
import { addUser } from "@/utils/users";
import sha256 from 'crypto-js/sha256';
import { UserData } from '@/utils/interface';

/**
 * Props for the AddMemberForm component.
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsOpen - Function to toggle the form's visibility.
 * @property {Function} memberAdded - Callback function to be called after a member is successfully added.
 * @property {Function} addMember - Function to add a member with name, email, and password.
 */
interface AddMemberFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  memberAdded: any;
  addMember: (name: string, email: string, password: string) => void;
}

/**
 * AddMemberForm component allows users to add a new team member by providing their name, email, and password.
 * The password is encrypted before being sent to the server.
 * 
 * @param {AddMemberFormProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const AddMemberForm: React.FC<AddMemberFormProps> = ({ setIsOpen, memberAdded, addMember }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Handles the form submission.
   * Encrypts the password and sends the user data to the server.
   * Closes the form and triggers the memberAdded callback on success.
   * 
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const encrypted = sha256(password).toString();

    const newData: UserData = {
      name,
      email,
      hash: encrypted,
    }
    await addUser(newData);
    addMember(name, email, password);
    setIsOpen(false);
    memberAdded();
  };

  return (
    <div className="p-4 w-full mt-20">
      {/* Header for the form */}
      <h2 className="text-xl font-semibold mb-4">Add Team Member</h2>
      
      {/* Form element with submission handler */}
      <form onSubmit={handleSubmit}>
        
        {/* Name input field */}
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        
        {/* Email input field */}
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        
        {/* Password input field */}
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        
        {/* Submit button */}
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
          Add Member
        </button>
      </form>
    </div>
  );
};

export default AddMemberForm;