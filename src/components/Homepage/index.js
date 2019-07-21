import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Layout from '../Layout'
import Control from './Control'
import List from './List'
import TruckModal from './Modal/TruckModal'
import '~/static/less/index.less'
import {
  MODAL_TYPE, MESSAGE_TYPE, TRUCK_MODAL_MESSAGE, DRIVER_MODAL_MESSAGE,
} from '~/constants/modal'
import {
  DefaultTruckList, DefaultDriverList, createTruck, editTruck, editDriver, removeTruck,
} from '~/constants/default'
import { TRUCK_FIELDS, TRUCK_STATUS } from '~/constants/truck'
import { KEYS, get } from '~/utils/localStorage'
import { formatLargeNumber } from '~/utils/textFormatter'
import { containKeyword } from '~/utils/common'
import DriverModal from '../Driver/Modal/DriverModal'
import { DRIVER_FIELDS } from '~/constants/driver'

const EMPTY_DATA = Object.values(TRUCK_FIELDS).reduce((result, item) => (
  Object.assign(result, [TRUCK_FIELDS.CARGO_TYPE].includes(item) ? { [item]: [] } : { [item]: '' })), {})

const EMPTY_DATA_DRIVER = Object.values(DRIVER_FIELDS).reduce((result, item) => (
  Object.assign(result, { [item]: '' })), {})

