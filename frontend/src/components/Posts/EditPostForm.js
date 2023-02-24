import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postActions from "../../store/posts";
import "./EditPost.css";
import { FaUserCircle } from "react-icons/fa";

function EditPostForm({ setShowModal, post }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState(post.content);
  const userId = useSelector((state) => state.session.currentUserId);
  const posts = useSelector((state) => state.entities.posts);
  // console.log(post.content);
  const currentUser = useSelector(
    ({ entities: { users }, session: { currentUserId } }) =>
      users[currentUserId]
  );

  let userName;
  if (currentUser) {
    userName = currentUser.first_name + " " + currentUser.last_name;
  }

  const handleEditForm = (e) => {
    e.preventDefault();
    const newpost = {
      id: post.id,
      content: content,
    };
    dispatch(postActions.updatePost(newpost)).then(() => {
      setContent("");
      setShowModal(false);
    });
  };
  return (
    <>
      <form className="post-form-modal" onSubmit={handleEditForm}>
        <div className="create-post">Edit post</div>
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
            placeholder={post.content}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <div className="border-line7"></div>
        <button className="post-button" type="submit">
          Edit Post
        </button>
      </form>
    </>
  );
}

export default EditPostForm;
