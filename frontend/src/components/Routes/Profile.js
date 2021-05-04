// External Dependencies
import React from 'react';
import { useSelector } from 'react-redux';

// Styles
import '../../styles/Profile.css';


const Profile = () => {
  const user = useSelector(state => state.authReducer.user);

  return (
    <div className="Profile">

    </div>
  )
}

export default Profile;