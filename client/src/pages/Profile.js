import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import("../style/Profile.css");

//----------------------------------------------------
export const Profile = () => {
  const navigate = useNavigate();

  //FETCHING USERNAME FROM OTHER ROUTER
  const username = localStorage.getItem("username");

  //TOKEN AVAILABLE
  let tokenAvailable = localStorage.getItem("token");

  //LOGOUT HANDEL

  const logoutHandel = () => {
    if (tokenAvailable) {
      localStorage.clear();
      navigate("/");
    }
  };

  //REACT VARIABLES
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  const [updated, setUpdated] = useState("");

  const [show, setShow] = useState(true);

  const displayupdate = () => {
    //SHOW SAVE UPDATE
    setTimeout(() => {
      setShow(false);
    }, 3000);
    setShow(true);
  };

  //FORM SUBMIT FUNCTION -------------------------------
  const handelSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `http://localhost:5000/profile/${username}`,
        {
          bio,
          country,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((result) => {
        setUpdated(result.data.status);
        console.log(result);
      })
      .catch((err) => console.log(err));
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
        <form onSubmit={handelSubmit} className="update-details-form">
          <h1 className="profile-main-heading">Update Your Profile</h1>
          <input
            placeholder="Enter bio"
            type="text"
            value={bio}
            className="bio-input"
            onChange={(e) => setBio(e.target.value)}
          ></input>
          <input
            placeholder="Enter your country"
            type="text"
            value={country}
            className="country-input"
            onChange={(e) => setCountry(e.target.value)}
          ></input>
          <ButtonDark
            margintop="20px"
            type="submit"
            width="130px"
            height="35px"
            fontweight="400"
            onClick={displayupdate}
          >
            Save Changes
          </ButtonDark>
          {show ? <h3>{updated}</h3> : null}
        </form>
      </div>

      <div className="news-right"></div>
    </div>
  );
};
