// External Dependencies
import React, { useState } from 'react';
// Components
import Modal from '../../Modal';
import ConfirmDelete from './ConfirmDelete';
// Styles
import '../../../styles/Delete.css';

const Delete = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCancel = () => {
    setModalOpen(false);
  }

  const toggleModal = () => {
    setModalOpen(true);
  }

  const modalContent = {
    title: 'Delete Account',
    body: <ConfirmDelete handleCancel={handleCancel} />
  }

  return (
    <div className="Delete-Account">
      <Modal toggled={isModalOpen} content={modalContent} />
      <h1>Permanently delete your account</h1>
      <p className="Delete-Info">You won't be able to reverse this action. <strong>All</strong> posts, comments, and votes from this account will be permanently deleted from our servers, and will <strong>not</strong> be able to be retrieved.</p>
      <button onClick={toggleModal} className="Delete-Account-Button">Delete</button>
    </div>
  )
}

export default Delete;