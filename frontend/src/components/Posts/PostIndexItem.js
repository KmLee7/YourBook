import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Comments from "../Comments";
import * as commentActions from "../../store/comments";
import CommentIndexItem from "../Comments/CommentIndexItem";
import { deletePost } from "../../store/posts";
import Likes from "../Likes";
import { VscComment } from "react-icons/vsc";
import { FcLike } from "react-icons/fc";
import EditPostFormModal from "./EditPost";

function PostIndexItem({ key, post }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(({ entities: { users } }) => users[post.user_id]);
  const allPosts = useSelector((state) => state.entities.posts);

  const currentUser = useSelector(
    ({ entities: { users }, session: { currentUserId } }) =>
      users[currentUserId]
  );
  const currentUserId = useSelector((state) => state.session.currentUserId);
  const allLikes = useSelector((state) => state.entities.likes);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [open, setOpen] = useState(false);
  let menuRef = useRef(null);
  // new code
  const [any, setAny] = useState(false);

  const comments = useSelector((state) => state.entities.comments);
  let username;
  if (user) {
    username = user.first_name + " " + user.last_name;
  }
  // For comments
  useEffect(() => {
    dispatch(commentActions.fetchComments());
  }, []);

  const handleDelete = (postId) => {
    if (post.user_id === currentUser.id) {
      return dispatch(deletePost(postId));
    }
  };
  useEffect(() => {
    let handlerTwo = (e) => {
      if (!menuRef?.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handlerTwo);

    return () => {
      document.removeEventListener("mousedown", handlerTwo);
    };
  }, []);
  // For Likes count
  let count = 0;
  let oneLikeCount = Object.values(allLikes).map((like) => {
    if (like.liked && like.post_id === post.id) {
      count += 1;
    }
    return count;
  });

  const CommentList = Object.values(comments).map((comment) => {
    return <CommentIndexItem id={comment.id} comment={comment} post={post} />;
  });
  const handleCommentClick = (post) => {
    setAny(post);
  };

  return (
    <>
      <div className="one-post" key={post.id}>
        <div className="one-post-top">
          <button
            style={{
              width: "40%",
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

          <div className="edit-delete-container" ref={menuRef}>
            <button
              className="drop-down-edit-delete-trigger"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <HiDotsHorizontal style={{ width: "50px" }} />
            </button>
            {currentUserId === post.user_id && (
              <div
                className={`edit-delete-buttonss ${
                  open ? "active" : "inactive"
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
        <div className="line-break6h"></div>
        <div className="one-post-bottom" style={{ paddingLeft: "10px" }}>
          {post.content}
        </div>
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
          {/* <div style={{ height: "14px", border: "1px solid lightgray" }}></div> */}
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
        <div>
          {/* {Object.values(comments).map((comment) => {
            return (
              <CommentIndexItem
                key={comment.id}
                comment={comment}
                post={post}
              />
            );
          })} */}
          {CommentList}
        </div>
      </div>
    </>
  );
}

export default PostIndexItem;
