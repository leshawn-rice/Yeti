import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router';
import YetiApi from '../../api';
import { loginUser } from '../../redux/actionCreators';

const ConfirmEmail = () => {
  const user = useSelector(state => state.authReducer.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const token = path.substring(path.lastIndexOf('/') + 1);

  const confirm = () => {
    async function getConfirmation() {
      const user = await YetiApi.confirmEmail(token);
      dispatch(loginUser(user));
    }
    getConfirmation();
  }

  if (user.confirmed === true) return <Redirect to="/" />

  return (
    <button onClick={confirm}>Click To Confirm Your Email!</button>
  )
}

export default ConfirmEmail;