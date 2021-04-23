import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
import Drawer from './Drawer';
import '../../styles/Navbar.css';

// TODO: check if logged in, and add necessary link to links

const Navbar = () => {
  const [mobileView, setMobileView] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const links = [
    { name: 'Profile', url: '/profile' },
    { name: 'Settings', url: '/settings' },
    { name: 'Logout', url: '/sign-out' },
  ];

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
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
          <NavLink exact to="/profile">
            <FontAwesomeIcon
              icon={faUser}
              className="Navbar-Link"
            />
          </NavLink>
          <NavLink exact to="/settings">
            <FontAwesomeIcon
              icon={faCog}
              className="Navbar-Link"
            />
          </NavLink>
          <NavLink exact to="/sign-out">
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="Navbar-Link"
            />
          </NavLink>
        </div>
      </>
    )
  }

  return (
    <nav className="Navbar">
      {mobileView ? displayMobile() : displayDesktop()}
    </nav>
  )
}

export default Navbar;