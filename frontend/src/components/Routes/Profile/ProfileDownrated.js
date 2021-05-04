// External Dependencies
import React from 'react';
import { useSelector } from 'react-redux';
// Components


const ProfileDownrated = () => {
  const user = useSelector(state => state.authReducer.user);

  return (
    <h1>Profile Downvoted</h1>
  )
}

export default ProfileDownrated;