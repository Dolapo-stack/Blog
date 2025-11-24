import React from "react";
import "../Modal/Modal.css";

const DeleteBlog = ({ onClose }) => {
  return (
    <div>
      <h2 style={{textAlign:"center"}}>Confirm Delete</h2>
      <p style={{textAlign:"center"}}>Are you sure you want to delete this item?</p>
      <div className="delete-btns">
        <button className="delete-btn">Delete</button>
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteBlog;
