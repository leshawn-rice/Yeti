// External Dependencies
import React from 'react';
import { useSelector } from 'react-redux';
import Comments from '../../Posts/Comments';
// Components


const ProfileComments = () => {
  const user = useSelector(state => state.userReducer.user);

  return (
    <Comments comments={user.comments} allowDelete={true} />
  )
}

export default ProfileComments;