import React from 'react';

const MessageArea = ({ id, name, label, placeholder, value, handleChange }) => {
  return (
    <div className="MessageArea">
      <label
        className="MessageArea-Label"
        htmlFor={id}>
        {label}
      </label>
      <textarea
        className="MessageArea-Field"
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange} />
    </div>
  );
}

export default MessageArea;