// External Dependencies
import React from 'react';
import { useSelector } from 'react-redux';
// Components
import Posts from '../../Posts/Posts';

/**
 * ProfilePosts Component
 * 
 * Displays the user's posts
 */


const ProfilePosts = () => {
  const user = useSelector(state => state.userReducer.user);

  return (
    <Posts posts={user.posts} allowDelete={true} />
  )
}

export default ProfilePosts;