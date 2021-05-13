// External Dependencies
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Internal Dependencies
import { updateEmailApi } from '../../../redux/actionCreators';
import AccountChange from './AccountChange';
// Components


const EmailChange = ({ setModal }) => {
  const user = useSelector(state => state.userReducer.user);
  const dispatch = useDispatch();

  const INITIAL_DATA = {
    newEmail: ''
  }

  const inputs = [
    {
      type: 'email',
      name: 'currentEmail',
      id: 'current-email',
      placeholder: user.email,
      disabled: true,
      label: 'Current Email Address'
    },
    {
      type: 'email',
      name: 'newEmail',
      id: 'new-email',
      placeholder: 'mynewaddress@email.com',
      label: 'New Email Address',
      required: true,
    }
  ];

  const buttonLabel = 'Change Email';

  const submit = (token, username, formData) => {
    dispatch(updateEmailApi(token, username, formData.newEmail));
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

export default EmailChange;