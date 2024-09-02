"use cleint";
import React, {ReactNode} from 'react';
import Modal from 'react-modal';
import { Styles } from 'react-modal';
import { useState } from "react";
import { IoMdClose } from "react-icons/io";


type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
};

const PopUp = ({isOpen, setIsOpen, children } : ModalProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      height:"80%",
      width: "90%",
      padding: "30px",
      borderRadius: "30px",
      maxWidth: '800px',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: "#f9f9f9",
      border: "none",
      boxShadow: '0 0 10px 5px rgba(200, 200, 200, 0.9)', // Add this line for gradient gray outline
    },
  };

  return (
      <Modal
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles as Styles}
      >
        <div className="flex flex-row justify-between text-white">
            <div></div>
            <div className="bg-black text-white" onClick={()=>setIsOpen(false)}><IoMdClose/></div>
        </div>
        <div className="flex flex-col items-center justify-center">
            {children}
        </div>
      </Modal>
  );
};

export default PopUp;