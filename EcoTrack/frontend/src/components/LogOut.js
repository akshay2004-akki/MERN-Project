import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal'; // Import the Modal component

function LogOut() {
  const route = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogOut = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/v4/users/logout", {}, { withCredentials: true });

      // Clear localStorage
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('avatar');
      localStorage.removeItem("surveyCompleted");

      // Show success message in modal
      setMessage(res.data.message);
      setShowModal(true);

    } catch (error) {
      console.log(error.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    route("/login");
    window.location.reload();
  };

  return (
    <>
      {showModal && <Modal message={message} onClose={closeModal} />}
      <button className='btn btn-danger' onClick={handleLogOut}>LogOut</button>
    </>
  );
}

export default LogOut;
