// External Dependencies
import React from 'react';
// Components
import Form from '../../Forms/Form';
// Styles
import '../../../styles/Auth.css';

const Auth = ({ inputs = [], INITIAL_DATA = {}, buttonLabel = '', extraButton = {}, handleSubmit }) => {
  return (
    <div className="Auth-Form">
      <Form
        inputs={inputs}
        INITIAL_DATA={INITIAL_DATA}
        buttonLabel={buttonLabel}
        extraButton={extraButton}
        submit={handleSubmit}
      />
    </div>
  )
}

export default Auth;