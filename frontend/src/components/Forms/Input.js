import React from 'react';

const Input = ({ type, name, id, label, placeholder, isDisabled, required, value, handleChange }) => {
  return (
    <div className="Input">
      <label
        className="Input-Label"
        htmlFor={id}>
        {label}
      </label>
      <input
        className="Input-Field"
        onChange={handleChange}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        required={required}
        disabled={isDisabled}
      />
    </div>
  )
}

export default Input;