import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
  componentDidMount() {
    document.body.addEventListener('keydown', this.handleClose);
  }
  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleClose);
  }

  handleClose = event => {
    if (event.target === event.currentTarget || event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    const { children } = this.props;
    return createPortal(
      <div onClick={this.handleClose} className={css.Overlay}>
        <div className={css.Modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
