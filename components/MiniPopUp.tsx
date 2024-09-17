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

const MiniPopUp = ({ isOpen, setIsOpen, children }: ModalProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      height: "20%",
      width: "20%",
      padding: "20px",
      borderRadius: "30px",
      maxWidth: "800px",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#f9f9f9",
      border: "none",
      overflow:"hidden",
      //boxShadow: "0 0 10px 5px rgba(200, 200, 200, 0.9)", // Add this line for gradient gray outline
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles as Styles}
    >
      {children}
    </Modal>
  );
};

export default MiniPopUp;