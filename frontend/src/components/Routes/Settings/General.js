// External Dependencies
import React from 'react';
// Components
import Form from '../../Forms/Form';
// Styles

const General = () => {

  const inputs = [
    {
      id: 'username',
      name: 'username',
      label: 'Username',
      placeholder: 'CHANGEME',
      type: 'text',
      disabled: true
    },
  ];

  return (
    <div className="General">
      <input type="text" value="username" readOnly={true} />
    </div>
  )
}

export default General;