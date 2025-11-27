import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../assets/images/login_image.png";
import Layout from "../components/Layout";
import { login } from "../services/api";
import { Formik, Form, Field, FormikHelpers } from "formik";

interface LoginValues {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValues: LoginValues = { email: "", password: "" };

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
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("Login failed");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!email || !password) {
  //     alert("Fill in details");
  //   }

  //   const payload = {
  //     email,
  //     password,
  //   };

  //   try {
  //     setLoading(true);
  //     const response = await login(payload);
  //     console.log(response);
  //     if (response.status == 200) {
  //       alert(response.data.message);
  //       const userObj = {
  //         name: response.data.user.name,
  //         token: response.data.user.token,
  //       };
  //       sessionStorage.setItem("user", JSON.stringify(userObj));
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Layout>
      <div className="login_wrapper">
        <div className="container form_item">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
                </div>

                <button type="submit" disabled={isSubmitting || loading}>
                  {loading ? "Loading..." : "Submit"}
                </button>
                <p style={{ textAlign: "center", fontWeight: 600 }}>
                  Don't have a account?{" "}
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
    </Layout>
  );
};

export default Login;
