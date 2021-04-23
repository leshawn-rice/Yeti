import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
import Drawer from './Drawer';
import '../../styles/Navbar.css';

const Navbar = () => {
  const [mobileView, setMobileView] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const links = [
    { name: 'Profile', url: '/profile' },
    { name: 'Posts', url: '/posts' },
    { name: 'Settings', url: '/settings' }
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
        <NavLink className="Navbar-Mobile-Logo" exact to="/">Yeti</NavLink>
      </>
    )
  }

  const displayDesktop = () => {
    return (
      <h1>Thank you for desktop</h1>
    )
  }

  return (
    <div className="Navbar">
      {mobileView ? displayMobile() : displayDesktop()}
    </div>
  )
}

export default Navbar;