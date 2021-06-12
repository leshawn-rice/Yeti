// External Dependencies
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { registerUserApi, showErrors, clearErrors } from '../../../redux/actionCreators';
// Components
import Auth from './Auth';

/**
 * Signup Component
 * 
 * Displays an Auth Component with the input fields email, password, & confirm password
 * 
 * Signs the user up on form submit
 */

const Signup = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => { dispatch(clearErrors()) }
  }, [dispatch])

  const INITIAL_DATA = {
    email: '',
    password: '',
    confirmPassword: ''
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
      name: 'confirmPassword',
      label: 'Confirm Password',
      placeholder: 'confirm password',
      type: 'password',
      id: 'confirm-password',
      required: true
    }
  ];

  const handleSubmit = (formData) => {
    if (formData.password === formData.confirmPassword) {
      dispatch(registerUserApi(formData));
    }
    else {
      dispatch(showErrors([{ message: 'Passwords must match', status: 400 }]))
    }
  }

  return (
    <Auth
      inputs={inputs}
      INITIAL_DATA={INITIAL_DATA}
      buttonLabel='Sign Up'
      handleSubmit={handleSubmit}
    />
  )
}

export default Signup;