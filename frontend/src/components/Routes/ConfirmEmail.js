// External Dependencies
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router';
// Internal Dependencies
import { loginUser } from '../../redux/actionCreators';
import YetiApi from '../../api';
// Styles
import '../../styles/ConfirmEmail.css';

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
    <div className="Email-Confirmation">
      <h1>Confirm your email {user.username}!</h1>
      <button className="Confirm-Button" onClick={confirm}>Confirm!</button>
    </div>
  )
}

export default ConfirmEmail;