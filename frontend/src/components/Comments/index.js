import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as commentActions from "../../store/comments";

function Comments({ postId }) {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const { id } = useParams();
  const currentUserId = useSelector((state) => state.session.currentUserId);
  const comments = useSelector((state) => state.entities.comments);
  const tempcurrentUser = useSelector(
    ({ entities: { users }, session: { currentUserId } }) =>
      users[currentUserId]
  );
  const posts = useSelector((state) => state.entities.posts);
  // console.log(posts);
  let currentUser = useSelector((state) => {
    return state.entities.users[id];
  });
  // console.log(comments, "this comment");
  // console.log(tempcurrentUser, "this current user");
  const postList = Object.values(posts);
  // console.log(postList);
  // console.log(currentUserId);
  // console.log(postId, "wish");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newcomment = {
      body: body,
      post_id: postId,
      user_id: currentUserId,
    };
    dispatch(commentActions.createComment(newcomment)).then(() => {
      setBody("");
    });
  };

  return (
    <>
      <form className="comment-form" onSubmit={handleSubmit}>
        <div>Write a comment</div>
        <input
          style={{ width: "50px" }}
          id="comment-content"
          type="text"
          placeholder="Write a comment"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">Comment</button>
      </form>
    </>
  );
}

export default Comments;
