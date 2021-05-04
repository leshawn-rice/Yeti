// External Dependencies
import React, { useEffect } from 'react';
// Styles
import '../styles/Modal.css';

const Modal = ({ toggled, toggleModal, content }) => {
  useEffect(() => {
    const checkInsideModal = (target) => {
      if (target.classList.contains('Modal')) return true;
      if (target.parentElement === null) return false;
      return checkInsideModal(target.parentElement);
    }

    const checkForClick = (evt) => {
      const target = evt.target;
      if (!toggled) return;
      if (!checkInsideModal(target)) {
        toggleModal(false);
      }
    }

    window.addEventListener('click', checkForClick);
    return () => window.removeEventListener('click', checkForClick);
  }, [toggled, toggleModal]);

  if (!toggled) return null;

  return (
    <div className="Modal">
      <button className="Modal-Close" onClick={() => toggleModal(false)}>X</button>
      <p className="Modal-Title">{content.title}</p>
      {content.body}
    </div>
  )
}

export default Modal;