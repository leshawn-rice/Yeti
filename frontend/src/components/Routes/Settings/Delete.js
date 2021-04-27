// External Dependencies
import React from 'react';
// Components
import Modal from '../../Modal';
import ConfirmDelete from './ConfirmDelete';
// Styles
import '../../../styles/Delete.css';

const Delete = () => {
  const modalContent = {
    title: 'Delete Account',
    body: <ConfirmDelete />
  }

  return (
    <div className="Delete-Account">
      <Modal toggled={true} content={modalContent} />
      <h1>Permanently delete your account</h1>
      <p className="Delete-Info">You won't be able to reverse this action. <strong>All</strong> posts, comments, and votes from this account will be permanently deleted from our servers, and will <strong>not</strong> be able to be retrieved.</p>
      <button className="Delete-Account-Button">Delete</button>
    </div>
  )
}

export default Delete;