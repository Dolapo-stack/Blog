import { Link, useNavigate } from "react-router-dom";
import "../../src/index.css";
import { useState } from "react";
import SignUpImage from "../assets/images/login_image.png";
import Layout from "../components/Layout";
import { register } from "../services/api.js";
import { Formik, Form, Field } from "formik";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("All the fields are required");
    }

    const payload = {
      name,
      email,
      password,
    };

    try {
      setLoading(true);
      const response = await register(payload);
      console.log(response);
      if (response.status == 201) {
        alert(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="signup_wrapper">
        <div className="container">
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            onSubmit={handleSubmit}
          >
            <Form action="#" onSubmit={handleSubmit} className="form">
              <h2 style={{ marginBottom: "40px" }}>Get Started Now</h2>

              <label htmlFor="name">Name</label>

              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />

              <label htmlFor="email">Email adress</label>

              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="password">Password</label>

              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit">
                {loading ? "loading...." : "Signup"}
              </button>

              <p style={{ textAlign: "center", fontWeight: 600 }}>
                Have an account?{" "}
                <Link to="/login" className="fontColor">
                  Sign In
                </Link>
              </p>
            </Form>
          </Formik>
        </div>
        <div className="signup_image form_item">
          <img src={SignUpImage} alt="image" />
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
