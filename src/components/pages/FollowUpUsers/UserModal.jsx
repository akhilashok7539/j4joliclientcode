// Modal.js
import React from 'react';
import './Modal.css'; // Optional: Add styles for the modal

const UserModal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default UserModal;
