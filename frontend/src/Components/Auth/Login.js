import React from "react";
import makeToast from "../Toaster";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = (props) => {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const navigate = useNavigate();

  const loginUser = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const authHeader = "Basic " + btoa(`${email}:${password}`);

    axios
      .get("http://localhost:5000/connect", {
        headers: {
          Authorization: authHeader,
        },
      })
      .then((response) => {
        makeToast("success", "logged in successfully");
        localStorage.setItem("X-Token", response.data.token);
        navigate("/chat");
      })
      .catch((err) => {
        if (err && err.response && err.response.data && err.response.data.error)
          makeToast("error", err.response.data.error);
      });
  };

  return (
    <div className="card">
      <div className="cardHeader">Login</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="abc@example.com"
            ref={emailRef}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            ref={passwordRef}
          />
        </div>
        <button onClick={loginUser}>Login</button>
      </div>
    </div>
  );
};

export default Login;
