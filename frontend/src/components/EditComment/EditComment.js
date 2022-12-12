import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as commentActions from "../../store/comments";
import "./EditComment.css";
import { FaUserCircle } from "react-icons/fa";
import Comments from "../Comments";

function EditComment({ setShowModal, comment }) {
  const dispatch = useDispatch();
  const [body, setBody] = useState(comment.body);
  const userId = useSelector((state) => state.session.currentUserId);
  const posts = useSelector((state) => state.entities.posts);
  // console.log(post);
  const currentUser = useSelector(
    ({ entities: { users }, session: { currentUserId } }) =>
      users[currentUserId]
  );

  let userName;
  if (currentUser) {
    userName = currentUser.first_name + " " + currentUser.last_name;
  }
  const handleEditComment = (e) => {
    e.preventDefault();
    const newcomment = {
      id: comment.id,
      body: body,
      post_id: comment.post_id,
      user_id: comment.user_id,
    };
    dispatch(commentActions.updateComment(newcomment)).then(() => {
      setBody("");
      setShowModal(false);
    });
  };

  return (
    <>
      <form className="comment-modal" onSubmit={handleEditComment}>
        <input
          id="comment-content"
          type="text"
          placeholder="What's on your mind?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </form>
    </>
  );
}

export default EditComment;
