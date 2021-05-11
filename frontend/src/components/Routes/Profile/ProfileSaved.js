// External Dependencies
import React from 'react';
import { useSelector } from 'react-redux';
// Components


const ProfileSaved = () => {
  const user = useSelector(state => state.userReducer.user);

  console.log(user.saved);

  return (
    <h1>Profile Saved</h1>
  )
}

export default ProfileSaved;