import { useState } from "react";
import { editBlog } from "../../services/api";
import { toast } from "react-toastify";
import { IBlog } from "../../types";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

interface EditBlogProps {
  onClose: () => void;
  blog: IBlog;
  fetchBlogs: () => void;
}

interface FormValues {
  title: string;
  description: string;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
});

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
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
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
            <ErrorMessage name="title" component="div" className="error" />
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
            <ErrorMessage
              name="description"
              component="div"
              className="error"
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
