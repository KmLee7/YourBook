import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { currentUser } from "../../store/session";
import DetailsForm from "./DetailsModal";
import "./DetailsModal.css";

function DetailsFormModal() {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const currentUserId = useSelector((state) => state.session.currentUserId);
  const currentUser = useSelector(
    (state) => state.entities.users[currentUserId]
  );
  const profilePageId = Number(
    history.location.pathname.split("/ProfilePage/")[1]
  );
  const profileOwner = useSelector(
    (state) => state.entities.users[profilePageId]
  );
  return (
    <>
      {currentUser === profileOwner && (
        <button
          className="detailsformButton"
          onClick={() => setShowModal(true)}
        >
          Edit details
        </button>
      )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DetailsForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default DetailsFormModal;
