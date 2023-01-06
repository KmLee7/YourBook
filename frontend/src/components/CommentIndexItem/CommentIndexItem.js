import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteComment } from "../../store/comments";
import EditCommentModal from "../EditComment";

function CommentIndexItem({ comment, post, any }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector(
    ({ entities: { users }, session: { currentUserId } }) =>
      users[currentUserId]
  );
  const posts = useSelector((state) => state.entities.posts);
  const [open, setOpen] = useState(false);

  let menuRef = useRef(null);
  const currentUserId = useSelector((state) => state.session.currentUserId);
  // console.log(currentUserId);
  const comments = useSelector((state) => state.entities.comments);
  // console.log(post.id);
  let username;
  const user = useSelector(({ entities: { users } }) => users[comment.user_id]);

  const handleCommentDelete = (commentId) => {
    if (comment.user_id === currentUser.id) {
      return dispatch(deleteComment(commentId));
    }
  };

  useEffect(() => {
    const handler = (e) => {
      // e.preventDefault();
      // console.log(e.current?.path, "this is the event");
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
              {user.first_name + " " + user.last_name}
            </div>
            <div style={{ fontSize: "14px" }}>{comment.body}</div>
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
                  <div style={{ display: "flex" }}>
                    <EditCommentModal comment={comment} />
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
