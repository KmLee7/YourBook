import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FiGithub } from "react-icons/fi";
import { GrLinkedin } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";
import { FaUserCircle } from "react-icons/fa";
import { logout } from "../../store/session";
import "./NavBar.css";
import SearchBar from "../SearchBar/SearchBar";

function NavBar() {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  let menuRef = useRef();

  const currentUser = useSelector(
    ({ entities: { users }, session: { currentUserId } }) =>
      users[currentUserId]
  );

  let userName;
  if (currentUser) {
    userName = currentUser.first_name + " " + currentUser.last_name;
  }
  ///Search function
  const users = useSelector((state) => state.entities.users);
  let tempUsers = Object.values(users);
  // console.log(tempUsers);
  let names = [];
  for (let i = 0; i < tempUsers.length; i++) {
    names.push(tempUsers[i].first_name);
  }
  const handleHomeClick = (e) => {
    e.preventDefault();
    history.push("/");
  };

  useEffect(() => {
    let handlerOne = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handlerOne);
    return () => {
      document.removeEventListener("mousedown", handlerOne);
    };
  }, []);
  return (
    <div className="Navbar">
      <div className="left-nav">
        <button
          style={{ border: "1px solid white", backgroundColor: "white" }}
          onClick={handleHomeClick}
        >
          <SiFacebook
            className="face-logo"
            size={50}
            style={{ color: "black" }}
          />
        </button>
        <SearchBar
          className="search-bar"
          placeholder="Search yourbook"
          data={tempUsers}
        />
      </div>
      <div className="mid-nav">
        <button
          style={{ border: "1px solid white", backgroundColor: "white" }}
          onClick={handleHomeClick}
        >
          <FaHome className="home-logo" size={55} style={{ color: "black" }} />
        </button>
        <div className="line-break7h"></div>
        <a target="./" href="https://github.com/KmLee7/YourBook">
          <FiGithub
            className="github-logo"
            size={50}
            style={{ width: "55px" }}
            color={"black"}
          />
        </a>
        <div className="line-break7h"></div>
        <a
          target="./"
          href="https://www.linkedin.com/in/kyungmin-lee-1767a6255/"
        >
          <GrLinkedin
            className="link-logo"
            size={48}
            style={{ color: "black" }}
          />
        </a>
      </div>
      <div className="right-nav">
        <div className="menu-container" ref={menuRef}>
          <div
            className="menu-trigger"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <FaUserCircle className="user-logo1" size={50} color="black" />
          </div>
          <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
            <div>
              <button
                className="left-profile-button"
                onClick={(e) => {
                  e.preventDefault();
                  history.push(`/ProfilePage/${currentUser.id}`);
                }}
              >
                <div className="first-left-con">
                  <FaUserCircle size={36} />
                  <div style={{ width: "15" }}></div>
                  <div className="user-username1">
                    {currentUser &&
                      currentUser.first_name + " " + currentUser.last_name}
                  </div>
                </div>
              </button>
            </div>
            <div style={{ height: "20px" }}></div>
            <div>
              <button
                style={{
                  width: "220px",
                  height: "40px",
                  border: "1px solid lightgray",
                  borderRadius: "8px",
                }}
                className="logout-button"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
