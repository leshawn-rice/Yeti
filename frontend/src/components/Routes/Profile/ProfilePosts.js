// External Dependencies
import React from 'react';
import { useSelector } from 'react-redux';
// Components
import Post from '../../Post';

const ProfilePosts = () => {
  const user = useSelector(state => state.authReducer.user);

  return (
    <>
      {user.posts.map(post => (
        <Post post={post} />
      ))}
    </>
  )
}

export default ProfilePosts;