
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from '~/components/Common/Modal'
import { MODAL_TYPE, MESSAGE_TYPE } from '~/constants/modal'
import {
  CARGO_TYPE_STATUS, CARGO_TYPE_FIELDS,
} from '~/constants/cargo-type'

const requireSymbol = <span style={{ color: 'red', marginLeft: 3, marginRight: 6 }}>*</span>

class CargoTypeModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...Object.values(CARGO_TYPE_FIELDS).reduce((result, item) => (Object.assign(result, { [item]: props.modalData[item] || '' })), {}),
    }
  }

  componentWillReceiveProps(nextProps) {
    const { modalData } = this.props
    if (nextProps.modalData !== modalData) {
      this.setState({ ...Object.values(CARGO_TYPE_FIELDS).reduce((result, item) => (Object.assign(result, { [item]: nextProps.modalData[item] || '' })), {}) })
    }
  }

  onFieldChange = (field, value) => {
    this.setState({ [field]: value })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { onAction } = this.props
    const stateToSubmit = this.state
    onAction(Object.values(CARGO_TYPE_FIELDS).reduce((result, item) => (
      Object.assign(result, { [item]: stateToSubmit[item] })), {}))
  }

  render() {
    const { ...state } = this.state
    const {
      modalType, displayModal, onClose, modalMessage, messageType,
    } = this.props

    let modalName = 'Create New Cargo Type'
    if (modalType === MODAL_TYPE.EDIT) {
      modalName = 'Edit Cargo Type'
    } else if (modalType === MODAL_TYPE.VIEW) {
      modalName = 'View Cargo Type'
    }
    const disableField = modalType === MODAL_TYPE.VIEW
    return (
      <Modal
        header={modalName}
        displayModal={displayModal}
        onClose={onClose}
      >
        <form onSubmit={this.onSubmit} className="popup__modal">
          <div className="row">
            <div className="col-12">
              <div className="tms-input">
                <div className="tms-input__label">
                  Name
                  {requireSymbol}
                </div>
                <input
                  id="name"
                  type="text"
                  className="form-control d-flex w-100"
                  value={state[CARGO_TYPE_FIELDS.NAME]}
                  onChange={event => this.onFieldChange(CARGO_TYPE_FIELDS.NAME, event.target.value)}
                  required="required"
                  disabled={disableField}
                  maxLength="50"
                />
              </div>
            </div>
            <div className="col-12">
              <div className="tms-input">
                <div className="tms-input__label">
                  Description
                  {modalType !== MODAL_TYPE.VIEW && ` (${state[CARGO_TYPE_FIELDS.DESCRIPTION].length}/200)`}
                </div>
                <textarea
                  rows="2"
                  type="text"
                  className="form-control d-flex w-100"
                  value={state[CARGO_TYPE_FIELDS.DESCRIPTION]}
                  onChange={event => this.onFieldChange(CARGO_TYPE_FIELDS.DESCRIPTION, event.target.value)}
                  disabled={disableField}
                  maxLength="200"
                />
              </div>
            </div>
            <div className="col-12">
              <div className="tms-input">
                <div className="tms-input__label">
                  Note
                  {modalType !== MODAL_TYPE.VIEW && ` (${state[CARGO_TYPE_FIELDS.NOTE].length}/200)`}
                </div>
                <textarea
                  rows="2"
                  type="text"
                  className="form-control d-flex w-100"
                  value={state[CARGO_TYPE_FIELDS.NOTE]}
                  onChange={event => this.onFieldChange(CARGO_TYPE_FIELDS.NOTE, event.target.value)}
                  disabled={disableField}
                  maxLength="200"
                />
              </div>
            </div>
            <div className="col-12">
              <div className="tms-input">
                <div className="tms-input__label">
                  Status
                  {requireSymbol}
                </div>
                <div className="d-flex flex-wrap">
                  {
                    Object.keys(CARGO_TYPE_STATUS).map(x => (
                      <label htmlFor={CARGO_TYPE_STATUS[x]} style={{ whiteSpace: 'nowrap' }} key={`STATUS_${CARGO_TYPE_STATUS[x]}`}>
                        <input
                          type="radio" name="status" value={x.toString()} checked={state[CARGO_TYPE_FIELDS.STATUS].toString() === x.toString()}
                          id={CARGO_TYPE_STATUS[x]} required disabled={disableField}
                          onChange={event => this.onFieldChange(CARGO_TYPE_FIELDS.STATUS, event.target.value)}
                        />
                        { CARGO_TYPE_STATUS[x] }
                      </label>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
          {
            modalType !== MODAL_TYPE.VIEW
            && (
              <React.Fragment>
                <div className={`popup__message ${messageType === MESSAGE_TYPE.SUCCESS ? 'success' : 'warning'}`}>{modalMessage}</div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="popup__main__action">{modalType}</button>
                </div>
              </React.Fragment>
            )
          }
        </form>
      </Modal>
    )
  }
}

CargoTypeModal.propTypes = {
  modalData: PropTypes.PropTypes.shape().isRequired,
  modalType: PropTypes.string,
  displayModal: PropTypes.bool,
  onAction: PropTypes.func,
  onClose: PropTypes.func,
  modalMessage: PropTypes.string,
  messageType: PropTypes.string,
}

CargoTypeModal.defaultProps = {
  modalType: MODAL_TYPE.CREATE,
  displayModal: false,
  messageType: MESSAGE_TYPE.SUCCESS,
}

export default CargoTypeModal
