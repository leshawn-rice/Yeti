// External Dependencies
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// Internal Dependencies
import { loginUserApi, clearErrors } from '../../../redux/actionCreators';
// Components
import Auth from './Auth';

/**
 * Login Component
 * 
 * Displays an Auth Component with the input fields email & password
 * 
 * logs the user in on form submit
 */

const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => { dispatch(clearErrors()) }
  }, [dispatch])

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

  const handleSubmit = (formData) => {
    dispatch(loginUserApi(formData));
  }

  return (
    <Auth
      inputs={inputs}
      INITIAL_DATA={INITIAL_DATA}
      buttonLabel='Log In'
      extraButton={{ name: 'Sign Up', url: 'sign-up' }}
      handleSubmit={handleSubmit}
    />
  )
}

export default Login;