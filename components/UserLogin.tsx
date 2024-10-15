"use client"
import React, {useState} from "react";
import MediumPopUp from "./MediumPopUp";
import {fetchUsers} from '@/utils/users';
import {UserData} from '@/utils/interface';
import sha256 from 'crypto-js/sha256';
import { useUser } from '@/context/UserContext';

type WelcomePageProps = {
    setAdminLogin: React.Dispatch<React.SetStateAction<boolean>>;
    setUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
  };

const UserLogin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const {setCurrentUser} = useUser();

    const login = async()=>{
        setLoading(true);
        const users = await fetchUsers();
        const user = users.find((user:UserData) => user? user.name === username : false);
        if(user){
            const encrypted = sha256(password).toString();
            if(encrypted !== user.hash.toString()){
                alert("Invalid Password");
            }else{
                setCurrentUser(user);
            }
        }else{
            alert("User not found");
        }
        setLoading(false);
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-lg font-bold mb-4">User Login</p>
            <p>
                Username: 
                <input
                    type="text"
                    className="ml-2 w-30 p-1 border rounded"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </p>
            <p>
                Password: 
                <input
                    type="password"
                    className="ml-2 p-1 border rounded"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </p>
            <button 
                className="mb-2 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={login}
                disabled={loading}
            >Login</button>
        </div>
    )
}

export default UserLogin;