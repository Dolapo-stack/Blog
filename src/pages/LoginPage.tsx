import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import LoginImage from "../assets/images/login_image.png";
import Layout from "../components/Layout";
import { login } from "../services/api";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";

interface LoginValues {
  email: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const initialValues: LoginValues = { email: "", password: "" };

  //  Validate each field as user types
  const validateField = async (field: string, value: string) => {
    try {
      await loginSchema.validateAt(field, { [field]: value });

      setErrors((prev) => ({ ...prev, [field]: "" }));
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, [field]: err.message }));
    }
  };

  const handleSubmit = async (
    values: LoginValues,
    { setSubmitting }: FormikHelpers<LoginValues>
  ) => {
    if (!values.email || !values.password) {
      alert("Fill in details");
      return;
    }

    try {
      setLoading(true);
      const response = await login(values); // Assuming login({ email, password })
      console.log(response);

      if (response.status === 200) {
        alert(response.data.message);
        const userObj = {
          name: response.data.user.name,
          token: response.data.user.token,
        };
        sessionStorage.setItem("user", JSON.stringify(userObj));
        sessionStorage.setItem("auth", "true");
        navigate("/blogs");
      }
    } catch (error) {
      console.log(error);
      alert("Login failed");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="login_wrapper">
      <div className="container form_item">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={loginSchema}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              <h2 className="login_title">Welcome back!</h2>
              <p>Enter your credentials to access your account</p>
              <div className="email">
                <label htmlFor="email">Email address</label>
                <br />
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
              </div>
              <div className="password">
                <label htmlFor="password">Password</label>
                <br />
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="error_message"
                />
              </div>

              <button type="submit" disabled={isSubmitting || loading}>
                {loading ? "Loading..." : "Submit"}
              </button>
              <p style={{ textAlign: "center", fontWeight: 600 }}>
                <span style={{marginRight: "8px"}}>Don't have a account?</span>
                <Link to="/register" className="link">
                  Sign Up
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
      <div className="login_image form_item">
        <img src={LoginImage} alt="" className="image_login" />
      </div>
    </div>
  );
};

export default Login;
