import React from 'react';
import { useSelector } from 'react-redux';

const ProfileSaved = () => {
  const user = useSelector(state => state.authReducer.user);

  return (
    <h1>Profile Saved</h1>
  )
}

export default ProfileSaved;