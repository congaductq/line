
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from '~/components/Common/Modal'
import { MODAL_TYPE, MESSAGE_TYPE } from '~/constants/modal'
import {
  DRIVER_STATUS, DRIVER_FIELDS, DRIVER_MAX_BORN_YEAR, DRIVER_MIN_BORN_YEAR,
} from '~/constants/driver'

const requireSymbol = <span style={{ color: 'red', marginLeft: 3, marginRight: 6 }}>*</span>

class DriverModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...Object.values(DRIVER_FIELDS).reduce((result, item) => (Object.assign(result, { [item]: props.modalData[item] || '' })), {}),
    }
  }

  componentWillReceiveProps(nextProps) {
    const { modalData } = this.props
    if (nextProps.modalData !== modalData) {
      this.setState({ ...Object.values(DRIVER_FIELDS).reduce((result, item) => (Object.assign(result, { [item]: nextProps.modalData[item] || '' })), {}) })
    }
  }

  onFieldChange = (field, value) => {
    this.setState({ [field]: value })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { onAction } = this.props
    const stateToSubmit = this.state
    onAction(Object.values(DRIVER_FIELDS).reduce((result, item) => (
      Object.assign(result, { [item]: stateToSubmit[item] })), {}))
  }

  render() {
    const { ...state } = this.state
    const {
      modalType, displayModal, onClose, modalMessage, messageType, updateModalType,
    } = this.props

    let modalName = 'Create New Driver'
    if (modalType === MODAL_TYPE.EDIT) {
      modalName = 'Edit Driver'
    } else if (modalType === MODAL_TYPE.VIEW || modalType === MODAL_TYPE.VIEW_DRIVER) {
      modalName = 'View Driver'
    }
    const disableField = modalType === MODAL_TYPE.VIEW || modalType === MODAL_TYPE.VIEW_DRIVER
    return (
      <Modal
        header={modalName}
        displayModal={displayModal}
        onClose={onClose}
      >
        <form onSubmit={this.onSubmit} className="popup__modal">
          <div className="row">
            <div className="col-12 col-lg-4">
              <div className="tms-input">
                <div className="tms-input__label">
                  Name
                  {requireSymbol}
                </div>
                <input
                  id="name"
                  type="text"
                  className="form-control d-flex w-100"
                  value={state[DRIVER_FIELDS.NAME]}
                  onChange={event => this.onFieldChange(DRIVER_FIELDS.NAME, event.target.value)}
                  required="required"
                  disabled={disableField}
                  maxLength="50"
                />
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="tms-input">
                <div className="tms-input__label">
                  Year of birth
                  {requireSymbol}
                </div>
                <input
                  type="number"
                  className="form-control"
                  value={state[DRIVER_FIELDS.YEAR_OF_BIRTH]}
                  onChange={event => this.onFieldChange(DRIVER_FIELDS.YEAR_OF_BIRTH, event.target.value)}
                  required="required"
                  disabled={disableField}
                  max={DRIVER_MAX_BORN_YEAR}
                  min={DRIVER_MIN_BORN_YEAR}
                  step="1"
                />
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="tms-input">
                <div className="tms-input__label">License ID</div>
                <input
                  type="text" className="form-control d-flex w-100"
                  value={state[DRIVER_FIELDS.LICENSE_ID]}
                  onChange={event => this.onFieldChange(DRIVER_FIELDS.LICENSE_ID, event.target.value)}
                  disabled={disableField}
                  maxLength="15"
                />
              </div>
            </div>
            <div className="col-12">
              <div className="tms-input">
                <div className="tms-input__label">
                  Address
                  {modalType !== MODAL_TYPE.VIEW && ` (${state[DRIVER_FIELDS.ADDRESS].length}/500)`}
                </div>
                <textarea
                  rows="2"
                  type="text"
                  className="form-control d-flex w-100"
                  value={state[DRIVER_FIELDS.ADDRESS]}
                  onChange={event => this.onFieldChange(DRIVER_FIELDS.ADDRESS, event.target.value)}
                  maxLength="500"
                  disabled={disableField}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="tms-input">
                <div className="tms-input__label">
                  Note
                  {modalType !== MODAL_TYPE.VIEW && ` (${state[DRIVER_FIELDS.NOTE].length}/200)`}
                </div>
                <textarea
                  rows="2"
                  type="text"
                  className="form-control d-flex w-100"
                  value={state[DRIVER_FIELDS.NOTE]}
                  onChange={event => this.onFieldChange(DRIVER_FIELDS.NOTE, event.target.value)}
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
                    Object.keys(DRIVER_STATUS).map(x => (
                      <label htmlFor={DRIVER_STATUS[x]} style={{ whiteSpace: 'nowrap' }} key={`STATUS_${DRIVER_STATUS[x]}`}>
                        <input
                          type="radio" name="status" value={x.toString()} checked={state[DRIVER_FIELDS.STATUS].toString() === x.toString()}
                          id={DRIVER_STATUS[x]} required disabled={disableField}
                          onChange={event => this.onFieldChange(DRIVER_FIELDS.STATUS, event.target.value)}
                        />
                        { DRIVER_STATUS[x] }
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
                  {
                    modalType === MODAL_TYPE.VIEW_DRIVER ? (
                      <button
                        type="button"
                        className="popup__main__action"
                        onClick={(event) => {
                          event.preventDefault()
                          updateModalType(MODAL_TYPE.EDIT)
                        }}
                      >
                        {modalType}
                      </button>
                    ) : (
                      <button type="submit" className="popup__main__action">{modalType}</button>
                    )
                  }
                </div>
              </React.Fragment>
            )
          }
        </form>
      </Modal>
    )
  }
}

DriverModal.propTypes = {
  modalData: PropTypes.PropTypes.shape().isRequired,
  modalType: PropTypes.string,
  displayModal: PropTypes.bool,
  onAction: PropTypes.func,
  onClose: PropTypes.func,
  modalMessage: PropTypes.string,
  messageType: PropTypes.string,
  updateModalType: PropTypes.func,
}

DriverModal.defaultProps = {
  modalType: MODAL_TYPE.CREATE,
  displayModal: false,
  messageType: MESSAGE_TYPE.SUCCESS,
}

export default DriverModal
