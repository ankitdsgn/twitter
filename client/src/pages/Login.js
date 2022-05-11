import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { WhiteButton, ButtonDark } from "../components/Button.style";
//images import------------------------------------------
import twitterlogo from "../images/twitter-logo.png";
//images import------------------------------------------
import("../style/SignupLogin.css");

export const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handelSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:5000/login",
        {
          username,
          password,
        },
        { withCredentials: true, credentials: "include" }
      )
      .then((result) => {
        localStorage.setItem("token", "Bearer " + result.data.token);
        localStorage.setItem("username", username);
        navigate(`/tweeting`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main">
      <div className="login-wrapper">
        <div className="login-box">
          <img
            className="twitter-logo-login"
            src={twitterlogo}
            alt="twitter-logo"
          ></img>
          <h1 className="login-main-heading">Login To Twitter</h1>

          <form onSubmit={handelSubmit} className="login-form">
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

            <ButtonDark type="submit" buttonbgcolor="#000000" margintop="30px">
              Next
            </ButtonDark>
          </form>
          <WhiteButton margintop="10px"> Forgot Password?</WhiteButton>
        </div>
      </div>
    </div>
  );
};
