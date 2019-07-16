import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Modal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false,

    }
  }

  onShow = () => {
    this.setState({ show: true })
  }

  onHide = () => {
    this.setState({ show: false })
  }

  onKeyUp = (e) => {
    console.log(e)
  }

  render() {
    const { show } = this.state
    const {
      children, display, classNameButton, header,
    } = this.props
    return (
      <React.Fragment>
        <div role="button" tabIndex="0" className={classNameButton || 'popup-btn'} onClick={() => this.onShow()} onKeyUp={this.onKeyUp}>{display}</div>
        <div className="popup" style={{ display: show ? 'flex' : 'none' }}>
          <div role="button" tabIndex="0" className="popup-bg" onClick={() => this.onHide()} onKeyUp={this.onKeyUp} />
          <div className="popup-main">
            <div className="header-container">
              <div className="popup-header">{header}</div>
              <div className="header-button" role="button" tabIndex="0" onClick={() => this.onHide()} onKeyUp={this.onKeyUp}>X</div>
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
  display: PropTypes.string.isRequired,
  classNameButton: PropTypes.string,
  header: PropTypes.string,
}

export default Modal
