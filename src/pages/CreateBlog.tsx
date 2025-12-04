import { useState } from "react";
import Layout from "../components/Layout";
import { createBlog } from "../services/api";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface BlogValues {
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

const CreateBlog = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClose = () => setOpen(false);

  const initialValues: BlogValues = { title: "", description: "" };

  const handleSubmit = async (values: BlogValues) => {
    try {
      setLoading(true);
      const response = await createBlog(values);
      console.log(response);

      setOpen(true);
      navigate("/blogs");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="create_blog_form">
              <h2 style={{ marginBottom: "40px" }}>Create New Blog Post</h2>

              <label htmlFor="title">Title</label>
              <Field
                type="text"
                id="title"
                name="title"
                placeholder="Enter blog title"
              />
              <ErrorMessage name="title" component="div" className="error" />

              <label htmlFor="description">Description</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                placeholder="Enter blog content"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="error"
              />

              <button type="submit" disabled={isSubmitting || loading}>
                {loading ? "loading..." : "Submit"}
              </button>

              <Snackbar
                open={open}
                message="Blog created successfully!"
                autoHideDuration={3000}
                onClose={handleClose}
              />
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};
export default CreateBlog;
