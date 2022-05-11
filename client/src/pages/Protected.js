import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Protected = (props) => {
  const { Component } = props;
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/protectedauth/${username}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((result) => {
        if (result.data.status === "notoken") {
          navigate("/signup");
          return;
        }
      })
      .catch((err) => {
        if (err) {
          navigate("/signup");
          localStorage.clear();
          return;
        }
      });
  }, [username, navigate]);

  return (
    <div>
      <Component />
    </div>
  );
};
