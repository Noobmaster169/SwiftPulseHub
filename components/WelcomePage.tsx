import React, {useState} from "react";
import MediumPopUp from "./MediumPopUp";
import {fetchUsers} from '@/utils/users';
import {UserData} from '@/utils/interface';
import sha256 from 'crypto-js/sha256';

type WelcomePageProps = {
    setAdminLogin: React.Dispatch<React.SetStateAction<boolean>>;
    setUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
  };

const WelcomePage = ({setAdminLogin, setUserLogin}: WelcomePageProps) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const adminLogin = async()=>{
        setLoading(true);
        const users = await fetchUsers();
        const admin = users.find((user:UserData) => user? user.name === "admin" : false);
        const encrypted = sha256(password).toString();
        if(username !== "admin"){
            alert("Invalid Username");
        }else if(encrypted !== admin.hash.toString()){
            alert("Invalid Password");
        }else{
            setAdminLogin(true);
        }
        setLoading(false);
    }

    return (
        <div className="flex items-center justify-center text-black min-h-screen">
            <div className="bg-white bg-opacity-30 p-8 rounded-lg shadow-md w-80 flex flex-col items-center justify-center h-auto">
                <p className="mb-4 text-lg font-bold">Welcome back!</p>
                <button 
                    className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => setIsAdmin(true)}
                >
                    View as Admin
                </button>
                <button 
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => setUserLogin(true)}
                >
                    View as User
                </button>
            </div>
            
            <MediumPopUp isOpen={isAdmin} setIsOpen={setIsAdmin}>
                <div className="flex flex-col items-center justify-center space-y-4">
                    <p className="text-lg font-bold mb-4">Admin Login</p>
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
                        onClick={adminLogin}
                        disabled={loading}
                    >{loading? "Logging In": "Login"}</button>
                </div>
            </MediumPopUp>
        </div>
        

    )
}

export default WelcomePage;