// External Dependencies
import React from 'react';
import { useSelector } from 'react-redux';
// Components


const ProfileUprated = () => {
  const user = useSelector(state => state.authReducer.user);

  return (
    <h1>Profile Upvoted</h1>
  )
}

export default ProfileUprated;