import React from 'react';
import { useSelector } from 'react-redux';

const ProfilePosts = () => {
  const user = useSelector(state => state.authReducer.user);

  return (
    <h1>Profile Posts</h1>
  )
}

export default ProfilePosts;