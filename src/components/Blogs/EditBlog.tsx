import { useState } from "react";
import { editBlog } from "../../services/api";
import { toast } from "react-toastify";
import { IBlog } from "../../types";
import { Formik, Form, Field } from "formik";

//type declaration
interface EditBlogProps {
  onClose: () => void;
  blog: IBlog;
  fetchBlogs: () => void;
}

interface FormValues {
  title: string;
  description: string;
}

  const EditBlog = ({ onClose, blog, fetchBlogs }: EditBlogProps) => {
  const initialValues: FormValues = {
    title: blog.title,
    description: blog.description,
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await editBlog(blog._id, values);

      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
        });

        fetchBlogs();
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update blog.");
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <h2>Edit Blog Post</h2>

          {/* Title */}
          <div>
            <label htmlFor="title" className="title_label">
              Title
            </label>
            <Field
              type="text"
              id="title"
              name="title"
              placeholder="Enter blog title"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="blog_content_label">
              Content
            </label>
            <Field
              as="textarea"
              id="description"
              name="description"
              placeholder="Enter blog description"
            />
          </div>

          {/* Buttons */}
          <div className="action-btns-modal">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>

            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};



export default EditBlog;
