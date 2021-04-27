// External Dependencies
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
// Internal Dependencies
import { stopLoading } from '../../../redux/actionCreators';
// Components
import SettingsContent from './SettingsContent';
import Loading from '../../Loading';
// Styles
import '../../../styles/Settings.css'

const Settings = () => {
  const user = useSelector(state => state.authReducer.user);
  const loading = useSelector(state => state.loadingReducer.isLoading);
  const dispatch = useDispatch();
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) {
      const activeElement = document.querySelector('.Settings-Sidebar-Option.active');
      setActive(activeElement);
    }
    dispatch(stopLoading());
  }, [active, dispatch]);

  if (user.username === undefined) return <Redirect to="/" />

  if (loading) {
    return <Loading />
  }

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