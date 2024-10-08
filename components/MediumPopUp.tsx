"use client";
import React, { ReactNode } from "react";
import Modal from "react-modal";
import { Styles } from "react-modal";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
};

const MediumPopUp = ({ isOpen, setIsOpen, children }: ModalProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      zIndex: 10000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      height: "40%",
      width: "30%",
      padding: "20px",
      borderRadius: "30px",
      maxWidth: "800px",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#f9f9f9",
      border: "none",
      overflow: "auto", // Change this line to allow scrolling
      zIndex: 10001,
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles as Styles}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-end">
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
            <IoMdClose size={24} />
          </button>
        </div>
        <div className="overflow-auto">
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default MediumPopUp;