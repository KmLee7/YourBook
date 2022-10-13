import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import { logout } from "../../store/session";
import * as sessionActions from "../../store/session";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  let sessionLinks;

  const handleClick = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if, e.g., server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      }
    );
  };
  if (!sessionUser) {
    return (sessionLinks = (
      <>
        <div className="home-page">
          <div className="left-container">
            <div id="facebook-logo">yourbook</div>
            <h2 id="home-page-info">
              Connect with friends and the world around you on Yourbook.
            </h2>
          </div>
          <div className="right-container">
            <div className="line-break0"></div>
            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
            <div className="line-break0"></div>
            <input
              id="login-email"
              placeholder="Email or phone number"
              type="email"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
            <div className="line-break"></div>
            <input
              id="login-password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="line-break"></div>
            <button className="loginButton" onClick={handleClick}>
              Log In
            </button>
            <div className="line-break2"></div>
            <a
              href="https://thesecmaster.com/12-tips-to-never-forget-a-password/#:~:text=Jog%20Your%20Memory!&text=You%20can%20use%20the%20first,you%20seem%20to%20forget%20it."
              id="forget-password"
            >
              Forget password?
            </a>
            <div className="line-break2"></div>
            <hr className="borderline"></hr>
            <div style={{ textAlign: "center" }}>
              <div className="line-break2"></div>
              <SignupFormModal />
              <div className="line-break3"></div>
              <p>
                <a href="https://www.facebook.com/" id="under-submit">
                  Create a Page
                </a>{" "}
                for a celebrity, brand or business
              </p>
            </div>
          </div>
        </div>
        <div className="footer">HEllo this is the footer</div>
      </>
    ));
    // sessionLinks = (
    //   <ProfileButton user={sessionUser} />
    // );
  } else {
    return (sessionLinks = (
      <button
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </button>
    ));
  }
}

export default Navigation;
