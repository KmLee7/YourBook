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
          <FaUserCircle size={25} />
          <div className="line-break1h"></div>
          {username}
        </div>
        <div className="line-break6h"></div>
        {/* <img src={post.photo} width="50px" alt="dfs" /> */}
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

  return (
    <>
      <div className="Navbar">
        <div className="left-nav">
          <SiFacebook
            className="face-logo"
            size={50}
            style={{ color: "black" }}
          />
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
            {/* <img
          src="https://img.icons8.com/plasticine/100/000000/github-squared.png"
          width="50px"
          alt="github-logo"
        /> */}
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
            <div className="hi" style={{ height: 400 }}>
              hi
            </div>
          </div>
        </div>
        <div className="upper-container-bottom">
          <div className="hey">
            <FaUserCircle size={200} />
          </div>
          <div className="hello">{userName}</div>
        </div>
        <div className="under-upper-container">Posts</div>
        <div className="lower-container">
          <div className="intro">
            Intro
            <div className="add-bio">
              {!showBio ? (
                <button
                  style={{ width: 295, height: 30 }}
                  onClick={() => {
                    setShowBio(true);
                  }}
                >
                  Add Bio
                </button>
              ) : (
                <div>
                  <input
                    style={{ width: 287, height: 30 }}
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                  {/* <button
                    style={{ width: 100, height: 30 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      setBio("");
                    }}
                  ></button> */}
                </div>
              )}
            </div>
            <div className="edit-details">
              <button style={{ width: 295, height: 29 }}>Edit details</button>
            </div>
            <div className="add-hobbies">
              <button style={{ width: 295, height: 29 }}>Add hobbies</button>
            </div>
            <div className="add-featured">
              <button style={{ width: 295, height: 29 }}>Add featured</button>
            </div>
          </div>

          <div className="profilepage-posts">
            <div style={{ width: 10, height: 20 }}> heyo</div>
            <div className="post-form">
              <div className="upper">
                <FaUserCircle size={33} />
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
