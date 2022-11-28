import "./HomePage.css";
import { logout } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import PostFormModal from "../PostFormModal/index";
import { useEffect } from "react";
import * as postActions from "../../store/posts";
import { CgSearch } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { GrLinkedin } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";
import { Route, Link, Redirect, useHistory } from "react-router-dom";
import ProfileModal from "../ProfileModal/index";
import ProfilePage from "../ProfileModal/ProfilePage";
import { deletePost, updatePost } from "../../store/posts";

function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.entities.posts);
  const history = useHistory();
  const currentUser = useSelector(
    ({ entities: { users }, session: { currentUserId } }) =>
      users[currentUserId]
  );

  let userName;
  if (currentUser) {
    userName = currentUser.first_name + " " + currentUser.last_name;
  }
  console.log(currentUser, "thistststist current user");

  useEffect(() => {
    dispatch(postActions.fetchPosts());
  }, []);
  const PostList = Object.values(posts)
    .reverse()
    .map((post) => {
      return <PostIndexItem key={post.id} post={post} />;
    });
  const handleClick = (e) => {
    e.preventDefault();
    history.push(`/ProfilePage/${currentUser.id}`);
  };
  const handleHomeClick = (e) => {
    e.preventDefault();
    history.push("/");
  };
  return (
    <>
      <div className="Navbar">
        <div className="left-nav">
          <button onClick={handleHomeClick}>
            <SiFacebook
              className="face-logo"
              size={50}
              style={{ color: "black" }}
            />
          </button>

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
          <button onClick={handleHomeClick}>
            <FaHome
              className="home-logo"
              size={55}
              style={{ color: "black" }}
            />
          </button>
          <div className="line-break7h"></div>
          <a target="_blank" href="https://github.com/KmLee7/YourBook">
            <FiGithub
              className="github-logo"
              size={50}
              style={{ width: "55px" }}
              color={"black"}
            />
          </a>
          <div className="line-break7h"></div>
          <a
            target="_blank"
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
          <FaUserCircle className="user-logo1" size={50} color="black" />
        </div>
      </div>
      <div className="home-containers">
        <div className="left-container1">
          <button className="left-profile-button" onClick={handleClick}>
            <div className="first-left-con">
              <FaUserCircle size={36} />
              <div style={{ width: "15" }}></div>
              <div className="user-username1">
                {currentUser &&
                  currentUser.first_name + " " + currentUser.last_name}
              </div>
            </div>
          </button>
          {/* <div>Find friends</div>
          <div>Welcome</div>
          <div>Groups</div>
          <div>Marketplace</div>
          <div>Watch</div>
          <div>Memories</div>
          <div>Saved</div>
          <div>Pages</div>
          <div>News</div>
          <div>Events</div>
          <div>See more drop down</div> */}
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
          <div></div>
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
  const dispatch = useDispatch();
  const user = useSelector(({ entities: { users } }) => users[post.user_id]);
  const currentUser = useSelector(
    ({ entities: { users }, session: { currentUserId } }) =>
      users[currentUserId]
  );
  let username;
  if (user) {
    username = user.first_name + " " + user.last_name;
  }
  const handleDelete = (postId) => {
    if (post.user_id === currentUser.id) {
      return dispatch(deletePost(postId));
    }
  };
  const handleEdit = (post) => {
    if (post.user_id === currentUser.id) {
      return dispatch(updatePost(post));
    }
  };
  return (
    <div className="one-post" key={post.id}>
      <div className="user-logo-name">
        <FaUserCircle size={25} />
        <div className="line-break1h"></div>
        {username}
      </div>
      <div className="line-break6h"></div>
      <div>{post.content}</div>
      <div className="edit-delete-buttonss">
        <button className="editPost-button" onClick={() => handleEdit(post)}>
          Edit
        </button>
        <div className="line-break9h"></div>
        <button
          className="deletePost-button"
          onClick={() => handleDelete(post.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Home;
