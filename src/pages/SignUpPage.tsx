import { Link, useNavigate } from "react-router-dom";
import "../../src/index.css";
import { useState } from "react";
import SignUpImage from "../assets/images/login_image.png";
import Layout from "../components/Layout";
import { register } from "../services/api.js";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";

interface SignUpValues {
  name: string;
  email: string;
  password: string;
}

// Yup Validation Schema
const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues: SignUpValues = { name: "", email: "", password: "" };

  const handleSubmit = async (
    values: SignUpValues,
    { setSubmitting }: FormikHelpers<SignUpValues>
  ) => {
    try {
      setLoading(true);

      const response = await register(values);

      if (response.status === 201) {
        alert(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      alert("Registration failed");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="signup_wrapper">
        <div className="container">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={signUpSchema}
          >
            {({ isSubmitting }) => (
              <Form className="form">
                <h2 style={{ marginBottom: "40px" }}>Get Started Now</h2>

                {/* Name */}
                <label htmlFor="name">Name</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="error_message"
                />

                {/* Email */}
                <label htmlFor="email">Email address</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="error_message"
                />

                {/* Password */}
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="error_message"
                />

                <button type="submit" disabled={isSubmitting || loading}>
                  {loading ? "Loading..." : "Signup"}
                </button>

                <p style={{ textAlign: "center", fontWeight: 600 }}>
                  Have an account?{" "}
                  <Link to="/login" className="fontColor">
                    Sign In
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>

        <div className="signup_image form_item">
          <img src={SignUpImage} alt="Signup" />
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
