import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ProfileMenu from "./ProfileMenu";
import "./ProfileModal.css";

function ProfileModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="profilepage-button"
        onClick={() => setShowModal(true)}
      ></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ProfileMenu />
        </Modal>
      )}
    </>
  );
}

export default ProfileModal;
