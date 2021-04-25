// External Dependencies
import React from 'react';
// Components
import Auth from './Auth';

const Login = () => {
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
    }
  ];

  return (
    <Auth
      inputs={inputs}
      INITIAL_DATA={INITIAL_DATA}
      buttonLabel='Log In'
      extraButton={{ name: 'Sign Up', url: 'sign-up' }}
    />
  )
}

export default Login;