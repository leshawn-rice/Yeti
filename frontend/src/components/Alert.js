// External Dependencies
import React, { useEffect, useState } from 'react';
// Styles
import '../styles/Alert.css';

const Alert = ({ message = '', status = 200 }) => {
  const [type, setType] = useState('Error');

  useEffect(() => {
    if (status >= 200 && status < 400) {
      setType('Success');
    }
    if (status >= 400 && status < 500) {
      setType('Warning');
    }
  }, [status]);

  const closeAlert = (evt) => {
    setTimeout(() => {
      evt.target.parentElement.remove(); // Removes the alert from the page
    }, 1000);
    evt.target.parentElement.style.opacity = '0%'; // Begins the fade Animation
  }

  return (
    <div className={`Alert Alert-${type}`}>
      {message}
      <span className="Alert-Exit" onClick={closeAlert}>
        X
      </span>
    </div>
  )
}

export default Alert;