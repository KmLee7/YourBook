import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../store/posts";
import CommentIndexItem from "../Comments/CommentIndexItem";
import * as commentsAction from "../../store/comments";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import EditPostFormModal from "../Posts/EditPost";
import { FcLike } from "react-icons/fc";
import Likes from "../Likes";
import { VscComment } from "react-icons/vsc";
import Comments from "../Comments";

function PostIndexItem({ post }) {
  const dispatch = useDispatch();
  let postRef = useRef(null);

  const user = useSelector(({ entities: { users } }) => users[post.user_id]);
  const currentUserId = useSelector((state) => state.session.currentUserId);
  const allComments = useSelector((state) => state.entities.comments);
  const [openTwo, setOpenTwo] = useState(false);
  const allLikes = useSelector((state) => state.entities.likes);
  const tmpCurrentUserId = useSelector((state) => state.session.currentUserId);

  const CommentList = Object.values(allComments)?.map((comment) => {
    return <CommentIndexItem key={comment.id} comment={comment} post={post} />;
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
      <div style={{ marginTop: "8px", marginLeft: "10px" }}>{CommentList}</div>
    </div>
  );
}

export default PostIndexItem;
