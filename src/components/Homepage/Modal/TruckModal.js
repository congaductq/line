
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from '~/components/Common/Modal'
import { TRUCK_FIELDS, TRUCK_STATUS } from '~/constants/truck'
import { MODAL_TYPE, MESSAGE_TYPE } from '~/constants/modal'
import AutocompleteInput from '~/components/Common/AutocompleteInput'
import { DefaultDriverList, DefaultCargoTypeList } from '~/constants/default'
import { DEFAULT_DRIVER_FIELD, DRIVER_ADDITIONAL_FIELDS, DRIVER_FIELDS } from '~/constants/driver'
import { DEFAULT_CARGO_TYPE_FIELD, CARGO_TYPE_ADDITIONAL_FIELDS, CARGO_TYPE_FIELDS } from '~/constants/cargo-type'
import { get, KEYS } from '~/utils/localStorage'

const requireSymbol = <span style={{ color: 'red', marginLeft: 3, marginRight: 6 }}>*</span>

class TruckModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...Object.values(TRUCK_FIELDS).reduce((result, item) => (Object.assign(result, { [item]: props.modalData[item] || '' })), {}),
      driverList: (get(KEYS.DRIVER_DATA) || DefaultDriverList).filter(x => x[DRIVER_FIELDS.STATUS] === 1),
      cargoTypeList: (get(KEYS.CARGO_TYPE_DATA) || DefaultCargoTypeList).filter(x => x[CARGO_TYPE_FIELDS.STATUS] === 1),
    }
  }

  componentWillReceiveProps(nextProps) {
    const { modalData } = this.props
    if (nextProps.modalData !== modalData) {
      this.setState({ ...Object.values(TRUCK_FIELDS).reduce((result, item) => (Object.assign(result, { [item]: nextProps.modalData[item] || '' })), {}) })
    }
  }

  onFieldChange = (field, value) => {
    this.setState({ [field]: value })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { onAction } = this.props
    const stateToSubmit = this.state
    onAction(Object.values(TRUCK_FIELDS).reduce((result, item) => (
      Object.assign(result, { [item]: stateToSubmit[item] })), {}))
  }

  render() {
    const { driverList, cargoTypeList, ...state } = this.state
    const {
      modalType, displayModal, onClose, modalMessage, messageType,
    } = this.props

    let modalName = 'Create New Item'
    if (modalType === MODAL_TYPE.EDIT) {
      modalName = 'Edit Item'
    } else if (modalType === MODAL_TYPE.VIEW) {
      modalName = 'View Item'
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
            <div className="col-12 col-md-6 col-lg-4">
              <div className="tms-input">
                <div className="tms-input__label">
                  Truck Plate
                  {requireSymbol}
                </div>
                <input
                  id="plate"
                  type="text"
                  className="form-control d-flex w-100"
                  value={state[TRUCK_FIELDS.PLATE]}
                  onChange={event => this.onFieldChange(TRUCK_FIELDS.PLATE, event.target.value ? event.target.value.toUpperCase() : event.target.value)}
                  required="required"
                  pattern="^[0-9]{2}[A-Za-z]{1}-[0-9]{4,5}$"
                  disabled={disableField}
                  placeholder="e.g: 30C-12345"
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="tms-input">
                <div className="tms-input__label">Driver</div>
                <AutocompleteInput
                  field={TRUCK_FIELDS.DRIVER}
                  list={driverList}
                  mainSuggestionField={DEFAULT_DRIVER_FIELD}
                  additionalFields={DRIVER_ADDITIONAL_FIELDS}
                  onChange={this.onFieldChange}
                  value={state[TRUCK_FIELDS.DRIVER]}
                  disabled={disableField}
                  multiple={false}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="tms-input">
                <div className="tms-input__label">Truck Type</div>
                <input
                  type="text" className="form-control d-flex w-100"
                  value={state[TRUCK_FIELDS.TRUCK_TYPE]}
                  onChange={event => this.onFieldChange(TRUCK_FIELDS.TRUCK_TYPE, event.target.value)}
                  disabled={disableField}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="tms-input">
                <div className="tms-input__label">
                  Price
                  {requireSymbol}
                </div>
                <input
                  type="number"
                  className="form-control"
                  value={state[TRUCK_FIELDS.PRICE]}
                  onChange={event => this.onFieldChange(TRUCK_FIELDS.PRICE, event.target.value)}
                  required="required"
                  disabled={disableField}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="tms-input">
                <div className="tms-input__label">Dimension</div>
                <input
                  type="text" className="form-control d-flex w-100"
                  value={state[TRUCK_FIELDS.DIMENSION]}
                  onChange={event => this.onFieldChange(TRUCK_FIELDS.DIMENSION, event.target.value)}
                  disabled={disableField}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="tms-input">
                <div className="tms-input__label">Production Year</div>
                <input
                  type="number"
                  className="form-control"
                  value={state[TRUCK_FIELDS.PRODUCTION_YEAR]}
                  onChange={event => this.onFieldChange(TRUCK_FIELDS.PRODUCTION_YEAR, event.target.value)}
                  min="1980"
                  max="2030"
                  step="1"
                  disabled={disableField}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="tms-input">
                <div className="tms-input__label">
                  Cargo Type
                  {requireSymbol}
                  {modalType !== MODAL_TYPE.VIEW && ` (${state[TRUCK_FIELDS.CARGO_TYPE].length}/10)`}
                </div>
                <AutocompleteInput
                  field={TRUCK_FIELDS.CARGO_TYPE}
                  list={cargoTypeList}
                  mainSuggestionField={DEFAULT_CARGO_TYPE_FIELD}
                  additionalFields={CARGO_TYPE_ADDITIONAL_FIELDS}
                  onChange={this.onFieldChange}
                  value={state[TRUCK_FIELDS.CARGO_TYPE]}
                  disabled={disableField}
                  required
                  maxLength={10}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="tms-input">
                <div className="tms-input__label">
                  Parking Address
                  {modalType !== MODAL_TYPE.VIEW && ` (${state[TRUCK_FIELDS.PARKING_ADDRESS].length}/500)`}
                </div>
                <textarea
                  rows="2"
                  type="text"
                  className="form-control d-flex w-100"
                  value={state[TRUCK_FIELDS.PARKING_ADDRESS]}
                  onChange={event => this.onFieldChange(TRUCK_FIELDS.PARKING_ADDRESS, event.target.value)}
                  maxLength="500"
                  disabled={disableField}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="tms-input">
                <div className="tms-input__label">
                  Description
                  {modalType !== MODAL_TYPE.VIEW && ` (${state[TRUCK_FIELDS.DESCRIPTION].length}/200)`}
                </div>
                <textarea
                  rows="2"
                  type="text"
                  className="form-control d-flex w-100"
                  value={state[TRUCK_FIELDS.DESCRIPTION]}
                  onChange={event => this.onFieldChange(TRUCK_FIELDS.DESCRIPTION, event.target.value)}
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
                    Object.keys(TRUCK_STATUS).map(x => (
                      <label htmlFor={TRUCK_STATUS[x]} style={{ whiteSpace: 'nowrap' }} key={`STATUS_${TRUCK_STATUS[x]}`}>
                        <input
                          type="radio" name="status" value={x.toString()} checked={state[TRUCK_FIELDS.STATUS].toString() === x.toString()}
                          id={TRUCK_STATUS[x]} required disabled={disableField}
                          onChange={event => this.onFieldChange(TRUCK_FIELDS.STATUS, event.target.value)}
                        />
                        { TRUCK_STATUS[x] }
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

TruckModal.propTypes = {
  modalData: PropTypes.PropTypes.shape().isRequired,
  modalType: PropTypes.string,
  displayModal: PropTypes.bool,
  onAction: PropTypes.func,
  onClose: PropTypes.func,
  modalMessage: PropTypes.string,
  messageType: PropTypes.string,
}

TruckModal.defaultProps = {
  modalType: MODAL_TYPE.CREATE,
  displayModal: false,
  messageType: MESSAGE_TYPE.SUCCESS,
}

export default TruckModal
