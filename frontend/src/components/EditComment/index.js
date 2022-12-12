import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import EditComment from "./EditComment";
import "./EditComment.css";

function EditCommentModal({ comment }) {
  const [showModal, setShowModal] = useState(false);
  const currentUser = useSelector(
    ({ entities: { users }, session: { currentUserId } }) =>
      users[currentUserId]
  );
  let userName;
  if (currentUser) {
    userName = currentUser.first_name + " " + currentUser.last_name;
  }
  // console.log(post);

  return (
    <>
      <button className="editButton" onClick={() => setShowModal(true)}>
        Edit
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditComment setShowModal={setShowModal} comment={comment} />
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;
