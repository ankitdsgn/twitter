import React from "react";
import { Link } from "react-router-dom";
import { WhiteButton, ButtonDark } from "../components/Button.style";
//images import------------------------------------------
import twitterBanner from "../images/twitter-banner.jpg";
import twitterlogo from "../images/twitter-logo.png";
import googlelogo from "../images/google-logo.svg";
import facebooklogo from "../images/facebook-logo.svg";
//images import------------------------------------------
import("../style/Home.css");

export const Home = () => {
  return (
    <div className="main">
      <div className="upper-wrapper-top">
        <div className="banner-left">
          <img
            className="twitter-banner"
            alt="twitter-banner"
            src={twitterBanner}
          ></img>
        </div>
        <div className="login-signup-wrapper-right">
          <img
            alt="twitter-logo"
            className="twitter-logo"
            src={twitterlogo}
          ></img>
          <h1 className="big-heading">Happening now</h1>
          <h2 className="sub-heading">Join Twitter Today.</h2>
          <button className="google-button">
            <img
              className="google-logo"
              src={googlelogo}
              alt="google-logo"
            ></img>
            Sign In with Google
          </button>

          <button className="facebook-button">
            <img
              alt="fb-logo"
              className="facebook-logo"
              src={facebooklogo}
            ></img>
            Sign In with Facebook
          </button>
          <div className="or">
            <span>or</span>
          </div>
          <Link
            style={{ textDecoraction: "none", color: "white" }}
            to="/signup"
          >
            <ButtonDark buttontxtcolor="#FFFFFF" margintop="10px">
              Sign Up With Phone & Email
            </ButtonDark>
          </Link>
          <h2 className="already-heading">Already have an account?</h2>
          <Link style={{ textDecoraction: "none", color: "white" }} to="/login">
            <WhiteButton margintop="10px">Sign In</WhiteButton>
          </Link>
        </div>
      </div>
    </div>
  );
};
