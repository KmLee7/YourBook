import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import RightProfile from "./RightProfile";
import { FaUserCircle } from "react-icons/fa";
import "./RightProfile.css";

function RightProfileModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button className="rightProfileModal" onClick={() => setShowModal(true)}>
        <FaUserCircle size={33} />
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <RightProfile />
        </Modal>
      )}
    </div>
  );
}

export default RightProfileModal;
