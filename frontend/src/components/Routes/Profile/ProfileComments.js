// External Dependencies
import React from 'react';
import { useSelector } from 'react-redux';
// Components


const ProfileComments = () => {
  const user = useSelector(state => state.userReducer.user);

  return (
    <h1>Profile Comments</h1>
  )
}

export default ProfileComments;