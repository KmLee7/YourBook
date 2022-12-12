import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import ProfileButton from "../ProfilePageModal/ProfileButton";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

import * as sessionActions from "../../store/session";
import HomePage from "../HomePage/index";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.currentUserId);
  // const sessionUser = sessionStorage.getItem("currentUser");
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  let sessionLinks;

  const handleDemo = (e) => {
    e.preventDefault();
    return dispatch(
      sessionActions.login({
        credential: "demo@demo.io",
        password: "password",
      })
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      }
    );
  };
  if (!sessionUser) {
    return (
      <>
        <div className="home-page">
          <div className="left-container">
            <div id="facebook-logo">yourbook</div>
            <h2 id="home-page-info">
              Connect with friends and the world around you on Yourbook.
            </h2>
          </div>
          <div className="login-signup-form">
            <form className="home-right-container" onSubmit={handleSubmit}>
              <div className="line-break0"></div>
              <ul>
                {errors &&
                  errors.map((error) => {
                    return <li key={error}>{error}</li>;
                  })}
              </ul>
              {/* {JSON.stringify(errors)} */}
              <div className="loggingg-form">
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
                <button className="loginButton" type="submit">
                  Log In
                </button>
                <div className="line-break"></div>
                <button className="demoUser" onClick={handleDemo}>
                  Demo
                </button>
                <div className="line-break"></div>
                <a
                  target="./"
                  href="https://thesecmaster.com/12-tips-to-never-forget-a-password/#:~:text=Jog%20Your%20Memory!&text=You%20can%20use%20the%20first,you%20seem%20to%20forget%20it."
                  id="forget-password"
                >
                  Forget password?
                </a>
                <div className="line-break0"></div>
                <hr className="borderline"></hr>
                <div style={{ textAlign: "center" }}>
                  <div className="line-break0"></div>
                </div>
                {/* <SignupFormModal /> */}
              </div>
            </form>
            <div className="right-container-signup-bottom">
              <SignupFormModal />
            </div>
            <div className="line-break3"></div>
            <p>
              <a target="./" href="https://www.facebook.com/" id="under-submit">
                Create a Page &nbsp;
              </a>
              for a celebrity, brand or business
            </p>
          </div>
        </div>
        <div className="footer"></div>
      </>
    );
  } else {
    return (
      <>
        <Redirect to="/">
          <HomePage />
        </Redirect>
      </>
    );
  }
}

export default Navigation;
