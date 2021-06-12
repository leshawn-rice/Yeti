// External Dependencies
import React, { useState } from 'react';
// Components
import Modal from '../../Modal';
import ConfirmDelete from './ConfirmDelete';
// Styles
import '../../../styles/Delete.css';

/**
 * Delete Component
 * 
 * Displays a text blurb explaining what account deletion does, with a button that opens the ConfirmDelete component on click 
 */

const Delete = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  const toggleModal = () => {
    setIsModalOpen(true);
  }

  const modalContent = {
    title: 'Delete Account',
    body: <ConfirmDelete handleCancel={handleCancel} />
  }

  return (
    <div className="Delete-Account">
      <Modal toggled={isModalOpen} toggleModal={setIsModalOpen} content={modalContent} />
      <h1 className="Delete-Header">Permanently delete your account</h1>
      <p className="Delete-Info">You won't be able to reverse this action. <strong>All</strong> posts, comments, and votes from this account will be permanently deleted from our servers, and will <strong>not</strong> be able to be retrieved.</p>
      <button onClick={toggleModal} className="Delete-Account-Button">Delete</button>
    </div>
  )
}

export default Delete;