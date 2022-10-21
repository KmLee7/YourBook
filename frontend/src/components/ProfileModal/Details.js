import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DetailsForm from "./DetailsModal";
import "./DetailsModal.css";

function DetailsFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="detailsformButton"
        style={{ width: 295, height: 29 }}
        onClick={() => setShowModal(true)}
      >
        Edit details
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DetailsForm />
        </Modal>
      )}
    </>
  );
}

export default DetailsFormModal;
