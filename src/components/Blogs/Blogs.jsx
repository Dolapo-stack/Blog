import React, { useEffect, useState } from "react";
import axios from "axios";
import skincare_bg from "../../assets/images/skincare.jpg";
import "../Blogs/Blogs.css";
import Modal from "../Modal/Modal";
import DeleteBlog from "./DeleteBlog";
import EditBlog from "./EditBlog";

const Blogs = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleClose = ()=> setModalOpen(false);

  const handleOpenEditModal = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = ()=> setIsEditModalOpen(false);

  const blogData = [
    {
      id: 1,
      title:
        "10 Skincare Mistakes That Are Ruining Your Skin And How to Fix Them",
      Image: skincare_bg, // Replace with actual image URL
      blogDescription:
        "Learn about the most common skincare mistakes people make and how you can avoid them for healthier, glowing skin.",
    },
    {
      id: 2,
      title:
        "The Benefits of Drinking Water for Your Skin: Hydrate From the Inside Out",
      Image: skincare_bg, // Replace with actual image URL
      blogDescription:
        "Discover how staying hydrated can transform your skin, reducing wrinkles, acne, and dryness.",
    },
    {
      id: 3,
      title: "How to Build the Perfect Skincare Routine for Every Skin Type",
      Image: skincare_bg, // Replace with actual image URL
      blogDescription:
        "Whether you have oily, dry, or combination skin, this guide will help you create a skincare routine tailored to your needs.",
    },
    {
      id: 4,
      title: "Top 5 Anti-Aging Ingredients You Should Include in Your Skincare",
      Image: skincare_bg, // Replace with actual image URL
      blogDescription:
        "Learn about the most effective anti-aging ingredients like retinol, vitamin C, and hyaluronic acid to fight wrinkles and fine lines.",
    },
  ];

  const handleDelete = (item) => {
    const deletedItem = blogData.filter((item) => item.id !== item);
  };

  return (
    <>
      <div className="blog_cards_wrapper">
        {blogData.map((data) => {
          return (
            <div className="blog_container" key={data.id}>
              <div className="blog_image">
                <img
                  src={data.Image}
                  alt={data.title}
                  className="skincare_bg"
                />
              </div>
              <div className="blog_content">
                <h4 className="blog_title" style={{ color: "#3A5B22" }}>
                  {data.title}
                </h4>
                <span className="author">
                  <small>Dominic Sea</small>
                </span>
                <span className="date">
                  <small>7th October, 2025</small>
                </span>
                <p className="content">{data.blogDescription}</p>

                <div className="action_btns">
                  <button onClick={() => handleOpenEditModal(selectedItem)}>Edit</button>
                  <button onClick={() => openModal(selectedItem)}>Delete</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}>
          <DeleteBlog deletedItem={selectedItem} onClose={handleClose}/>
        </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}>
          <EditBlog editData={selectedItem} onClose={handleClose}/>
        </Modal>
    </>
  );
};

export default Blogs;
