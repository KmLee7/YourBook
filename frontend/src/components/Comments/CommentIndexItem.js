import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteComment } from "../../store/comments";
import EditComment from "./EditComment";

import * as commentActions from "../../store/comments";

function CommentIndexItem({ id, comment, post }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector(
    ({ entities: { users }, session: { currentUserId } }) =>
      users[currentUserId]
  );
  const posts = useSelector((state) => state.entities.posts);
  const [open, setOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentBody, setCommentBody] = useState(comment.body);

  let menuRef = useRef(null);
  const currentUserId = useSelector((state) => state.session.currentUserId);
  const comments = useSelector((state) => state.entities.comments);
  let username;
  const user = useSelector(({ entities: { users } }) => users[comment.user_id]);

  const handleCommentDelete = (commentId) => {
    if (comment.user_id === currentUser.id) {
      return dispatch(deleteComment(commentId));
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef?.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  return (
    <>
      {post.id === comment.post_id && (
        <div
          style={{
            textIndent: "7px",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <FaUserCircle size={30} /> &nbsp;
          <div
            className="comment-username"
            style={{
              backgroundColor: "rgb(244, 242, 242)",
              marginTop: "31",
              borderRadius: "18px",
            }}
          >
            <div
              style={{
                marginBottom: "5px",
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              {user && user.first_name + " " + user.last_name}
            </div>
            {/* <div
              className="comment-body"
              id={`comment-body ${comment.id}`}
              style={{ fontSize: "14px" }}
            >
              {comment.body}
            </div> */}

            <form
              className={`comment-body ${commentOpen ? "active" : "inactive"}`}
            >
              <input
                className="comment-body"
                id={`comment-body ${comment.id}`}
                style={{
                  fontSize: "14px",
                  border: "none",
                  backgroundColor: "rgb(240, 242, 245)",
                  textIndent: "2px",
                }}
                type="text"
                value={commentBody}
                onChange={(e) => {
                  const newcomment = {
                    id: comment.id,
                    body: e.target.value,
                    post_id: comment.post_id,
                    user_id: comment.user_id,
                  };
                  dispatch(commentActions.updateComment(newcomment));
                  setCommentBody(e.target.value);
                }}
              />
            </form>
          </div>
          <div className="edit-delete-container" ref={menuRef}>
            <button
              className="drop-down-edit-delete-comment-trigger"
              onClick={(e) => {
                setOpen(!open);
              }}
            >
              <HiDotsHorizontal style={{ width: "50px" }} />
            </button>

            {currentUserId === comment.user_id ? (
              <div
                className={`edit-delete-comment-buttonss ${
                  open ? "active" : "inactive"
                }`}
              >
                <div className="edit-delete-comments-container">
                  <div
                    onClick={(e) => {
                      setCommentOpen(!commentOpen);
                      setOpen(!open);
                    }}
                  >
                    <EditComment comment={comment} />
                  </div>
                  <div style={{ height: "5px" }}></div>
                  <button
                    className="deleteComment-button"
                    onClick={() => {
                      handleCommentDelete(comment.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="edit-delete-comment-buttonss">
                <div style={{ height: "48px" }}></div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CommentIndexItem;
