import React, {useState} from "react";


type ModalProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProceedDelete = ({ isOpen, setIsOpen}: ModalProps) => {
    
    const deleteTask= () =>{
        setIsOpen(false);
    }
    
    return (
        <div className="h-full flex flex-col justify-between">
            <div className="text-center text-2xl text-red-500"> Delete Task ?</div>
            <div className="flex flex-row justify-between mx-10">
                <button className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-lg" onClick={() => setIsOpen(false)}>Cancel</button>
                <button className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-lg" onClick={deleteTask}>Delete</button>
            </div>
        </div>
    );
}

export default ProceedDelete;