import React, { useState } from "react";
import Input from "./Input";
import MessageArea from "./MessageArea";
import { Link } from 'react-router-dom';

const Form = ({ inputs = [], messageAreas = [], INITIAL_DATA = {}, buttonLabel = null, extraButton = {} }) => {
  const [formData, setFormData] = useState(INITIAL_DATA);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // submit(formData);
    setFormData(INITIAL_DATA);
  }

  return (
    <form className="Form" onSubmit={handleSubmit}>
      {inputs.map(input => (
        <Input
          key={input.id}
          id={input.id}
          type={input.type}
          name={input.name}
          label={input.label}
          placeholder={input.placeholder}
          required={input.required}
          value={formData[input.name]}
          handleChange={handleChange}
        />
      ))}

      {messageAreas.map(messageArea => (
        <MessageArea
          key={messageArea.id}
          id={messageArea.id}
          name={messageArea.name}
          label={messageArea.label}
          placeholder={messageArea.placeholder}
          value={formData[messageArea.name]}
          handleChange={handleChange} />
      ))}
      <div className="Form-SubmitArea">
        {extraButton.name ?
          <Link className="Form-Button-Extra" to={extraButton.url}>{extraButton.name}</Link>
          : null}
        <button className="Form-Button">{buttonLabel}</button>
      </div>
    </form>
  );

}

export default Form;