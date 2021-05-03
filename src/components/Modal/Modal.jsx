import React from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener("keydown", this.props.onEscClick);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.props.onEscClick);
  }

  render() {
    const { imageUrl, onModalClick } = this.props;

    return createPortal(
      <div className="Overlay" onClick={onModalClick}>
        <div className="Modal">
          <img src={imageUrl} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
