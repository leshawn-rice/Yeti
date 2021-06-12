// External Dependencies
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// Internal Dependencies
import { showErrors } from '../../../redux/actionCreators';
// Components
import YetiApi from '../../../api';
import Form from '../../Forms/Form';
import Alert from '../../Alert';
// Styles
import '../../../styles/Contact.css';

/**
 * Contact Component
 * 
 * Displays a Form Component with the input fields email, subject, and  body, and sends the email to the server email address on submit
 */

const Contact = () => {
  const [contactMessage, setContactMessage] = useState(null);
  const dispatch = useDispatch();

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
      placeholder: 'iloveyeti@email.com',
      label: 'Email Address',
      required: true
    },
    {
      type: 'text',
      name: 'subject',
      id: 'subject',
      placeholder: 'I love Yeti!',
      label: 'Subject',
      required: true
    }
  ];
  const messages = [
    {
      name: 'body',
      id: 'body',
      placeholder: 'Thank you so much for making Yeti. My life is forever changed!',
      label: 'Message',
      required: true
    }
  ];

  const sendEmail = (formData) => {
    async function contact() {
      try {
        const message = await YetiApi.contact(formData);
        setContactMessage(message.message);
      }
      catch (errs) {
        dispatch(showErrors(errs));
      }
    }
    contact();
  }

  return (
    <div className="Contact">
      {contactMessage ? <Alert message={contactMessage} status={200} /> : null}
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