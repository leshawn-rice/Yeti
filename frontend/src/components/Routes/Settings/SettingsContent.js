// External Dependencies
import React from 'react';
// Components
import Account from './Account';
import About from './About';
import Contact from './Contact';
import Delete from './Delete';
import Verify from './Verify';

/**
 * SettingsContent Component
 * 
 * Displays the content on the settings page, depending on the value contained by the current prop
 */

const SettingsContent = ({ current }) => {
  const CONTENT_MAP = {
    'Account': <Account />,
    'About': <About />,
    'Contact': <Contact />,
    'Delete Account': <Delete />,
    'Verify Email': <Verify />
  }

  return (
    <>
      {CONTENT_MAP[current]}
    </>
  )
}

export default SettingsContent;