// External Dependencies
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router';
// Internal Dependencies
import { clearErrors, loginUser, showErrors } from '../../redux/actionCreators';
import YetiApi from '../../api';
// Styles
import '../../styles/ConfirmEmail.css';
import Alert from '../Alert';

const ConfirmEmail = () => {
  const user = useSelector(state => state.authReducer.user);
  const errors = useSelector(state => state.errorReducer.errors);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const token = path.substring(path.lastIndexOf('/') + 1);

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const confirm = () => {
    async function getConfirmation() {
      try {
        const user = await YetiApi.confirmEmail(token);
        dispatch(loginUser(user));
      }
      catch (errs) {
        for (let err of errs) {
          err.message = err.message.replace('jwt', 'confirmation');
        }
        dispatch(showErrors(errs));
      }
    }
    getConfirmation();
  }

  if (user.confirmed === true) return <Redirect to="/" />

  return (
    <div className="Email-Confirmation">
      {errors.map(err => (
        <Alert message={err.message} status={err.status} />
      ))}
      <h1>Confirm your email {user.username}!</h1>
      <button className="Confirm-Button" onClick={confirm}>Confirm!</button>
    </div>
  )
}

export default ConfirmEmail;