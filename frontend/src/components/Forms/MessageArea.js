import React from 'react';

const MessageArea = ({ id, name, label, placeholder, value, disabled, handleChange }) => {
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
        disabled={disabled}
        onChange={handleChange} />
    </div>
  );
}

export default MessageArea;