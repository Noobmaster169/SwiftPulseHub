import React, {useState} from "react";
import MediumPopUp from "./MediumPopUp";

type WelcomePageProps = {
    setAdminLogin: React.Dispatch<React.SetStateAction<boolean>>;
    setUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
  };

const WelcomePage = ({setAdminLogin, setUserLogin}: WelcomePageProps) => {
    const [isAdmin, setIsAdmin] = useState(false);

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
                        <input type="text" className="ml-2 w-30 p-1 border rounded" placeholder="Enter username"/>
                    </p>
                    <p>
                        Password: 
                        <input type="text" className="ml-2 p-1 border rounded" placeholder="Enter password"/>
                    </p>
                    <button 
                        className="mb-2 px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => {setAdminLogin(true)}}
                    >Login</button>
                </div>
            </MediumPopUp>
        </div>
        

    )
}

export default WelcomePage;