// External Dependencies
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser, faCog, faSignOutAlt, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Components
import Drawer from './Drawer';
// Styles
import '../../styles/Navbar.css';

const Navbar = () => {
  const [mobileView, setMobileView] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const user = useSelector(state => state.authReducer.user);


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

  // ADD EVT LISTENER TO REMOVE NAVBAR ON SCROLL

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };

    setResponsiveness();
    window.addEventListener('resize', () => setResponsiveness());
    return () => {
      window.removeEventListener('resize', () => setResponsiveness());
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