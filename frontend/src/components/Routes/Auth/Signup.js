// External Dependencies
import React from 'react';
import { useDispatch } from 'react-redux';
import { registerUserApi, showErrors } from '../../../redux/actionCreators';
// Components
import Auth from './Auth';

const Signup = () => {

  const dispatch = useDispatch();

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