import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

const Settings = () => {
  const user = useSelector(state => state.authReducer.user);

  if (user.username === undefined) return <Redirect to="/" />

  return (
    <>
      <h1>Delete Account</h1>
      <h1>Verify Email</h1>
    </>
  )
}

export default Settings;