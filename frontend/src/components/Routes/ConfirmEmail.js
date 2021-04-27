import React from 'react';
import { useLocation } from 'react-router';
import YetiApi from '../../api';

const ConfirmEmail = () => {
  const location = useLocation();
  const path = location.pathname;
  const token = path.substring(path.lastIndexOf('/') + 1);

  const confirm = () => {
    async function getConfirmation() {
      const user = await YetiApi.confirmEmail(token);
      console.log(user);
    }
    getConfirmation();
  }

  return (
    <button onClick={confirm}>Click To Confirm Your Email!</button>
  )
}

export default ConfirmEmail;