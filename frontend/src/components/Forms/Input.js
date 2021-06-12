import React from 'react';

/**
 * Input Component
 * 
 * Displays an input element of the given type, with the given props as attributes on the element
 */

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