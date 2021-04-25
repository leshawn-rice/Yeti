// External Dependencies
import React from 'react';
// Components
import Auth from './Auth';

const Signup = () => {
  const INITIAL_DATA = {
    email: '',
    password: ''
  }

  const inputs = [
    {
      name: 'email',
      label: 'Email',
      placeholder: 'email@email.com',
      type: 'email',
      id: 'email',
      required: true
    },
    {
      name: 'password',
      label: 'Password',
      placeholder: 'password',
      type: 'password',
      id: 'password',
      required: true
    },
    {
      name: 'confirm-password',
      label: 'Confirm Password',
      placeholder: 'confirm password',
      type: 'password',
      id: 'confirm-password',
      required: true
    }
  ];
  return (
    <Auth
      inputs={inputs}
      INITIAL_DATA={INITIAL_DATA}
      buttonLabel='Sign Up'
    />
  )
}

export default Signup;