// External Dependencies
import React from 'react';
import { useDispatch } from 'react-redux';
// Internal Dependencies
import { showErrors, updatePasswordApi } from '../../../redux/actionCreators';
// Components
import AccountChange from './AccountChange';

const PasswordChange = ({ setModal }) => {
  const dispatch = useDispatch();

  const INITIAL_DATA = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  const inputs = [
    {
      type: 'password',
      name: 'currentPassword',
      id: 'current-password',
      required: true,
      label: 'Current Password'
    },
    {
      type: 'password',
      name: 'newPassword',
      id: 'new-password',
      label: 'New Password',
      required: true,
    },
    {
      type: 'password',
      name: 'confirmPassword',
      id: 'confirm-password',
      label: 'Confirm Password',
      required: true,
    }
  ];

  const buttonLabel = 'Change Password';

  const submit = (token, username, formData) => {
    if (!(formData.newPassword === formData.confirmPassword)) {
      dispatch(showErrors([{ message: 'Passwords Must Match!', status: 400 }]))
    }
    else {
      dispatch(updatePasswordApi(token, username, formData.currentPassword, formData.newPassword));
    }
  }


  return (
    <AccountChange
      setModal={setModal}
      inputs={inputs}
      INITIAL_DATA={INITIAL_DATA}
      buttonLabel={buttonLabel}
      submit={submit} />
  )
}

export default PasswordChange;