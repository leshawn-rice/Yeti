// External Dependencies
import React, { useState } from 'react';
// Components
import Modal from '../../Modal';
// Styles
import '../../../styles/Account.css';
import PasswordChange from './PasswordChange';


const AccountPassword = () => {
  const [passwordModal, setPasswordModal] = useState(false);

  const modalContent = {
    title: 'Change Password',
    body: <PasswordChange setModal={setPasswordModal} />
  }

  const toggleModal = () => {
    setPasswordModal(true);
  }

  return (
    <div className="Account-Password">
      <Modal toggled={passwordModal} toggleModal={setPasswordModal} content={modalContent} />
      <h1 className="Account-Header">Password</h1>
      <p className="Account-Body">Want to change your <span className="Account-Body-Password">password?</span></p>
      <button onClick={toggleModal} className="Account-Change">Change Password</button>
    </div>
  )
}

export default AccountPassword;