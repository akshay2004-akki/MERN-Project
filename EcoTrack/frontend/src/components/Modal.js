import React from 'react';
// import './Modal.css'; // Add your CSS file here

const Modal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Success!</h2>
        <p>{message}</p>
        <button className="modal-button" onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default Modal;
