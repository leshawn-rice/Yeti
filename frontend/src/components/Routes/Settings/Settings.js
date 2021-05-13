// External Dependencies
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
// Internal Dependencies
import { stopLoading } from '../../../redux/actionCreators';
import { handleScroll } from '../../../helpers';
// Components
import SettingsContent from './SettingsContent';
import Loading from '../../Loading';
// Styles
import '../../../styles/Settings.css'

const Settings = () => {
  const user = useSelector(state => state.userReducer.user);
  const loading = useSelector(state => state.loadingReducer.isLoading);
  const dispatch = useDispatch();
  const [active, setActive] = useState(null);
  const [sidebar, setSidebar] = useState(null);

  useEffect(() => {
    if (!active) {
      const activeElement = document.querySelector('.Settings-Sidebar-Option.active');
      setActive(activeElement);
    }
    dispatch(stopLoading());

    let oldScrollPos = 0;
    let newSidebar = document.querySelector('#settings-sidebar');
    // Weird way to persist the sidebar element. useRef evaluates the sidebar to null
    setSidebar(newSidebar);

    window.addEventListener('scroll', () => {
      if (sidebar) {
        oldScrollPos = handleScroll(oldScrollPos, sidebar, '0', '5rem');
      }
      else {
        newSidebar = document.querySelector('#settings-sidebar');
        setSidebar(newSidebar);
      }
    });
    return () => {
      window.removeEventListener('scroll', () => {
        if (sidebar) {
          oldScrollPos = handleScroll(oldScrollPos, sidebar, '0', '5rem');
        }
        else {
          newSidebar = document.querySelector('#settings-sidebar');
          setSidebar(newSidebar);
        }
      });
    }

  }, [active, dispatch, sidebar]);

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
      <div className="Settings-Sidebar" id="settings-sidebar">
        <h1 className="Settings-Sidebar-Header">Settings</h1>
        <div className="Settings-Sidebar-Content" onClick={setActiveSetting}>
          <h2 className="Settings-Sidebar-Option active" id="settings-account-option">Account</h2>
          {!user.confirmed ? (
            <h2 className="Settings-Sidebar-Option" id="settings-confirm-option">Verify Email</h2>
          ) : null}
          <h2 className="Settings-Sidebar-Option" id="settings-contact-option">Contact</h2>
          <h2 className="Settings-Sidebar-Option" id="settings-about-option">About</h2>
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