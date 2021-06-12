import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/Drawer.css';

/**
 * Drawer Component
 * 
 * Only for mobile, opens up drawer with a slide animation from the left side of the screen.
 * 
 * Is the navigation menu for mobile
 */

const Drawer = ({ open, onClose, links = [] }) => {
  if (open) {
    return (
      <div className="Drawer" id="Nav-Drawer">
        <div className="Drawer-Content">
          <div className="Drawer-Links">
            {links.map(link => (
              <NavLink
                key={link.name}
                exact to={link.url}
                className="Drawer-Link"
                onClick={onClose}>
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
        <div onClick={onClose} className="Drawer-Page">
        </div>
      </div>
    )
  }
  else {
    return null;
  }

}

export default Drawer;