
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from '~/components/Common/Modal'
import { TRUCK_FIELDS } from '~/constants/car'
import { MODAL_TYPE } from '~/constants/modal'
import AutocompleteInput from '~/components/Common/AutocompleteInput'
import { DefaultDrivers } from '~/static/data'

const requireSymbol = <span style={{ color: 'red', marginLeft: 3 }}>*</span>

class TruckModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...Object.values(TRUCK_FIELDS).reduce((result, item) => (Object.assign(result, { [item]: props.modalData[item] || '' })), {}),
      driverList: DefaultDrivers,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { modalData } = this.props
    if (nextProps.modalData !== modalData) {
      this.setState({ ...Object.values(TRUCK_FIELDS).reduce((result, item) => (Object.assign(result, { [item]: nextProps.modalData[item] || '' })), {}) })
    }
  }

  onFieldChange = (field, event) => {
    const { target: { value } } = event
    this.setState({ [field]: value })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { onClick } = this.props
    const stateToSubmit = this.state
    onClick(...Object.values(TRUCK_FIELDS).reduce((result, item) => (Object.assign(result, { [item]: stateToSubmit[item] || '' })), {}))
  }

  render() {
    const {
      plate, cargoType, driver, truckType, price, dimension, parkingAddress, productionYear, description,
      driverList,
    } = this.state
    const { modalType, displayModal, onClose } = this.props

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
        <form onSubmit={this.onSubmit} className="popup_modal">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="input-container">
                <div className="input-label">
                  Truck Plate
                  {requireSymbol}
                </div>
                <input
                  id="plate"
                  type="text"
                  className="form-control d-flex w-100"
                  value={plate}
                  onChange={event => this.onFieldChange(TRUCK_FIELDS.PLATE, event)}
                  required="required"
                  pattern="^[0-9]{2}[A-Za-z]{1}-[0-9]{4,5}$"
                  disabled={disableField}
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="input-container">
                <div className="input-label">Driver</div>
                <AutocompleteInput
                  field={TRUCK_FIELDS.DRIVER}
                  suggestion={driverList}
                  mainSuggestionField="name"
                  onChange={this.onFieldChange}
                  value={driver}
                  disabled={disableField}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="input-container">
                <div className="input-label">Truck Type</div>
                <input
                  type="text" className="form-control d-flex w-100"
                  value={truckType}
                  onChange={event => this.onFieldChange(TRUCK_FIELDS.TRUCK_TYPE, event)}
                  disabled={disableField}
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="input-container">
                <div className="input-label">
                  Price
                  {requireSymbol}
                </div>
                <input
                  type="number"
                  className="form-control"
                  value={price}
                  onChange={event => this.onFieldChange(TRUCK_FIELDS.PRICE, event)}
                  required="required"
                  disabled={disableField}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="input-container">
                <div className="input-label">Dimension</div>
                <input
                  type="text" className="form-control d-flex w-100"
                  value={dimension}
                  onChange={event => this.onFieldChange(TRUCK_FIELDS.DIMENSION, event)}
                  disabled={disableField}
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="input-container">
                <div className="input-label">Production Year</div>
                <input
                  type="number"
                  className="form-control"
                  value={productionYear}
                  onChange={event => this.onFieldChange(TRUCK_FIELDS.PRODUCTION_YEAR, event)}
                  min="1950"
                  max="2050"
                  step="1"
                  disabled={disableField}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="input-container">
                <div className="input-label">
                  Cargo Type
                  {requireSymbol}
                </div>
                <input
                  type="text"
                  className="form-control d-flex w-100"
                  value={cargoType}
                  onChange={event => this.onFieldChange(TRUCK_FIELDS.CARGO_TYPE, event)}
                  required="required"
                  disabled={disableField}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="input-container">
                <div className="input-label">Parking Address</div>
                <textarea
                  rows="2"
                  type="text"
                  className="form-control d-flex w-100"
                  value={parkingAddress}
                  onChange={event => this.onFieldChange(TRUCK_FIELDS.PARKING_ADDRESS, event)}
                  maxLength="500"
                  disabled={disableField}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="input-container">
                <div className="input-label">
                  Description
                  {` (${description.length}/200)`}
                </div>
                <textarea
                  rows="2"
                  type="text"
                  className="form-control d-flex w-100"
                  value={description}
                  onChange={event => this.onFieldChange(TRUCK_FIELDS.DESCRIPTION, event)}
                  disabled={disableField}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="input-container">
                <div className="input-label">
                  Status
                  {requireSymbol}
                </div>
                <div className="d-flex">
                  <label htmlFor="In-use">
                    <input type="radio" name="status" value="In-use" id="In-use" required disabled={disableField} />
                    In-use
                  </label>
                  <label htmlFor="New">
                    <input type="radio" name="status" value="New" id="New" disabled={disableField} />
                    New
                  </label>
                  <label htmlFor="Stopped">
                    <input type="radio" name="status" value="Stopped" id="Stopped" disabled={disableField} />
                    Stopped
                  </label>
                </div>
              </div>
            </div>
          </div>
          {
            modalType !== MODAL_TYPE.VIEW
            && (
            <div className="d-flex justify-content-center">
              <button type="submit" className="popup__main__action" style={{ marginTop: 15, textAlign: 'center' }}>{modalType}</button>
            </div>
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
  onClick: PropTypes.func,
  onClose: PropTypes.func,
}

TruckModal.defaultProps = {
  modalType: MODAL_TYPE.CREATE,
  displayModal: false,
}

export default TruckModal
