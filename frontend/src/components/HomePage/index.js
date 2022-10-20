import "./HomePage.css";
import { logout } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import PostFormModal from "../PostFormModal/index";
import { useEffect } from "react";
import * as postActions from "../../store/posts";
import searchLogo from "./images/icons8-search-48.png";
import { FaUserCircle } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { GrLinkedin } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";
import { Route, Redirect } from "react-router-dom";
import ProfileModal from "../ProfileModal/index";

function Home() {
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

  const PostList = Object.values(posts)
    .reverse()
    .map((post) => {
      return <PostIndexItem key={post.id} post={post} />;
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
            <img src={searchLogo} width="20px" alt="search-log" />
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
          <button className="profilemenu-button">
            <FaUserCircle className="user-logo" size={50} color="black" />
          </button>
        </div>
      </div>
      <div className="home-containers">
        <div className="left-container1">
          <div className="first-left-con">
            <FaUserCircle size={36} />
            <div style={{ width: "15" }}></div>
            <div className="user-username">
              {currentUser &&
                currentUser.first_name + " " + currentUser.last_name}
            </div>
          </div>
          {/* <div>{userName}</div> */}
          <div>Find friends</div>
          <div>Welcome</div>
          <div>Groups</div>
          <div>Marketplace</div>
          <div>Watch</div>
          <div>Memories</div>
          <div>Saved</div>
          <div>Pages</div>
          <div>News</div>
          <div>Events</div>
          <div>See more drop down</div>
        </div>
        <div className="mid-container1">
          {/* <div className="feed-top">
            <div>Stories</div>
            <div className="line-break1"></div>
            <div>Reels</div>
            <div className="line-break1"></div>
            <div>Rooms</div>
          </div>
          <div className="feed-bottom">
            <div> Information </div>
          </div> */}
          <div className="line-break2h"></div>
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
        <div className="right-container1">
          <div>this is the right container1</div>
          <button
            onClick={() => {
              dispatch(logout());
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

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

export default Home;
