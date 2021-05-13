// External Dependencies
import React from 'react';
import { useSelector } from 'react-redux';
// Components
import Form from '../../Forms/Form';
// Styles
import '../../../styles/AccountChange.css';

const AccountChange = ({ setModal, inputs, INITIAL_DATA, buttonLabel, submit }) => {
  const user = useSelector(state => state.userReducer.user);
  const token = useSelector(state => state.userReducer.token);

  const handleSubmit = (formData) => {
    submit(token, user.username, formData);
    setModal(false);
  }


  return (
    <div className="AccountChange">
      <Form
        inputs={inputs}
        INITIAL_DATA={INITIAL_DATA}
        buttonLabel={buttonLabel}
        submit={handleSubmit} />
    </div>
  )
}

export default AccountChange;