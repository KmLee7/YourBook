import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupForm from "./SignupForm";

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button className="signupButton" onClick={() => setShowModal(true)}>
        Create new account
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </div>
  );
}

export default SignupFormModal;