class Homepage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: get(KEYS.TRUCK_DATA) || [...DefaultTruckList],
      dataDriver: get(KEYS.DRIVER_DATA) || [...DefaultDriverList],
      keyword: '',
      // TRUCK
      displayModal: false,
      modalType: MODAL_TYPE.CREATE,
      modalData: { ...EMPTY_DATA },
      messageType: MESSAGE_TYPE.SUCCESS,
      modalMessage: TRUCK_MODAL_MESSAGE.EMPTY,
      // DRIVER
      displayModalDriver: false,
      modalDataDriver: { ...EMPTY_DATA_DRIVER },
      modalTypeDriver: MODAL_TYPE.VIEW_DRIVER,
      messageTypeDriver: MESSAGE_TYPE.SUCCESS,
      modalMessageDriver: DRIVER_MODAL_MESSAGE.EMPTY,
    }
  }

  onAction = (item) => {
    const { modalType } = this.state
    if (modalType === MODAL_TYPE.CREATE) {
      this.createItemDone(item)
    } else if (modalType === MODAL_TYPE.EDIT) {
      this.editItemDone(item)
    }
  }

  createItem = () => {
    this.updateModalDisplay(true)
    this.updateModalData({ ...EMPTY_DATA })
    this.updateModalType(MODAL_TYPE.CREATE)
  }

  closeModal = () => {
    setTimeout(() => {
      this.setState({ modalMessage: TRUCK_MODAL_MESSAGE.EMPTY, displayModal: false })
    }, 800)
  }

  createItemDone = (item) => {
    const { data } = this.state
    if (data.findIndex(x => x[TRUCK_FIELDS.PLATE] === item[TRUCK_FIELDS.PLATE]) !== -1) {
      this.setState({ messageType: MESSAGE_TYPE.WARNING, modalMessage: TRUCK_MODAL_MESSAGE.PLATE_EXISTED })
    } else {
      this.setState({ data: createTruck(data, item), messageType: MESSAGE_TYPE.SUCCESS, modalMessage: TRUCK_MODAL_MESSAGE.CREATE_SUCCESS })
      this.closeModal()
    }
  }

  editItemDone = (item) => {
    const { data } = this.state
    if (data.filter(x => x[TRUCK_FIELDS.ID] !== item[TRUCK_FIELDS.ID]).findIndex(x => x[TRUCK_FIELDS.PLATE] === item[TRUCK_FIELDS.PLATE]) !== -1) {
      this.setState({ messageType: MESSAGE_TYPE.WARNING, modalMessage: TRUCK_MODAL_MESSAGE.PLATE_EXISTED })
    } else {
      const index = data.findIndex(x => x[TRUCK_FIELDS.ID] === item[TRUCK_FIELDS.ID])
      if (index !== -1) {
        this.setState({ data: editTruck(data, item, index), messageType: MESSAGE_TYPE.SUCCESS, modalMessage: TRUCK_MODAL_MESSAGE.EDIT_SUCCESS })
        this.closeModal()
      }
    }
  }

  viewItem = (item) => {
    this.updateModalDisplay(true)
    this.updateModalData(item)
    this.updateModalType(MODAL_TYPE.VIEW)
  }

  editItem = (item) => {
    this.updateModalDisplay(true)
    this.updateModalData(item)
    this.updateModalType(MODAL_TYPE.EDIT)
  }

  removeItem = (item) => {
    /* eslint-disable no-alert */
    if (window.confirm('Do you really want to remove this item?')) {
      this.setState({ data: removeTruck(item) })
    }
  }

  updateKeyword = (keyword) => {
    this.setState({ keyword })
  }

  updateModalDisplay = (displayModal) => {
    this.setState({ displayModal })
  }

  // DRIVER FUNCTIONS

  updateModalDisplayDriver = (displayModalDriver) => {
    this.setState({ displayModalDriver })
  }

  updateModalData = (modalData) => {
    this.setState({ modalData })
  }

  updateModalType = (modalType) => {
    this.setState({ modalType })
  }

  displayDriver = (id) => {
    const modalDataDriver = DefaultDriverList.find(x => x[DRIVER_FIELDS.ID] === id)
    if (modalDataDriver) {
      this.setState({ modalDataDriver, displayModalDriver: true })
    }
  }

  updateModalTypeDriver = (modalTypeDriver) => {
    this.setState({ modalTypeDriver })
  }

  editItemDoneDriver = (item) => {
    const { dataDriver } = this.state
    const index = dataDriver.findIndex(x => x[DRIVER_FIELDS.ID] === item[DRIVER_FIELDS.ID])
    if (index !== -1) {
      const { data: newData, dataTruck } = editDriver(dataDriver, item, index)
      this.setState({
        dataDriver: newData, data: dataTruck, messageTypeDriver: MESSAGE_TYPE.SUCCESS, modalMessageDriver: DRIVER_MODAL_MESSAGE.EDIT_SUCCESS,
      })
      this.closeModalDriver()
    }
  }

  closeModalDriver = () => {
    setTimeout(() => {
      this.setState({ modalMessageDriver: DRIVER_MODAL_MESSAGE.EMPTY, displayModalDriver: false, modalTypeDriver: MODAL_TYPE.VIEW_DRIVER })
    }, 800)
  }

  render() {
    const { location: { pathname }, match: { params: { page } } } = this.props

    const {
      keyword, displayModal, modalType, modalData, data: dataState, modalMessage, messageType,
      displayModalDriver, modalDataDriver, modalTypeDriver, messageTypeDriver, modalMessageDriver,
    } = this.state

    // ASSUME FILTER DATA
    const data = dataState.filter(x => (
      containKeyword(x[TRUCK_FIELDS.PLATE], keyword)
      || containKeyword(x[TRUCK_FIELDS.CARGO_TYPE].map(y => y.name).join(', '), keyword)
      || containKeyword((x[TRUCK_FIELDS.DRIVER] && x[TRUCK_FIELDS.DRIVER].name) ? x[TRUCK_FIELDS.DRIVER].name : '', keyword)
      || containKeyword(x[TRUCK_FIELDS.TRUCK_TYPE], keyword)
      || containKeyword(formatLargeNumber(x[TRUCK_FIELDS.PRICE]), keyword)
      || containKeyword(x[TRUCK_FIELDS.DIMENSION], keyword)
      || containKeyword(x[TRUCK_FIELDS.PARKING_ADDRESS], keyword)
      || containKeyword(x[TRUCK_FIELDS.PRODUCTION_YEAR].toString(), keyword)
      || containKeyword(TRUCK_STATUS[x[TRUCK_FIELDS.STATUS]], keyword)
      || containKeyword(x[TRUCK_FIELDS.DESCRIPTION], keyword)
    ))

    return (
      <Layout pathname={pathname}>
        <Control
          keyword={keyword}
          updateKeyword={this.updateKeyword}
          createItem={this.createItem}
        />
        <List
          keyword={keyword}
          viewItem={this.viewItem}
          editItem={this.editItem}
          removeItem={this.removeItem}
          data={data}
          page={page || '1'}
          displayDriver={this.displayDriver}
        />
        <TruckModal
          displayModal={displayModal}
          modalType={modalType}
          modalData={modalData}
          onAction={this.onAction}
          onClose={() => this.updateModalDisplay(false)}
          messageType={messageType}
          modalMessage={modalMessage}
        />
        <DriverModal
          displayModal={displayModalDriver}
          modalType={modalTypeDriver}
          onAction={this.editItemDoneDriver}
          modalData={modalDataDriver}
          onClose={() => this.updateModalDisplayDriver(false)}
          updateModalType={this.updateModalTypeDriver}
          messageType={messageTypeDriver}
          modalMessage={modalMessageDriver}
        />
      </Layout>
    )
  }
}

Homepage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  match: PropTypes.shape(),
}

export default Homepage
