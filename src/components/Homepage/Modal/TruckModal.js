
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from '~/components/Common/Modal'
import { TRUCK_FIELDS } from '~/constants/truck'
import { MODAL_TYPE, MESSAGE_TYPE } from '~/constants/modal'
import AutocompleteInput from '~/components/Common/AutocompleteInput'
import {
  DefaultDrivers, DefaultCargoType, DEFAULT_DRIVER_FIELD, DEFAULT_CARGO_TYPE_FIELD,
} from '~/static/data'

const requireSymbol = <span style={{ color: 'red', marginLeft: 3, marginRight: 6 }}>*</span>

class TruckModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...Object.values(TRUCK_FIELDS).reduce((result, item) => (Object.assign(result, { [item]: props.modalData[item] || '' })), {}),
      driverList: DefaultDrivers,
      cargoTypeList: DefaultCargoType,
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
    const {
      plate, cargoType, driver, truckType, price, dimension, parkingAddress, productionYear, description, status,
      driverList, cargoTypeList,
    } = this.state
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
                  value={plate}
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
                  onChange={this.onFieldChange}
                  value={driver}
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
                  value={truckType}
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
                  value={price}
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
                  value={dimension}
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
                  value={productionYear}
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
                  {` (${cargoType.length}/10)`}
                </div>
                <AutocompleteInput
                  field={TRUCK_FIELDS.CARGO_TYPE}
                  list={cargoTypeList}
                  mainSuggestionField={DEFAULT_CARGO_TYPE_FIELD}
                  onChange={this.onFieldChange}
                  value={cargoType}
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
                  {` (${parkingAddress.length}/500)`}
                </div>
                <textarea
                  rows="2"
                  type="text"
                  className="form-control d-flex w-100"
                  value={parkingAddress}
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
                  {` (${description.length}/200)`}
                </div>
                <textarea
                  rows="2"
                  type="text"
                  className="form-control d-flex w-100"
                  value={description}
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
                  <label htmlFor="In-use" style={{ whiteSpace: 'nowrap' }}>
                    <input
                      type="radio" name="status" value="1" checked={status.toString() === '1'}
                      id="In-use" required disabled={disableField}
                      onChange={event => this.onFieldChange(TRUCK_FIELDS.STATUS, event.target.value)}
                    />
                    In-use
                  </label>
                  <label htmlFor="New">
                    <input
                      type="radio" name="status" value="2" checked={status.toString() === '2'}
                      id="New" disabled={disableField}
                      onChange={event => this.onFieldChange(TRUCK_FIELDS.STATUS, event.target.value)}
                    />
                    New
                  </label>
                  <label htmlFor="Stopped">
                    <input
                      type="radio" name="status" value="3" checked={status === '3'}
                      id="Stopped" disabled={disableField}
                      onChange={event => this.onFieldChange(TRUCK_FIELDS.STATUS.toString(), event.target.value)}
                    />
                    Stopped
                  </label>
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
