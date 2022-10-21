import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postActions from "../../store/posts";
import "./PostForm.css";
import { FaUserCircle } from "react-icons/fa";

function PostForm({ setShowModal }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const userId = useSelector((state) => state.session.currentUserId);
  const posts = useSelector((state) => state.entities.posts);
  const currentUser = useSelector(
    ({ entities: { users }, session: { currentUserId } }) =>
      users[currentUserId]
  );

  let userName;
  if (currentUser) {
    userName = currentUser.first_name + " " + currentUser.last_name;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newpost = {
      content: content,
    };
    dispatch(postActions.createPost(newpost)).then(() => {
      setContent("");
      setShowModal(false);
    });
  };
  return (
    <>
      <form className="post-form-modal" onSubmit={handleSubmit}>
        <div className="create-post">Create post</div>
        <div className="border-line6"></div>
        <div className="user-box-container">
          <div className="user-box">
            {" "}
            <FaUserCircle size={25} />
          </div>
          <div className="user-box-name"> {userName}</div>
        </div>
        <label className="post-contents">
          <input
            id="post-content"
            type="text"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <div className="border-line7"></div>
        <button className="post-button" type="submit">
          Post
        </button>
      </form>
    </>
  );
}

export default PostForm;
