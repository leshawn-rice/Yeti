// External Dependencies
import React from 'react';
// Components
import General from './General';
import About from './About';
import Contact from './Contact';
import Delete from './Delete';
import Verify from './Verify';

const SettingsContent = ({ current }) => {
  const CONTENT_MAP = {
    'General': <General />,
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