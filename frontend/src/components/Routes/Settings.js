// External Dependencies
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
// Styles
import '../../styles/Settings.css'

const Settings = () => {
  const user = useSelector(state => state.authReducer.user);

  if (user.username === undefined) return <Redirect to="/" />

  return (
    // <>
    //   <h1>Delete Account</h1>
    //   <h1>Verify Email</h1>
    // </>
    <div className="Settings">
      <div className="Settings-Sidebar">
        <h1 className="Settings-Sidebar-Header">Settings</h1>
        <div className="Settings-Sidebar-Content">
          <h2 className="active">General</h2>
          <h2>General</h2>
          <h2>Contact</h2>
          <h2>About</h2>
          <h2>Delete Account</h2>
        </div>
      </div>
      <div className="Settings-Content">

      </div>
    </div>
  )
}

export default Settings;