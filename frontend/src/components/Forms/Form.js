// External Dependencies
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
// Components
import Input from "./Input";
import MessageArea from "./MessageArea";
import Alert from '../Alert';

const Form = ({ inputs = [], messageAreas = [], INITIAL_DATA = {}, buttonLabel = null, extraButton = {}, extraButtonOnClick, submit }) => {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const errorThrown = useSelector(state => state.errorReducer.errorThrown);
  const errors = useSelector(state => state.errorReducer.errors);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    submit(formData);
    setFormData(INITIAL_DATA);
  }

  return (
    <>
      {errorThrown ? (
        errors.map(err => <Alert key={err.message} message={err.message} status={err.status} />)
      ) : null
      }
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
            <Link onClick={extraButtonOnClick} className="Form-Button Extra-Button" to={extraButton.url}>{extraButton.name}</Link>
            : null}
          <button className="Form-Button Main-Button">{buttonLabel}</button>
        </div>
      </form>
    </>
  );

}

export default Form;