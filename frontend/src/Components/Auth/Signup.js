import React from "react";
import axios from "axios";
import makeToast from "../Toaster";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Signup = (props) => {
  const userNameRef = React.createRef();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const navigate = useNavigate();

  const signupUser = () => {
    const userName = userNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post("http://3000/user/login", {
        userName,
        email,
        password,
      })
      .then((response) => {
        makeToast("success", response.data.message);
        localStorage.setItem("CC_Token", response.data.token);
        navigate("/dashboard");
        props.setupSocket();
      })
      .catch((err) => {
        console.log(err);
        if (err && err.response && err.response.data && err.response.data.error)
          makeToast("error", err.response.data.error);
      });
  };

  return (
    <div className="card">
      <div className="cardHeader">Create Account</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Your Username"
            ref={userNameRef}
          />
        </div>
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
        <button onClick={signupUser}>Signup</button>
      </div>
    </div>
  );
};

export default Signup;
