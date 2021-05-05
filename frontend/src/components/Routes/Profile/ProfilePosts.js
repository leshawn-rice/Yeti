// External Dependencies
import React from 'react';
import { useSelector } from 'react-redux';
// Components
import Posts from '../../Posts/Posts';

const ProfilePosts = () => {
  const user = useSelector(state => state.userReducer.user);

  return (
    <Posts posts={user.posts} />
  )
}

export default ProfilePosts;