// External Dependencies
import React from 'react';
// Styles
import '../styles/Modal.css';

const Modal = ({ toggled, content }) => {
  if (!toggled) return null;

  return (
    <div className="Modal">
      <p className="Modal-Title">{content.title}</p>
      {content.body}
    </div>
  )
}

export default Modal;