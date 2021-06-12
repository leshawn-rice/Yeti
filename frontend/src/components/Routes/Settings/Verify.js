import React from 'react';
import { useSelector } from 'react-redux';
import YetiApi from '../../../api';
// Styles
import '../../../styles/Verify.css';

/**
 * Verify Component
 * 
 * Displays links to the user to change their email or send another confirmation link
 */

const Verify = () => {
  const user = useSelector(state => state.userReducer.user);

  const resendLink = () => {
    async function sendLink() {
      await YetiApi.resendConfirmation(user.email);
    }
    sendLink();
  }

  const updateEmail = () => {
    const account = document.querySelector('#settings-account-option');
    account.click();
  }

  return (
    <div className="Verify">
      <h1>A confirmation email was sent to your email at {user.email}</h1>
      <h2>The link will expire after 15 minutes. If you haven't received it check your spam/junk folder</h2>
      <h2>Not your email? <span onClick={updateEmail} className="Verify-Link">Update your email.</span></h2>
      <h2>Need another link? <span onClick={resendLink} className="Verify-Link">Send another confirmation email</span></h2>
    </div>
  )
}

export default Verify;