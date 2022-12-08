import "./HomePage.css";
import { logout } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import PostFormModal from "../PostFormModal/index";
import { useEffect, useRef, useState } from "react";
import * as postActions from "../../store/posts";
import { CgSearch } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { GrLinkedin } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";
import {
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import ProfileModal from "../ProfileModal/index";
import ProfilePage from "../ProfileModal/ProfilePage";
import { deletePost, updatePost } from "../../store/posts";
import RightProfile from "../RightProfileModal/RightProfile";
import RightProfileModal from "../RightProfileModal";
// import SearchUser from "../SearchUser/SearchUser";
import SearchBar from "../SearchUser/SearchUser";
import PostForm from "../PostFormModal/PostForm";
import "../PostFormModal/PostForm.css";
import EditPostFormModal from "../EditPost";
import Comments from "../Comments";

function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.entities.posts);
  const comments = useSelector((state) => state.entities.comments);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  let menuRef = useRef();
  const currentUser = useSelector(
    ({ entities: { users }, session: { currentUserId } }) =>
      users[currentUserId]
  );

  let userName;
  if (currentUser) {
    userName = currentUser.first_name + " " + currentUser.last_name;
  }
  // console.log(currentUser, "thistststist current user");
  ///Search function
  const users = useSelector((state) => state.entities.users);
  let tempUsers = Object.values(users);
  console.log(tempUsers);
  let names = [];
  for (let i = 0; i < tempUsers.length; i++) {
    names.push(tempUsers[i].first_name);
  }
  ///

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
  // const handleClick2 = (e) => {
  //   e.preventDefault();
  //   history.push(`/ProfilePage/${currentUser.id}`);
  // };
  const handleHomeClick = (e) => {
    e.preventDefault();
    history.push("/");
  };
  // dropdown code here
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
      return;
    };
    document.addEventListener("mousedown", handler);
  });
  //search functionality

  return (
    <>
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

          <div className="line-break1h"></div>
          {/* <div className="nav-search"> */}
          {/* <CgSearch size={20} style={{ color: "black" }} /> */}
          {/* <input
              className="nav-search-bar"
              type="search"
              placeholder="Search Yourbook"
            /> */}
          {/* <Route path="/search"> */}
          {/* </Route> */}
          <SearchBar placeholder="Search yourbook" data={tempUsers} />
          {/* </div> */}
        </div>
        <div className="mid-nav">
          <button
            style={{ border: "1px solid white", backgroundColor: "white" }}
            onClick={handleHomeClick}
          >
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
          {/* <button
            onClick={() => {
              <RightProfileModal />;
            }}
          >
            <FaUserCircle className="user-logo1" size={50} color="black" />
          </button> */}
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
                  onClick={(e) => {
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
              <button
                style={{ border: "1px solid white", backgroundColor: "white" }}
              >
                <FaUserCircle size={33} />
              </button>
              {/* <button
                className="rightProfileButton"
                onClick={() => setShowModal(true)}
              >
                <FaUserCircle size={33} />
              </button>
              {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                  <RightProfileButton />
                </Modal>
              )} */}
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
          {/* Comments testing here */}
          <div>
            <Comments />
          </div>
        </div>
      </div>
    </>
  );
}

const PostIndexItem = ({ post }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(({ entities: { users } }) => users[post.user_id]);
  const currentUser = useSelector(
    ({ entities: { users }, session: { currentUserId } }) =>
      users[currentUserId]
  );
  const currentUserId = useSelector((state) => state.session.currentUserId);
  console.log(currentUserId);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [tempBoo, setTempBoo] = useState(false);
  const comments = useSelector((state) => state.entities.comments);
  console.log(comments, "These are the comments from postIndexItem");
  let username;
  if (user) {
    username = user.first_name + " " + user.last_name;
  }

  const handleDelete = (postId) => {
    if (post.user_id === currentUser.id) {
      return dispatch(deletePost(postId));
    }
  };
  const CommentList = Object.values(comments).map((comment) => {
    return <CommentIndexItem key={comment.id} comment={comment} />;
  });
  // if (post.user_id !== currentUser.id) {
  //   //   tempBoo = true;
  //   // } else {
  //   //   tempBoo = false;
  //   setTempBoo(false);
  // } else {
  //   setTempBoo(true);
  // }
  // const handleEdit = (post) => {
  //   console.log(post.content, "hello");
  //   if (post.user_id === currentUser.id) {
  //     console.log("its true");
  //     // return dispatch(updatePost(post));
  //   }
  // };
  return (
    <>
      <div className="one-post" key={post.id}>
        {/* <div className="user-logo-name"> */}
        <button
          style={{
            width: "520px",
            border: "1px solid white",
            background: "white",
            display: "flex",
          }}
          onClick={(e) => {
            e.preventDefault();
            history.push(`/ProfilePage/${post.user_id}`);
          }}
        >
          <div className="user-logo-name">
            <FaUserCircle size={25} />
            <div className="line-break1h"></div>
            {username}
            <div style={{ width: "10px" }}></div>
          </div>
        </button>
        {/* </div> */}
        <div className="line-break6h"></div>
        <div style={{ paddingLeft: "10px" }}>{post.content}</div>
        <div>{CommentList}</div>
        {/* <div className="edit-delete-buttonss">
          <button
            className="editPost-button"
            onClick={() => {
              setToggleEdit(true);
            }}
          >
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
        <button
          onClick={() => {
            setToggleEdit(false);
          }}
        >
          Edit
        </button> */}
        {/* Comments testing here */}
        <div>
          <Comments />
        </div>
        {currentUserId === post.user_id && (
          <div className="edit-delete-buttonss">
            {/* {toggleEdit && <EditPostFormModal />} */}
            {/* <div
            className="editPost-button"
            onClick={() => {
              setToggleEdit(true);
            }}
          >
            Edit
          </div> */}
            <div>
              {/* {currentUser.id === post.user_id && ( */}
              <EditPostFormModal post={post} />
            </div>
            <div className="line-break9h"></div>
            <button
              className="deletePost-button"
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </button>
          </div>
        )}
        {/* <button
          onClick={() => {
            setToggleEdit(false);
          }}
        >
          Edit
        </button> */}
      </div>
      {/* {toggleEdit && <PostForm post={toggleEdit} />} */}
    </>
  );
};
const CommentIndexItem = ({ comment }) => {
  const history = useHistory();
  const currentUser = useSelector(
    ({ entities: { users }, session: { currentUserId } }) =>
      users[currentUserId]
  );
  const currentUserId = useSelector((state) => state.session.currentUserId);
  console.log(currentUserId);

  const comments = useSelector((state) => state.entities.comments);

  let username;
  return (
    <>
      <div>{comment.body}</div>
    </>
  );
};

export default Home;
