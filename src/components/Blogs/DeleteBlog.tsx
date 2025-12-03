import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Modal/Modal.css";
import { deleteBlog } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import { IBlog } from "../../types";


interface IProps {
  onClose: () => void;
  deletedItem: IBlog;
  fetchBlogs: () => void;
}

const DeleteBlog = ({ onClose, deletedItem, fetchBlogs }: IProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await deleteBlog(deletedItem._id);
      if (response.status === 200) {
        toast.success(response.data.message || "Blog deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        fetchBlogs();
        setTimeout(() => onClose(), 300); // ensure toast displays
      }
    } catch (error) {
      toast.error("Failed to delete blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Confirm Delete</h2>
      <p style={{ textAlign: "center" }}>
        Are you sure you want to delete this item?
      </p>
      <div className="delete-btns">
        <button className="delete-btn" onClick={handleDelete}>
          {loading ? "Deleting..." : "Delete"}
        </button>
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteBlog;
