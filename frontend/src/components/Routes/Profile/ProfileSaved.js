// External Dependencies
import React from 'react';
import { useSelector } from 'react-redux';
// Components


const ProfileSaved = () => {
  const user = useSelector(state => state.userReducer.user);

  return (
    <h1>Profile Saved</h1>
  )
}

export default ProfileSaved;