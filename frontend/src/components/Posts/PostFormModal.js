import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import PostForm from "./PostForm";
import "./Post.css";

function PostFormModal() {
  const [showModal, setShowModal] = useState(false);
  const currentUser = useSelector(
    ({ entities: { users }, session: { currentUserId } }) =>
      users[currentUserId]
  );
  let userName;
  if (currentUser) {
    userName = currentUser.first_name + " " + currentUser.last_name;
  }

  return (
    <>
      <button className="postButton" onClick={() => setShowModal(true)}>
        What's on your mind, {userName}?
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default PostFormModal;
