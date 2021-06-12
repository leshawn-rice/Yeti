// External Dependencies
import React from 'react';
// Components
import AccountEmail from './AccountEmail';
import AccountPassword from './AccountPassword';
// Styles
import '../../../styles/Account.css';

/**
 * Account Component 
 * 
 * Displays the AccountEmail & AccountPassword components
 */

const Account = () => {
  return (
    <div className="Account">
      <AccountEmail />
      <AccountPassword />
    </div>
  )
}

export default Account;