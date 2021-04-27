// External Dependencies
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
// Styles
import '../../styles/Settings.css'

const Settings = () => {
  const user = useSelector(state => state.authReducer.user);

  if (user.username === undefined) return <Redirect to="/" />

  const setActiveSetting = (evt) => {
    const target = evt.target
    // remove the active class from all setting options
    for (let sibling of target.parentElement.children) {
      sibling.classList.remove('active');
    }
    target.classList.add('active');
  }

  return (
    <div className="Settings">
      <div className="Settings-Sidebar">
        <h1 className="Settings-Sidebar-Header">Settings</h1>
        <div className="Settings-Sidebar-Content" onClick={setActiveSetting}>
          <h2 className="Settings-Sidebar-Option active">General</h2>
          {!user.confirmed ? (
            <h2 className="Settings-Sidebar-Option">Verify Email</h2>
          ) : null}
          <h2 className="Settings-Sidebar-Option">Contact</h2>
          <h2 className="Settings-Sidebar-Option">About</h2>
          <h2 className="Settings-Sidebar-Option" id="settings-delete-option">Delete Account</h2>
        </div>
      </div>
      <div className="Settings-Content">

      </div>
    </div>
  )
}

export default Settings;