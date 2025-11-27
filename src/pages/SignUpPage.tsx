import { Link, useNavigate } from "react-router-dom";
import "../../src/index.css";
import { useState } from "react";
import SignUpImage from "../assets/images/login_image.png";
import Layout from "../components/Layout";
import { register } from "../services/api.js";
import { Formik, Form, Field, FormikHelpers } from "formik";


interface SignUpValues {
  name: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

    const initialValues: SignUpValues = { name: "", email: "", password: "" };

     const handleSubmit = async (
       values: SignUpValues,
       { setSubmitting }: FormikHelpers<SignUpValues>
     ) => {
       if (!values.name || !values.email || !values.password) {
         alert("All the fields are required");
         return;
       }
       try {
         setLoading(true);
         const response = await register(values); // register({ name, email, password })
         console.log(response);

         if (response.status === 201) {
           alert(response.data.message);
           navigate("/login");
         }
       } catch (error) {
         console.log(error);
         alert("Registration failed, check console for details");
       } finally {
         setLoading(false);
         setSubmitting(false);
       }
     };

return (
  <Layout>
    <div className="signup_wrapper">
      <div className="container">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="form">
              <h2 style={{ marginBottom: "40px" }}>Get Started Now</h2>

              <label htmlFor="name">Name</label>
              <Field
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
              />

              <label htmlFor="email">Email address</label>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
              />

              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
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
