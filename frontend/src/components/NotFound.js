import React from 'react';
import notFound from '../img/404.png';

/**
 * NotFound Component
 * 
 * Displays the Not Found image 
 */

const NotFound = () => {
  return (
    <img src={notFound} alt="Not Found" />
  )
}

export default NotFound