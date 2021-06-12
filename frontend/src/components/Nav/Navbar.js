// External Dependencies
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser, faCog, faSignOutAlt, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// internal dependencies
import { handleScroll } from '../../helpers';
// Components
import Drawer from './Drawer';
// Styles
import '../../styles/Navbar.css';

/**
 * Navbar Component
 * 
 * Dynamically displays appropriate navbar for desktop/mobile
 */

const Navbar = () => {
  const [mobileView, setMobileView] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const user = useSelector(state => state.userReducer.user);


  const links = [];

  if (user.username) {
    links.push({ name: 'Profile', url: '/profile', icon: faUser });
    links.push({ name: 'Settings', url: '/settings', icon: faCog });
    links.push({ name: 'Logout', url: '/log-out', icon: faSignOutAlt });
  }
  else {
    links.push({ name: 'Login', url: '/login', icon: faSignInAlt });
    links.push({ name: 'Sign Up', url: '/sign-up', icon: faUserPlus });
  }

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };

    let oldScrollPos = 0;
    const nav = document.querySelector('#navbar');
    const changeScroll = () => {
      oldScrollPos = handleScroll(oldScrollPos, nav, '-5rem', '0');
    }

    setResponsiveness();
    window.addEventListener('resize', () => setResponsiveness());
    window.addEventListener('scroll', changeScroll);
    return () => {
      window.removeEventListener('resize', () => setResponsiveness());
      window.removeEventListener('scroll', changeScroll);
    }
  }, []);

  const displayMobile = () => {
    const openDrawer = () => {
      setDrawerOpen(true);
    }

    const closeDrawer = () => {
      document.querySelector('#Nav-Drawer').classList.add('Drawer-Closed');
      setTimeout(() => {
        setDrawerOpen(false);
      }, 500);
    }

    return (
      <>
        <Drawer
          open={drawerOpen}
          onClose={closeDrawer}
          links={links}
        />
        <FontAwesomeIcon
          icon={faBars}
          className="Navbar-Hamburger"
          onClick={openDrawer}
        />
        <NavLink className="Navbar-Logo" exact to="/">Yeti</NavLink>
      </>
    )
  }

  const displayDesktop = () => {
    return (
      <>
        <NavLink className="Navbar-Logo" exact to="/">Yeti</NavLink>
        <div className="Navbar-Links">
          {links.map(link => (
            <NavLink key={link.name} exact to={link.url} className="Navbar-Link">
              {link.name === 'Login' || link.name === 'Sign Up' ? link.name : (
                <FontAwesomeIcon
                  icon={link.icon}
                />
              )}
            </NavLink>
          ))}
        </div>
      </>
    )
  }

  return (
    <nav className="Navbar" id="navbar">
      {mobileView ? displayMobile() : displayDesktop()}
    </nav>
  )
}

export default Navbar;