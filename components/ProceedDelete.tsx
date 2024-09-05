import React, {useState} from "react";

const ProceedDelete = () => {

    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(!isOpen);
      };
    
    return (
        <div className="w-full h-screen flex items-center justify-center">
        <ul className="list-none">
            <li>
            <span className="text-2xl text-red-500"> Delete Task ? </span>
            </li>
            <hr className="mt-2 border-t border-gray-300" /> {/* Separator line */}
            <li>
            <div className="grid grid-cols-3 justify-items-center">
                <button className="inline-block" onClick={() => setIsOpen(false)}>Cancel</button>
                <div className="h-8 border-l border-gray-300 mx-2" /> {/* Vertical line */}
                <button className="inline-block" onClick={() => setIsOpen(false)}>Delete</button>
            </div>
            </li>
        </ul>
        </div>
    );
}

export default ProceedDelete;