// External Dependencies
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
// Components
import SettingsContent from './SettingsContent';
// Styles
import '../../../styles/Settings.css'

const Settings = () => {
  const user = useSelector(state => state.authReducer.user);
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) {
      const activeElement = document.querySelector('.Settings-Sidebar-Option.active');
      setActive(activeElement);
    }
  }, [active]);

  if (user.username === undefined) return <Redirect to="/" />

  const setActiveSetting = (evt) => {
    const target = evt.target
    // Prevent changing active element to random whitespace
    if (target.classList.contains('Settings-Sidebar-Option')) {
      // remove the active class from all setting options
      for (let sibling of target.parentElement.children) {
        sibling.classList.remove('active');
      }
      target.classList.add('active');
      setActive(target);
    }
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
        {active ? <SettingsContent current={active.innerText} /> : null}
      </div>
    </div>
  )
}

export default Settings;