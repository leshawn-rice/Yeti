// External Dependencies
import React from 'react';
// Components
import Form from '../../Forms/Form';
// Styles

const General = () => {

  const INITIAL_DATA = {
    email: '',
    password: '',
    confirmPassword: '',
  }

  const inputs = [
    {
      id: 'username',
      name: 'username',
      label: 'Username',
      placeholder: 'CHANGEME',
      type: 'text',
      disabled: true
    },
    {
      id: 'email',
      name: 'email',
      label: 'Email',
      placeholder: 'email',
      type: 'email'
    },
    {
      id: 'password',
      name: 'password',
      label: 'Password',
      placeholder: 'password',
      type: 'password'
    },
    {
      id: 'confirm-password',
      name: 'confirmPassword',
      label: 'Confirm Password',
      placeholder: 'password',
      type: 'password'
    },
  ];

  return (
    <div className="General">
      <Form
        inputs={inputs}
        INITIAL_DATA={INITIAL_DATA}
        buttonLabel="Update Account"
      />
    </div>
  )
}

export default General;