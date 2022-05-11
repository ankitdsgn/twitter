import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { WhiteButton, ButtonDark } from "../components/Button.style";
//images import------------------------------------------
import twitterlogo from "../images/twitter-logo.png";
//images import------------------------------------------
import("../style/SignupLogin.css");

export const Signup = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const handelSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/signup", {
        email,
        username,
        password,
        cpassword,
      })
      .then((result) => {
        navigate(`/login`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main">
      <div className="signup-wrapper">
        <div className="signup-box">
          <img
            className="twitter-logo-signup"
            src={twitterlogo}
            alt="twitter-logo"
          ></img>
          <h1 className="signup-main-heading"> Create your account</h1>

          <form onSubmit={handelSubmit} className="signup-form">
            <input
              type="text"
              className="email-input"
              placeholder="Type your email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type="text"
              className="username-input"
              placeholder="Type your username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <input
              type="password"
              className="password-input"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <input
              type="password"
              className="cpassword-input"
              placeholder="Confirm password"
              name="cpassword"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
            ></input>
            <ButtonDark type="submit" buttonbgcolor="#000000" margintop="30px">
              Next
            </ButtonDark>
          </form>
          <WhiteButton margintop="10px"> Forgot Password?</WhiteButton>

          <p className="small-text">
            <Link className="already-have-account" to="/login">
              Already have an account?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
