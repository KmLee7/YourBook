import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import EditPostForm from "./EditPostForm";
import "./EditPost.css";
function EditPostFormModal({ post }) {
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
      <button className="editButton" onClick={() => setShowModal(true)}>
        Edit
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPostForm setShowModal={setShowModal} post={post} />
        </Modal>
      )}
    </>
  );
}

export default EditPostFormModal;
