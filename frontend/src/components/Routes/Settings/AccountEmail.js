// External Dependencies
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// Components
import Modal from '../../Modal';
import EmailChange from './EmailChange';
// Styles
import '../../../styles/Account.css';

/**
 * AccountEmail Component allows the user to change their password, opens the EmailChange Component on clicking the button
 */

const AccountEmail = () => {
  const [emailModal, setEmailModal] = useState(false);

  const user = useSelector(state => state.userReducer.user);

  const modalContent = {
    title: 'Change Email',
    body: <EmailChange setModal={setEmailModal} />
  }

  const toggleModal = () => {
    setEmailModal(true);
  }

  return (
    <div className="Account-Email">
      <Modal toggled={emailModal} toggleModal={setEmailModal} content={modalContent} />
      <h1 className="Account-Header">Email</h1>
      <p className="Account-Body">Want to change your <span className="Account-Body-Email">email address?<span className="Account-Email-Tooltip">{user.email}</span></span></p>
      <button onClick={toggleModal} className="Account-Change" id="account-change-email">Change Email</button>
    </div>
  )
}

export default AccountEmail;