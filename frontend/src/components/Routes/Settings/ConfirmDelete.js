// External Dependencies
import React from 'react';
// Components
import Form from '../../Forms/Form';
// Styles
import '../../../styles/ConfirmDelete.css';

const ConfirmDelete = () => {
  const INITIAL_DATA = {
    reason: ''
  }

  const messages = [{ id: 'reason', name: 'reason', label: 'Reason For Deletion', placeholder: 'I don\'t like the app anymore' }]

  const handleSubmit = () => {
    console.log('Submitted!')
  }

  return (
    <div className="Delete-Confirmation">
      <Form
        messageAreas={messages}
        INITIAL_DATA={INITIAL_DATA}
        buttonLabel="Confirm Deletion"
        submit={handleSubmit}
      />
    </div>
  )
}

export default ConfirmDelete