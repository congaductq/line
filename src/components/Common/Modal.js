import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CloseImg from '~/static/img/close.png'

class Modal extends Component {
  // CLOSE WITH ESC BUTTON PRESSED

  // componentDidMount() {
  //   document.addEventListener('keydown', this.handleKeyDown)
  // }

  // handleKeyDown = (event) => {
  //   if (event.keyCode === 27) {
  //     const { onClose } = this.props
  //     onClose()
  //   }
  // }
  render() {
    const {
      children, header, displayModal, onClose,
    } = this.props
    return (
      <React.Fragment>
        <div className="popup" style={{ display: displayModal ? 'flex' : 'none' }}>
          <div role="button" tabIndex="0" className="popup__bg" onClick={() => onClose()} onKeyUp={this.onKeyUp} />
          <div className="popup__main">
            <div className="popup__header__container">
              <div className="d-flex">&nbsp;</div>
              <div className="popup__header">{header}</div>
              <div role="button" tabIndex="0" onClick={() => onClose()} onKeyUp={this.onKeyUp}>
                <img className="popup__header__button" src={CloseImg} alt="close" />
              </div>
            </div>
            { children }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  header: PropTypes.string,
  displayModal: PropTypes.bool,
  onClose: PropTypes.func,
}

export default Modal
