import "./Profile.css";
import { FaUserCircle } from "react-icons/fa";
import PostFormModal from "../Posts/PostFormModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as postActions from "../../store/posts";
import { updateUser } from "../../store/user";
import DetailsFormModal from "./Details";
import { deletePost, updatePost } from "../../store/posts";
import { useHistory, useParams } from "react-router-dom";
import { useRef } from "react";
// import EditPostForm from "../Posts/EditPostForm";
import * as commentsAction from "../../store/comments";
import CommentIndexItem from "../Comments/CommentIndexItem";
import { HiDotsHorizontal } from "react-icons/hi";
import { FcLike } from "react-icons/fc";
import Likes from "../Likes";
import { VscComment } from "react-icons/vsc";
import Comments from "../Comments";
import NavBar from "../NavBar";
import EditPostFormModal from "../Posts/EditPost";
import PostIndexItem from "./PostIndexItem";
import * as userActions from "../../store/user";
import Bio from "./Bio";

function Posts() {
  const [open, setOpen] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);
  const [show, setShow] = useState(false);
  const [showBio, setShowBio] = useState(false);
  const [biog, setBiog] = useState("");
  const [openBio, setOpenBio] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const posts = useSelector((state) => state.entities.posts);
  const tmpCurrentUserId = useSelector((state) => state.session.currentUserId);
  const history = useHistory();

  const tempcurrentUser = useSelector(
    ({ entities: { users }, session: { currentUserId } }) =>
      users[currentUserId]
  );
  // console.log(tempcurrentUser, "this is the temp current user");
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

  const PostList = Object.values(posts)
    .reverse()
    .map((post) => {
      if (currentUser.id === post.user_id) {
        return <PostIndexItem key={post.id} post={post} />;
      }
    });
  let user;

  const currentUserId = useSelector((state) => state.session.currentUserId);
  const profilePageId = Number(
    history.location.pathname.split("/ProfilePage/")[1]
  );
  const profileOwner = useSelector(
    (state) => state.entities.users[profilePageId]
  );
  // console.log(profileOwner, "profileOwner");
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
  console.log(profileOwner?.work, "from profile page post");

  return (
    <>
      <div className="profilepage-container">
        <div className="lower-container">
          {currentUserId === profilePageId ||
          profileOwner?.bio ||
          profileOwner?.work ||
          profileOwner?.highschool ||
          profileOwner?.college ||
          profileOwner?.city ||
          profileOwner?.hometown ||
          profileOwner?.relationship ? (
            <div className="intro">
              <div style={{ fontSize: "20px", fontWeight: "700" }}>Intro</div>
              <div className="introWrapper">
                <Bio />
                <div style={{ height: "10px" }}></div>
                <div style={{}}>{profileOwner?.work && profileOwner.work}</div>
                <div>{profileOwner?.highschool && profileOwner.highschool}</div>
                <div>{profileOwner?.college && profileOwner.college}</div>
                <div>{profileOwner?.city && profileOwner.city}</div>
                <div>{profileOwner?.hometown && profileOwner.hometown}</div>
                <div>
                  {profileOwner?.relationship && profileOwner.relationship}
                </div>

                <div style={{ height: "10px" }}></div>
                <DetailsFormModal />
              </div>
            </div>
          ) : (
            <div className="introTwo">
              <div style={{ fontSize: "20px", fontWeight: "700" }}>Intro</div>
            </div>
          )}
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

export default Posts;
