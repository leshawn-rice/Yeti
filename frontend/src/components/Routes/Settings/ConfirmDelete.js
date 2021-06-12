// External Dependencies
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Internal Dependencies
import { deleteUserApi } from '../../../redux/actionCreators';
// Components
import Form from '../../Forms/Form';
// Styles
import '../../../styles/ConfirmDelete.css';

/**
 * ConfirmDelete Component
 * 
 * Opens a modal with a text box for users to input their reason for deletion and a button that will delete their account
 */

const ConfirmDelete = ({ handleCancel }) => {
  const user = useSelector(state => state.userReducer.user);
  const token = useSelector(state => state.userReducer.token);
  const dispatch = useDispatch();
  const INITIAL_DATA = {
    reason: ''
  }

  const messages = [{ id: 'reason', name: 'reason', label: 'Reason For Deletion', placeholder: 'I don\'t like the app anymore', required: true }]

  const handleSubmit = () => {
    dispatch(deleteUserApi(token, user.username));
  }

  const cancelButton = { url: '/settings', name: 'Cancel' }

  return (
    <div className="Delete-Confirmation">
      <Form
        messageAreas={messages}
        INITIAL_DATA={INITIAL_DATA}
        buttonLabel="Delete Account"
        extraButton={cancelButton}
        extraButtonOnClick={handleCancel}
        submit={handleSubmit}
      />
    </div>
  )
}

export default ConfirmDelete