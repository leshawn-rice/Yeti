// External Dependencies
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Internal Dependencies
import { deleteUserApi } from '../../../redux/actionCreators';
// Components
import Form from '../../Forms/Form';
// Styles
import '../../../styles/ConfirmDelete.css';

const ConfirmDelete = () => {
  const user = useSelector(state => state.authReducer.user);
  const token = useSelector(state => state.authReducer.token);
  const dispatch = useDispatch();
  const INITIAL_DATA = {
    reason: ''
  }

  const messages = [{ id: 'reason', name: 'reason', label: 'Reason For Deletion', placeholder: 'I don\'t like the app anymore' }]

  const handleSubmit = () => {
    dispatch(deleteUserApi(token, user.id));
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