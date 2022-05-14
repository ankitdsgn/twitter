import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";

// react icons
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineCompass } from "react-icons/ai";
import { AiOutlineNotification } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { AiOutlineTag } from "react-icons/ai";
import { AiOutlineOrderedList } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";

//components import
import { ButtonDark, WhiteButton } from "../components/Button.style";

//images import
import twitterlogo from "../images/twitter-logo.png";

//css import
import("../style/Dashboard.css");

//----------------------------------------------------
export const Dashboard = () => {
  const navigate = useNavigate();

  const [userdata, setUserdata] = useState([]);

  //AXIOS GET REQUEST

  useEffect(() => {
    axios
      .get("http://localhost:5000/dashboard")
      .then((result) => {
        setUserdata(result.data);
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //TOKEN AVAILABLE
  let tokenAvailable = localStorage.getItem("token");

  //LOGOUT HANDEL

  const logoutHandel = () => {
    if (tokenAvailable) {
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="sidemenu-left">
        <div className="nav-area-white-space-left"></div>
        <div className="nav-area-right">
          <img
            alt="twitter-logo"
            className="profile-twitter-logo"
            src={twitterlogo}
          ></img>
          <div>
            <ul className="profile-nav-items">
              <li>
                <AiOutlineHome className="icons" />
                Home
              </li>
              <li>
                <AiOutlineCompass className="icons" />
                Explore
              </li>
              <li>
                <AiOutlineNotification className="icons" />
                Notification
              </li>
              <li>
                <AiOutlineMessage className="icons" />
                Messages
              </li>
              <li>
                <AiOutlineTag className="icons" />
                Bookmarks
              </li>
              <li>
                <AiOutlineOrderedList className="icons" />
                Lists
              </li>
              <Link to="/profile">
                <li>
                  <AiOutlineUser className="icons" />
                  Profile
                </li>
              </Link>

              <Link to="/tweeting">
                <ButtonDark
                  className="profile-tweet-button"
                  width="170px"
                  margintop="30px"
                >
                  Tweet
                </ButtonDark>
              </Link>

              {tokenAvailable ? (
                <WhiteButton
                  width="170px"
                  margintop="30px"
                  onClick={logoutHandel}
                >
                  Logout
                </WhiteButton>
              ) : null}
            </ul>
          </div>
        </div>
      </div>

      <div className="posts-middle">
        {userdata.map((items) => {
          const { username, bio, country } = items;

          return (
            <>
              <div className="users-wrapper">
                <div className="contact-text-wrapper">
                  <h3>{username}</h3>
                  <p style={{ fontSize: "13px", color: "gray" }}>{country}</p>
                  <p style={{ marginTop: "10px" }}>{bio}</p>

                  <Button variant="contained" style={{ marginTop: "20px" }}>
                    Contact Him
                  </Button>
                </div>
              </div>
            </>
          );
        })}
      </div>

      <div className="news-right"></div>
    </div>
  );
};
