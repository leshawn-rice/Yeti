// External Dependencies
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// Components
import Modal from '../../Modal';
// Styles
import '../../../styles/Account.css';

const AccountEmail = () => {
  const [emailModal, setEmailModal] = useState(false);

  const user = useSelector(state => state.authReducer.user);

  const modalContent = {
    title: 'Change Email',
    body: 'WawaWooWoo'
  }

  const toggleModal = () => {
    setEmailModal(true);
  }

  return (
    <div className="Account-Email">
      <Modal toggled={emailModal} toggleModal={setEmailModal} content={modalContent} />
      <h1 className="Account-Header">Email</h1>
      <p className="Account-Body">Want to change your <span className="Account-Body-Email">email address?<span className="Account-Email-Tooltip">{user.email}</span></span></p>
      <button onClick={toggleModal} className="Account-Change">Change Email</button>
    </div>
  )
}

export default AccountEmail;