// External Dependencies
import React from 'react';
// Styles
import '../styles/Alert.css';

const Alert = ({ message = '', status = 200 }) => {
  const [type, setType] = useState('Error');
  if (status >= 200 && status < 400) {
    setType('Success');
  }
  if (status >= 400 && status < 500) {
    setType('Warning');
  }

  return (
    <div className={`Alert-${type}`}>{message}</div>
  )
}

export default Alert;