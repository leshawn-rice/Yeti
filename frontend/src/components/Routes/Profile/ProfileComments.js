// External Dependencies
import React from 'react';
import { useSelector } from 'react-redux';
// Components
import Comments from '../../Posts/Comments';

/**
 * ProfileComments Component
 * 
 * Displays the user's comments
 */

const ProfileComments = () => {
  const user = useSelector(state => state.userReducer.user);

  return (
    <Comments comments={user.comments} allowDelete={true} />
  )
}

export default ProfileComments;