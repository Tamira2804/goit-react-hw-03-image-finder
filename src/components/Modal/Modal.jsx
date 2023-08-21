import React, { Component } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';

class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeyDown);
  };
  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleKeyDown);
  };

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { image, onClose } = this.props;

    return (
      <Overlay onClick={onClose}>
        <ModalWindow>
          <img src={image} alt="" />
        </ModalWindow>
      </Overlay>
    );
  }
}

export default Modal;
