import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

// css import
import("../style/Tweeting.css");

export const Tweeting = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [tweet, setTweet] = useState("");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState([]);
  const [yourtweets, setYourtweets] = useState([]);

  useEffect(() => {
    gettweetData();
  }, []);

  const gettweetData = () => {
    axios
      .get(`http://localhost:5000/tweeting/${username}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((result) => {
        setBio(result.data.bio);
        setCountry(result.data.country);
        setYourtweets(result.data.tweet);
        setDate(result.data.date);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `http://localhost:5000/tweeting/${username}`,
        { tweet },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        gettweetData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

              <WhiteButton
                width="170px"
                margintop="30px"
                onClick={logoutHandel}
              >
                Logout
              </WhiteButton>
            </ul>
          </div>
        </div>
      </div>

      <div className="posts-middle">
        <div className="tweet-wrapper">
          <p className="person-username">
            {username} <span className="person-country"> ({country}) </span>
          </p>

          <p className="person-bio">{bio}</p>

          <div className="tweet-line"></div>
          <form onSubmit={handelSubmit}>
            <ButtonDark
              type="submit"
              height="30px"
              width="110px"
              marginleft="40px"
              margintop="30px"
            >
              Tweet Now
            </ButtonDark>
            <textarea
              className="tweet-area"
              type="text"
              placeholder="What's going on?"
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
            ></textarea>
          </form>
        </div>

        {yourtweets.reverse().map((tweetmap, index) => {
          const tweetDate = date[index].split("T")[0];

          return (
            <>
              <div className="your-tweet-wrapper">
                <p className="tweeting-person">
                  <span className="tweet-map-date">{tweetDate}</span> Tweet By:{" "}
                  {username}
                </p>
                <div className="tweet-line"></div>
                <p className="tweet-text-wrapper">
                  <span className="tweet-map">{tweetmap}</span>
                </p>
              </div>
            </>
          );
        })}
      </div>

      <div className="news-right"></div>
    </div>
  );
};
