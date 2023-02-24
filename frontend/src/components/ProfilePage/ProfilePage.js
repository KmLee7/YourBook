import "./Profile.css";
import { FaUserCircle } from "react-icons/fa";
import * as sessionActions from "../../store/session";
import * as userActions from "../../store/user";
import NavBar from "../NavBar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Posts from "./Posts";
import Friends from "../Friends";
import ShowFriends from "./ShowFriends";

function ProfilePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [postOpen, setPostOpen] = useState(true);
  const [friendOpen, setFriendOpen] = useState(false);

  let currentUser = useSelector((state) => {
    return state.entities.users[id];
  });
  let userName;
  if (currentUser) {
    userName = currentUser.first_name + " " + currentUser.last_name;
  }
  useEffect(() => {
    dispatch(sessionActions.restoreSession());
  }, []);
  // useEffect(() => {
  //   dispatch(userActions.fetchUsers());
  // }, []);

  const handlePosts = (e) => {
    e.preventDefault();
    setFriendOpen(false);
    setPostOpen(true);
  };
  const handleFriends = (e) => {
    e.preventDefault();
    setPostOpen(false);
    setFriendOpen(true);
  };

  return (
    <>
      <NavBar />
      <div className="profilepage-container">
        <div className="upper-container">
          <div className="upper-container-top">
            <div className="background-photo" style={{ height: 400 }}></div>
          </div>
        </div>
        <div className="upper-container-bottom">
          <div className="profile-picture-spot">
            <FaUserCircle size={200} className="default-profile" />
          </div>
          <div className="user-username">{userName}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginRight: "30%",
          }}
        >
          <Friends />
        </div>
        <div>
          <div className="under-upper-container">
            <div className="post-add-friend">
              <div
                className={`posts-button-pp ${
                  postOpen ? "active" : "inactive"
                }`}
                style={{
                  padding: "3px 3px 20px",
                  display: "flex",
                  justifyItems: "center",
                  alignItems: "center",
                }}
                onClick={handlePosts}
              >
                Posts
              </div>
              <div style={{ width: "15px" }}></div>
              <div
                className={`friends-button-pp ${
                  friendOpen ? "active" : "inactive"
                }`}
                style={{
                  padding: "3px 3px 20px",
                  display: "flex",
                  justifyItems: "center",
                  alignItems: "center",
                }}
                onClick={handleFriends}
              >
                Friends
              </div>
              {/* <Friends currentUser={currentUser} /> */}
            </div>
          </div>
          <div>
            <div className={`posts-pp ${postOpen ? "active" : "inactive"}`}>
              {postOpen && <Posts />}
            </div>
            <div className={`friends-pp ${friendOpen ? "active" : "inactive"}`}>
              {friendOpen && <ShowFriends />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
