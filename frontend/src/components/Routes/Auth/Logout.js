// External Dependencies
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
// Internal Dependencies
import { logoutUser } from '../../../redux/actionCreators';

/**
 * Logout Component
 * 
 * logs the user out and redirects to the home page when it mounts
 */

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  return (
    <Redirect to="/" />
  )
}

export default Logout;