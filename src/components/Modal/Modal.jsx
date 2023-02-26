import { useEffect } from 'react';

import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');


const Modal = ({ closeModal, children }) => {
  
  useEffect(() => {
    document.body.addEventListener('keydown', handleClose);
    return () => document.body.addEventListener('keydown', handleClose);
    
  }, [])
  
  
 const handleClose = event => {
    if (event.target === event.currentTarget || event.code === 'Escape') {
     return closeModal();
    }
  };
  
  return createPortal(
      <div onClick={handleClose} className={css.Overlay}>
        <div className={css.Modal}>{children}</div>
      </div>,
      modalRoot
    );
}

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

