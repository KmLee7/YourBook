import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Comments from "../Comments";
import EditPostFormModal from "../EditPost";
import * as commentActions from "../../store/comments";
import CommentIndexItem from "../CommentIndexItem/CommentIndexItem";
import { deletePost } from "../../store/posts";

function PostIndexItem({ post }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(({ entities: { users } }) => users[post.user_id]);

  const currentUser = useSelector(
    ({ entities: { users }, session: { currentUserId } }) =>
      users[currentUserId]
  );
  const currentUserId = useSelector((state) => state.session.currentUserId);
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
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handlerTwo);

    return () => {
      document.removeEventListener("mousedown", handlerTwo);
    };
  }, []);
  const handleFocus = () => {
    document.getElementById("comment-content").focus();
    // document.getElementsByClassName("comment-form").focus();
  };
  const CommentList = Object.values(comments).map((comment) => {
    return <CommentIndexItem key={comment.id} comment={comment} post={post} />;
  });
  const handleCommentClick = (post) => {
    // e.preventDefault();
    setAny(post);
    // console.log(post, "hits here");
  };

  return (
    <>
      <div className="one-post" key={post.id}>
        {/* <div className="user-logo-name"> */}
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
          {/* <div style={{ width: "50px" }}></div> */}
          <div className="edit-delete-container" ref={menuRef}>
            <button
              className="drop-down-edit-delete-trigger"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <HiDotsHorizontal style={{ width: "50px" }} />
            </button>
            {/* <div style={{ width: "600px" }}></div> */}
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
        <div
          style={{
            width: "515px",
            border: "1px solid lightgray",
            marginTop: "10px",
          }}
        ></div>
        <div className="under-post-above-comment">
          <div className="post-likes">Like</div>
          {/* <div style={{ height: "14px", border: "1px solid lightgray" }}></div> */}
          <div
            className="post-comment"
            key={post.id}
            onClick={
              () => document.getElementById("comment-content").focus()
              // console.log(post.id);
            }
          >
            Comment
          </div>
        </div>
        <div
          style={{
            width: "515px",
            border: "1px solid lightgray",
            marginBottom: "10px",
          }}
        ></div>
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
        <div className="write-a-commment-component">
          <Comments postId={post.id} />
          {/* {!any ? (
            <input
              style={{
                width: "97%",
                height: "30px",
                border: "none",
                borderRadius: "20px",
                backgroundColor: "rgb(244, 242, 242)",
                textIndent: "15px",
                fontSize: "18px",
                marginBottom: "10px",
              }}
              id="comment-content"
              // id= {`comment-content ${postId}`}
              type="text"
              placeholder="Write a comment..."
              //   value={body}
              //   autoFocus={true}
            />
          ) : null} */}
        </div>
        {/* <div>{CommentList}</div> */}
        <div>
          {Object.values(comments).map((comment) => {
            return (
              <CommentIndexItem
                key={comment.id}
                any={any}
                comment={comment}
                post={post}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default PostIndexItem;
