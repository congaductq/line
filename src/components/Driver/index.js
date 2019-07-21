import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Layout from '../Layout'
import Control from './Control'
import List from './List'
import DriverModal from './Modal/DriverModal'
import '~/static/less/driver.less'
import { MODAL_TYPE, MESSAGE_TYPE, DRIVER_MODAL_MESSAGE } from '~/constants/modal'
import {
  DefaultDriverList, createDriver, removeDriver, editDriver,
} from '~/constants/default'
import { DRIVER_FIELDS, DRIVER_STATUS } from '~/constants/driver'
import { KEYS, get } from '~/utils/localStorage'
import { containKeyword } from '~/utils/common'
import { DISPLAY_TYPE } from '~/constants/common'

const EMPTY_DATA = Object.values(DRIVER_FIELDS).reduce((result, item) => (
  Object.assign(result, [DRIVER_FIELDS.DRIVER, DRIVER_FIELDS.CARGO_TYPE].includes(item) ? { [item]: [] } : { [item]: '' })), {})

class DriverPage extends Component {
  constructor(props) {
    super(props)

    const { match: { params: { id, displayType } } } = props

    const data = get(KEYS.DRIVER_DATA) || [...DefaultDriverList]
    let modalData = { ...EMPTY_DATA }
    let modalType = MODAL_TYPE.CREATE
    let displayModal = false
    if (id) {
      const modalDataById = data.find(x => x[DRIVER_FIELDS.ID] === parseInt(id, 10))
      if (modalDataById) {
        modalData = modalDataById
        modalType = displayType === DISPLAY_TYPE.EDIT ? MODAL_TYPE.EDIT : DISPLAY_TYPE.VIEW
        displayModal = true
      }
    }

    this.state = {
      data,
      keyword: '',
      displayModal,
      modalType,
      modalData,
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
    const nextId = dataProps.reduce((result, item) => Math.max(result, item[DRIVER_FIELDS.ID]), 0) + 1
    return (Object.assign(data, { id: nextId }))
  }

  closeModal = () => {
    setTimeout(() => {
      this.setState({ modalMessage: DRIVER_MODAL_MESSAGE.EMPTY, displayModal: false })
    }, 800)
  }

  createItemDone = (item) => {
    const { data } = this.state
    this.setState({ data: createDriver(data, item), messageType: MESSAGE_TYPE.SUCCESS, modalMessage: DRIVER_MODAL_MESSAGE.CREATE_SUCCESS })
    this.closeModal()
  }

  editItemDone = (item) => {
    const { data } = this.state
    const index = data.findIndex(x => x[DRIVER_FIELDS.ID] === item[DRIVER_FIELDS.ID])
    if (index !== -1) {
      const { data: dataDriver } = editDriver(data, item, index)
      this.setState({ data: dataDriver, messageType: MESSAGE_TYPE.SUCCESS, modalMessage: DRIVER_MODAL_MESSAGE.EDIT_SUCCESS })
      this.closeModal()
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
      this.setState({ data: removeDriver(item) })
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
      containKeyword(x[DRIVER_FIELDS.NAME], keyword)
      || containKeyword(x[DRIVER_FIELDS.YEAR_OF_BIRTH].toString(), keyword)
      || containKeyword(x[DRIVER_FIELDS.LICENSE_ID], keyword)
      || containKeyword(x[DRIVER_FIELDS.ADDRESS], keyword)
      || containKeyword(x[DRIVER_FIELDS.NOTE], keyword)
      || containKeyword(DRIVER_STATUS[x[DRIVER_FIELDS.STATUS]], keyword)
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
        <DriverModal
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

DriverPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  match: PropTypes.shape(),
}

export default DriverPage
