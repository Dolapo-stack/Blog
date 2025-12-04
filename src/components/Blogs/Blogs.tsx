import { useEffect, useState } from "react";
import skincare_bg from "../../assets/images/skincare.jpg";
import "../Blogs/Blogs.css";
import Modal from "../Modal/Modal";
import DeleteBlog from "./DeleteBlog";
import EditBlog from "./EditBlog";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";
import { deleteBlog, getAllBlogs } from "../../services/api";
import { IBlog } from "../../types";
import EmptyBlogCard from "../EmptyBlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<IBlog>();

  const storedUser = sessionStorage.getItem("user");
  const username = storedUser ? JSON.parse(storedUser).name : "Guest";

  const openModal = (item: IBlog) => {
    setSelectedBlog(item);
    setModalOpen(true);
  };

  const handleClose = () => setModalOpen(false);

  const handleOpenEditModal = (item: IBlog) => {
    setSelectedBlog(item);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await getAllBlogs();
      setBlogs(response.data.blogs);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <p className="welcome_message">Welcome, {username} </p>
      {/* <div className="blog_cards_wrapper">
       
      
        {loading &&
          Array.from(new Array(2)).map((_, index) => (
            <div className="blog_container" key={index}>
              <div className="blog_image">
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={180}
                  style={{ borderRadius: "8px" }}
                />
              </div>

              <div className="blog_content">
                <Skeleton variant="text" width="70%" height={28} />
                <div style={{ display: "flex", gap: "10px", margin: "5px 0" }}>
                  <Skeleton variant="text" width={80} height={18} />
                  <Skeleton variant="text" width={100} height={18} />
                </div>

                <Skeleton variant="text" width="100%" height={20} />
                <Skeleton variant="text" width="90%" height={20} />
                <Skeleton variant="text" width="95%" height={20} />

                <div className="action_btns" style={{ marginTop: "15px" }}>
                  <Skeleton variant="rectangular" width={70} height={32} />
                  <Skeleton variant="rectangular" width={70} height={32} />
                </div>
              </div>
            </div>
          ))}
      </div>

      {!loading && (
        <div className="blog_cards_wrapper">
          {blogs.map((blog) => {
            return (
              <div className="blog_container" key={blog._id}>
                <div className="blog_image">
                  <img
                    src={skincare_bg}
                    alt={blog.title}
                    className="skincare_bg"
                  />
                </div>
                <div className="blog_content">
                  <h4 className="blog_title" style={{ color: "#3A5B22" }}>
                    {blog.title}
                  </h4>
                  <span className="author">
                    <small>Dominic Sea</small>
                  </span>
                  <span className="date">
                    <small>7th October, 2025</small>
                  </span>
                  <p className="content">{blog.description}</p>

                  <div className="action_btns">
                    <button onClick={() => handleOpenEditModal(blog)}>
                      Edit
                    </button>
                    <button onClick={() => openModal(blog)}>Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )} */}

      {blogs.length === 0 ? (
        <EmptyBlogCard />
      ) : (
        <div className="blog_cards_wrapper">
          {loading &&
            Array.from(new Array(2)).map((_, index) => (
              <div className="blog_container" key={index}>
                <div className="blog_image">
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={180}
                    style={{ borderRadius: "8px" }}
                  />
                </div>

                <div className="blog_content">
                  <Skeleton variant="text" width="70%" height={28} />
                  <div
                    style={{ display: "flex", gap: "10px", margin: "5px 0" }}
                  >
                    <Skeleton variant="text" width={80} height={18} />
                    <Skeleton variant="text" width={100} height={18} />
                  </div>

                  <Skeleton variant="text" width="100%" height={20} />
                  <Skeleton variant="text" width="90%" height={20} />
                  <Skeleton variant="text" width="95%" height={20} />

                  <div className="action_btns" style={{ marginTop: "15px" }}>
                    <Skeleton variant="rectangular" width={70} height={32} />
                    <Skeleton variant="rectangular" width={70} height={32} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {!loading && blogs.length > 0 && (
        <div className="blog_cards_wrapper">
          {blogs.map((blog) => (
            <div className="blog_container" key={blog._id}>
              <div className="blog_image">
                <img
                  src={skincare_bg}
                  alt={blog.title}
                  className="skincare_bg"
                />
              </div>

              <div className="blog_content">
                <h4 className="blog_title" style={{ color: "#3A5B22" }}>
                  {blog.title}
                </h4>
                <span className="author">
                  <small>Dominic Sea</small>
                </span>
                <span className="date">
                  <small>7th October, 2025</small>
                </span>
                <p className="content">{blog.description}</p>

                <div className="action_btns">
                  <button onClick={() => handleOpenEditModal(blog)}>
                    Edit
                  </button>
                  <button onClick={() => openModal(blog)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <DeleteBlog
          deletedItem={selectedBlog as IBlog}
          onClose={handleClose}
          fetchBlogs={fetchBlogs}
        />
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
        <EditBlog
          blog={selectedBlog as IBlog}
          onClose={handleCloseEditModal}
          fetchBlogs={fetchBlogs}
        />
      </Modal>
    </>
  );
};

export default Blogs;
