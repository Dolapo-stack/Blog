import { useState } from "react";
import { editBlog } from "../../services/api";
import { toast } from "react-toastify";
import { IBlog } from "../../types";

//type declaration
interface EditBlogProps {
  onClose: () => void;
  blog: IBlog;
  fetchBlogs: () => void;
}

const EditBlog = ({ onClose, blog, fetchBlogs }: EditBlogProps) => {
  const [title, setTitle] = useState(blog.title);
  const [description, setDescription] = useState(blog.description);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      description,
    };
    console.log(payload);
    try {
      setLoading(true);
      const response = await editBlog(blog._id, payload);
      console.log(response);
      if (response.status == 200) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
        });

        onClose();
        fetchBlogs();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2> Edit Blog Post</h2>
      <div>
        <label htmlFor="title" className="title_label">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          placeholder="Enter blog title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="blog_content" className="blog_content_label">
          Content
        </label>
        <textarea
          name="description"
          id="content"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="action-btns-modal">
        <button type="submit">{loading ? "Saving..." : "Save Changes"}</button>
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditBlog;
