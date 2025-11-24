import React from "react";
import "./Modal.css";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ isOpen, onClose, children }) => {
  return isOpen ? (
    <div className="modal-container">
      <div className="modal-content">
        <AiOutlineClose className="close-icon" size={28} onClick={onClose}/>
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
