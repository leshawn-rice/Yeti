import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import YetiApi from '../../../api';
// Styles
import '../../../styles/Verify.css';

const Verify = () => {
  const user = useSelector(state => state.authReducer.user);

  const resendLink = () => {
    async function sendLink() {
      const res = await YetiApi.resendConfirmation(user.email);
      console.log(res);
    }
    sendLink();
  }

  return (
    <div className="Verify">
      <h1>A confirmation email was sent to your email at {user.email}</h1>
      <h2>The link will expire after 15 minutes. If you haven't received it check your spam/junk folder</h2>
      <h2>Not your email? <Link className="Verify-Link" to="/settings#update-email">Update your email.</Link></h2>
      <h2>Need another link? <span onClick={resendLink} className="Verify-Link">Send another confirmation email</span></h2>
    </div>
  )
}

export default Verify;