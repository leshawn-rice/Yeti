// External Dependencies
import React from 'react';
// Components
import Form from '../Forms/Form';
// Styles
import '../../styles/Login.css';

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
    <div className="Login-Form">
      <Form
        inputs={inputs}
        INITIAL_DATA={INITIAL_DATA}
        buttonLabel={'Log In'}
      />
    </div>
  )
}

export default Login;