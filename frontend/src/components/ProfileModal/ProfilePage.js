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
import { deletePost, updatePost } from "../../store/posts";
import { useHistory, useParams } from "react-router-dom";
import { logout } from "../../store/session";
import { useRef } from "react";
import EditPostFormModal from "../EditPost";
import Friends from "../Friends";
import * as commentsAction from "../../store/comments";
import CommentIndexItem from "../CommentIndexItem/CommentIndexItem";
import SearchBar from "../SearchUser/SearchUser";
import { HiDotsHorizontal } from "react-icons/hi";
import { FcLike } from "react-icons/fc";
import Likes from "../Likes";
import { VscComment } from "react-icons/vsc";
import Comments from "../Comments";

function ProfilePage() {
  const [open, setOpen] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);
  let postRef = useRef(null);
  const [show, setShow] = useState(false);
  const [showBio, setShowBio] = useState(false);
  const [bio, setBio] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const posts = useSelector((state) => state.entities.posts);
  const tmpCurrentUserId = useSelector((state) => state.session.currentUserId);
  const history = useHistory();
  const tempcurrentUser = useSelector(
    ({ entities: { users }, session: { currentUserId } }) =>
      users[currentUserId]
  );
  console.log(tempcurrentUser, "this is the temp current user");
  let currentUser = useSelector((state) => {
    return state.entities.users[id];
  });
  let userName;
  if (currentUser) {
    userName = currentUser.first_name + " " + currentUser.last_name;
  }

  useEffect(() => {
    dispatch(postActions.fetchPosts());
  }, []);

  const PostIndexItem = ({ post }) => {
    const user = useSelector(({ entities: { users } }) => users[post.user_id]);
    const currentUserId = useSelector((state) => state.session.currentUserId);
    const allComments = useSelector((state) => state.entities.comments);
    const [openTwo, setOpenTwo] = useState(false);
    const allLikes = useSelector((state) => state.entities.likes);

    const CommentList = Object.values(allComments)?.map((comment) => {
      return (
        <CommentIndexItem key={comment.id} comment={comment} post={post} />
      );
    });

    let username;
    if (user) {
      username = user.first_name + " " + user.last_name;
    }
    const handleDelete = (postId) => {
      if (post.user_id === tmpCurrentUserId) {
        return dispatch(deletePost(postId));
      }
    };
    const handleEdit = (post) => {
      if (post.user_id === tmpCurrentUserId) {
        return dispatch(updatePost(post));
      }
    };
    useEffect(() => {
      dispatch(commentsAction.fetchComments());
    }, []);
    let count = 0;
    let oneLikeCount = Object.values(allLikes).map((like) => {
      if (like.liked && like.post_id === post.id) {
        count += 1;
      }
      return count;
    });
    useEffect(() => {
      let handlerTwo = (e) => {
        if (!postRef?.current?.contains(e.target)) {
          setOpenTwo(false);
        }
      };
      document.addEventListener("mousedown", handlerTwo);

      return () => {
        document.removeEventListener("mousedown", handlerTwo);
      };
    }, []);

    return (
      <div className="one-post-profile" key={post.id}>
        <div className="one-post-profile-container">
          <div className="user-logo-name-profile">
            <FaUserCircle size={25} />
            <div className="line-break1h"></div>
            {username}
          </div>
          <div style={{ width: "150px" }}></div>
          <div
            className="edit-delete-container"
            style={{ width: "50px", justifyContent: "flex-end" }}
            ref={postRef}
          >
            <button
              className="drop-down-edit-delete-trigger"
              onClick={() => {
                setOpenTwo(!openTwo);
              }}
            >
              <HiDotsHorizontal style={{ width: "50px" }} />
            </button>

            {currentUserId === post.user_id && (
              <div
                className={`edit-delete-buttonss ${
                  openTwo ? "active" : "inactive"
                }`}
              >
                <div className="edit-delete-post-container">
                  <div>
                    <EditPostFormModal post={post} />
                  </div>
                  <div style={{ height: "5px" }}></div>
                  <button
                    className="deletePost-button"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>{post.content}</div>
        {count === 0
          ? null
          : count === 1 && (
              <div className="one-post-likes">
                <FcLike size={16} />
                <div style={{ width: "5px" }}></div>
                {count} Like
              </div>
            )}
        {count > 1 && (
          <div className="one-post-likes">
            <FcLike size={16} />
            <div style={{ width: "5px" }}></div>
            {count} Likes
          </div>
        )}
        <div
          style={{
            width: "515px",
            border: "1px solid lightgray",
            marginTop: "10px",
          }}
        ></div>
        <div className="under-post-above-comment">
          <div className="post-likes">
            <Likes postId={post.id} />
          </div>

          <div
            className="post-comment"
            key={post.id}
            onClick={() => {
              let inputs = document.getElementsByClassName("comment-content");
              Object.values(inputs).map((input) => {
                let commentPostId = input.id.split("comment-content ")[1];
                if (commentPostId === `${post.id}`) {
                  input.focus();
                }
              });
            }}
          >
            <VscComment size={22} /> <div style={{ width: "10px" }}></div>
            <div style={{ fontSize: "20px" }}>Comment</div>
          </div>
        </div>
        <div
          style={{
            width: "515px",
            border: "1px solid lightgray",
            marginBottom: "10px",
          }}
        ></div>
        <div className="write-a-commment-component">
          <Comments postId={post.id} />
        </div>
        <div style={{ height: "5px" }}></div>
        <div style={{ marginTop: "8px", marginLeft: "10px" }}>
          {CommentList}
        </div>
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
  const handleHomeClick = (e) => {
    e.preventDefault();
    history.push("/");
  };
  let menuRef = useRef(null);
  const users = useSelector((state) => state.entities.users);
  let tempUsers = Object.values(users);
  // console.log(tempUsers);
  let names = [];
  for (let i = 0; i < tempUsers.length; i++) {
    names.push(tempUsers[i].first_name);
  }

  useEffect(() => {
    let handlerThree = (e) => {
      if (!menuRef?.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handlerThree);

    return () => {
      document.removeEventListener("mousedown", handlerThree);
    };
  }, []);

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
          <div className="nav-search-profile">
            <SearchBar
              className="search-bar"
              placeholder="Search yourbook"
              data={tempUsers}
            />
          </div>
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
                  history.push(`/ProfilePage/${tempcurrentUser.id}`);
                }}
              >
                <div className="first-left-con">
                  <FaUserCircle size={36} />
                  <div style={{ width: "15" }}></div>
                  <div className="user-username1">
                    {tempcurrentUser &&
                      tempcurrentUser.first_name +
                        " " +
                        tempcurrentUser.last_name}
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
        <div className="under-upper-container">
          Posts
          <div style={{ width: "15px" }}></div>
          <Friends currentUser={currentUser} />
        </div>

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
            <div className="post-form-profile">
              <div className="upper">
                <FaUserCircle size={33} className="default-profile" />
                <div className="line-break1h"></div>
                <div className="post-form-button">
                  <PostFormModal />
                </div>
              </div>
              <div className="line-break4h"></div>
              <div className="border-line1h"></div>
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
