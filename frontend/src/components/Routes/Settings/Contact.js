// External Dependencies
import React from 'react';
// Components
import YetiApi from '../../../api';
import Form from '../../Forms/Form';
// Styles
import '../../../styles/Contact.css';

const Contact = () => {
  const INITIAL_DATA = {
    email: '',
    subject: '',
    body: ''
  }

  const inputs = [
    {
      type: 'email',
      name: 'email',
      id: 'email',
      placeholder: 'me@me.com',
      label: 'Email Address',
      required: true
    },
    {
      type: 'text',
      name: 'subject',
      id: 'subject',
      placeholder: 'Bug on settings page',
      label: 'Subject',
      required: true
    }
  ];
  const messages = [
    {
      name: 'body',
      id: 'body',
      placeholder: 'There is a bug on the settings page where i see a real life yeti!',
      label: 'Message',
      required: true
    }
  ];

  const sendEmail = (formData) => {
    YetiApi.contact(formData);
  }

  return (
    <div className="Contact">
      <h1 className="Contact-Header">Contact Us</h1>
      <div className="Contact-Form">
        <Form
          inputs={inputs}
          messageAreas={messages}
          buttonLabel="Send"
          INITIAL_DATA={INITIAL_DATA}
          submit={sendEmail} />
      </div>
    </div>
  )
}

export default Contact;