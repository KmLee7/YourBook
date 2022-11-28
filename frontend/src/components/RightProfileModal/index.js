import React, { useState } from "react";
import { ModalOne } from "./ModalOne";
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
        <ModalOne onClose={() => setShowModal(false)}>
          <RightProfile />
        </ModalOne>
      )}
    </div>
  );
}

export default RightProfileModal;
