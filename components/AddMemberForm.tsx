import React, { useState } from 'react';
import {addUser} from "@/utils/users";
import sha256 from 'crypto-js/sha256';
import {UserData} from '@/utils/interface';

interface AddMemberFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addMember: (name: string, email: string, password: string) => void;
}

const AddMemberForm: React.FC<AddMemberFormProps> = ({ setIsOpen, addMember }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const encrypted = sha256(password).toString();

    const newData: UserData = {
      name,
      email,
      hash: encrypted,
    }
    await addUser(newData);
    alert(password);
    alert(encrypted);
    // addMember(name, email, password);
    setIsOpen(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Add Team Member</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
          Add Member
        </button>
      </form>
    </div>
  );
};

export default AddMemberForm;