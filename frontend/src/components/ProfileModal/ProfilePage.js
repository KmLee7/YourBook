import "./Profile.css";
import { FaUserCircle } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { GrLinkedin } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";
import { CgSearch } from "react-icons/cg";
import PostFormModal from "../PostFormModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as postActions from "../../store/posts";
import * as userActions from "../../store/user";
import { updateUser } from "../../store/user";
import DetailsFormModal from "./Details";
import { Redirect } from "react-router-dom";

function ProfilePage() {
  const [show, setShow] = useState(false);
  const [showBio, setShowBio] = useState(false);
  const [bio, setBio] = useState("");
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.entities.posts);
  const currentUser = useSelector(
    ({ entities: { users }, session: { currentUserId } }) =>
      users[currentUserId]
  );
  let userName;
  if (currentUser) {
    userName = currentUser.first_name + " " + currentUser.last_name;
  }
  useEffect(() => {
    dispatch(postActions.fetchPosts());
  }, []);

  const PostIndexItem = ({ post }) => {
    const user = useSelector(({ entities: { users } }) => users[post.user_id]);
    let username;
    if (user) {
      username = user.first_name + " " + user.last_name;
    }

    return (
      <div className="one-post" key={post.id}>
        <div className="user-logo-name">
          <FaUserCircle size={25} className="default-profile" />
          <div className="line-break1h"></div>
          {username}
        </div>
        <div className="line-break6h"></div>
        <div>{post.content}</div>
      </div>
    );
  };

  const PostList = Object.values(posts)
    .reverse()
    .map((post) => {
      if (currentUser.id === post.user_id) {
        return <PostIndexItem key={post.id} post={post} />;
      }
    });
  let user;
  const handleUpdateBio = (e) => {
    e.preventDefault();
    user = {
      ...currentUser,
      bio,
    };
    dispatch(updateUser(user));
    setShowBio(false);
  };

  return (
    <>
      <div className="Navbar">
        <div className="left-nav">
          <a href="/">
            <SiFacebook
              className="face-logo"
              size={50}
              style={{ color: "black" }}
            />
          </a>
          <div className="line-break1h"></div>
          <div className="nav-search">
            <CgSearch size={20} style={{ color: "black" }} />
            <input
              className="nav-search-bar"
              type="text"
              placeholder="Search Yourbook"
            />
          </div>
        </div>
        <div className="mid-nav">
          <a href="/">
            <FaHome
              className="home-logo"
              size={55}
              style={{ color: "black" }}
            />
          </a>
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
          <a target="" href="">
            <GrLinkedin
              className="link-logo"
              size={48}
              style={{ color: "black" }}
            />
          </a>
        </div>
        <div className="right-nav">
          <FaUserCircle
            className="user-logo"
            size={50}
            color="black"
            onClick={ProfilePage}
          />
        </div>
      </div>
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
        <div className="under-upper-container">Posts</div>
        <div className="lower-container">
          <div className="intro">
            Intro
            <div className="add-bio">
              <div className="bio-content">{bio}</div>
              <div>
                {!showBio ? (
                  <button
                    className="add-bio-button"
                    style={{ width: 295, height: 30 }}
                    onClick={() => {
                      setShowBio(true);
                    }}
                  >
                    {bio ? "Edit bio" : "Add bio"}
                  </button>
                ) : (
                  <div>
                    <input
                      style={{ width: 287, height: 30, textAlign: "center" }}
                      placeholder="Describe who you are"
                      type="text"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                    <div className="button-wrapper1">
                      <button
                        className="cancel-bio-button"
                        style={{ width: 100, height: 30 }}
                        onClick={() => {
                          setShowBio(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="save-bio-button"
                        style={{ width: 80, height: 30 }}
                        onClick={handleUpdateBio}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="edit-details">
              {/* <div className="details-list">
                {currentUser.work ? currentUser.work : ""}{" "}
                {currentUser.highschool ? currentUser.highschool : ""}{" "}
                {currentUser.college ? currentUser.college : ""}
                {currentUser.city ? currentUser.city : ""}{" "}
                {currentUser.hometown ? currentUser.hometown : ""}{" "}
                {currentUser.relationship ? currentUser.relationship : ""}
              </div> */}
              <DetailsFormModal />
            </div>
            <div className="add-hobbies">
              <button
                className="add-hobbies-button"
                style={{ width: 295, height: 29 }}
              >
                Add hobbies
              </button>
            </div>
            <div className="add-featured">
              <button
                className="add-featured-button"
                style={{ width: 295, height: 29 }}
              >
                Add featured
              </button>
            </div>
          </div>

          <div className="profilepage-posts">
            <div style={{ width: 10, height: 20 }}></div>
            <div className="post-form">
              <div className="upper">
                <FaUserCircle size={33} className="default-profile" />
                <div className="line-break1h"></div>
                <div className="post-form-button">
                  <PostFormModal />
                </div>
              </div>
              <div className="line-break4h"></div>
              <div className="border-line1h"></div>
              {/* Work on after graduation */}
              {/* <div className="bottom">
                  <div>Live Video</div>
                  <div>Photo/video</div>
                  <div>Feeling/activity</div>
                </div> */}
            </div>
            <div className="line-break5h"></div>
            <div className="all-posts">
              <div>{PostList}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
