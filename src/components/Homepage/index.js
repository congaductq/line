import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Layout from '../Layout'
import Control from './Control'
import List from './List'
import TruckModal from './Modal/TruckModal'
import '~/static/less/index.less'
import { MODAL_TYPE, MESSAGE_TYPE, TRUCK_MODAL_MESSAGE } from '~/constants/modal'
import DefaultTruckList, { STATUS } from '~/static/data'
import { TRUCK_FIELDS } from '~/constants/truck'
import { KEYS, get, set } from '../utils/localStorage'
import { formatLargeNumber } from '../utils/textFormatter'
import { containKeyword } from '../utils/common'

const EMPTY_DATA = Object.values(TRUCK_FIELDS).reduce((result, item) => (
  Object.assign(result, [TRUCK_FIELDS.DRIVER, TRUCK_FIELDS.CARGO_TYPE].includes(item) ? { [item]: [] } : { [item]: '' })), {})

class Homepage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: get(KEYS.TRUCK_DATA) || [...DefaultTruckList],
      keyword: '',
      displayModal: false,
      modalType: MODAL_TYPE.CREATE,
      modalData: { ...EMPTY_DATA },
      messageType: MESSAGE_TYPE.SUCCESS,
      modalMessage: '',
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

  convertItemToSubmit = (data) => {
    const { data: dataProps } = this.state
    const nextId = dataProps.reduce((result, item) => Math.max(result, item.id), 0) + 1
    return (Object.assign(data, { id: nextId }))
  }

  closeModal = () => {
    setTimeout(() => {
      this.setState({ modalMessage: TRUCK_MODAL_MESSAGE.EMPTY, displayModal: false })
    }, 1100)
  }

  createItemDone = (item) => {
    const { data } = this.state
    if (data.findIndex(x => x.plate === item.plate) !== -1) {
      this.setState({ messageType: MESSAGE_TYPE.WARNING, modalMessage: TRUCK_MODAL_MESSAGE.PLATE_EXISTED })
    } else {
      const newData = [...data, this.convertItemToSubmit(item)]
      this.setState({ data: newData, messageType: MESSAGE_TYPE.SUCCESS, modalMessage: TRUCK_MODAL_MESSAGE.CREATE_SUCCESS })
      set(KEYS.TRUCK_DATA, newData)
      this.closeModal()
    }
  }

  editItemDone = (item) => {
    const { data } = this.state
    if (data.filter(x => x.id !== item.id).findIndex(x => x.plate === item.plate) !== -1) {
      this.setState({ messageType: MESSAGE_TYPE.WARNING, modalMessage: TRUCK_MODAL_MESSAGE.PLATE_EXISTED })
    } else {
      const index = data.findIndex(x => x.id === item.id)
      if (index !== -1) {
        const newData = [...data.slice(0, index), this.convertItemToSubmit(item), ...data.slice(index + 1, data.length + 1)]
        this.setState({ data: newData, messageType: MESSAGE_TYPE.SUCCESS, modalMessage: TRUCK_MODAL_MESSAGE.EDIT_SUCCESS })
        set(KEYS.TRUCK_DATA, newData)
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
    const { data } = this.state
    /* eslint-disable no-alert */
    if (window.confirm('Do you really want to remove this item?')) {
      set(KEYS.TRUCK_DATA, data.filter(x => x.id !== item.id))
      this.setState({ data: data.filter(x => x.id !== item.id) })
    }
  }

  updateKeyword = (keyword) => {
    this.setState({ keyword })
  }

  updateModalDisplay = (displayModal) => {
    this.setState({ displayModal })
  }

  updateModalData = (modalData) => {
    this.setState({ modalData })
  }

  updateModalType = (modalType) => {
    this.setState({ modalType })
  }

  render() {
    const { location: { pathname }, match: { params: { page } } } = this.props
    const {
      keyword, displayModal, modalType, modalData, data: dataState, modalMessage, messageType,
    } = this.state

    // ASSUME FILTER DATA
    const data = dataState.filter(x => (
      containKeyword(x.plate, keyword)
      || containKeyword(x.cargoType.map(y => y.name).join(', '), keyword)
      || containKeyword((x.driver && x.driver.name) ? x.driver.name : '', keyword)
      || containKeyword(x.truckType, keyword)
      || containKeyword(formatLargeNumber(x.price), keyword)
      || containKeyword(x.dimension, keyword)
      || containKeyword(x.parkingAddress, keyword)
      || containKeyword(x.productionYear.toString(), keyword)
      || containKeyword(STATUS[x.status], keyword)
      || containKeyword(x.description, keyword)
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
      </Layout>
    )
  }
}

Homepage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape().isRequired,
}


export default Homepage
