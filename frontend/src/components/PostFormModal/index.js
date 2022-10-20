import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import PostForm from "./PostForm";
import "./PostForm.css";
function PostFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="postButton" onClick={() => setShowModal(true)}>
        What's on your mind?,
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
