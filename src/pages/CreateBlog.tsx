import { useState } from "react";
import Layout from "../components/Layout";
import { createBlog } from "../services/api";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";

const CreateBlog = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      description,
    };
    try {
      setLoading(true);
      const response = await createBlog(payload);
      console.log(response);

      alert(response.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="container">
        <form action="" className="create_blog_form" onSubmit={handleSubmit}>
          <h2 style={{ marginBottom: "40px" }}>Create New Blog Post</h2>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="blog_content">Description</label>
          <textarea
            name="content"
            id="content"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button type="submit">{loading ? "loading..." : "Submit"}</button>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} />
        </form>
      </div>
    </Layout>
  );
};

export default CreateBlog;
