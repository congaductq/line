import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Layout from '../Layout'
import Control from './Control'
import List from './List'
import DriverModal from './Modal/CargoTypeModal'
import '~/static/less/cargo-type.less'
import { MODAL_TYPE, MESSAGE_TYPE, CARGO_TYPE_MODAL_MESSAGE } from '~/constants/modal'
import {
  DefaultCargoTypeList, createCargoType, removeCargoType, editCargoType,
} from '~/utils/action'
import { KEYS, get } from '~/utils/localStorage'
import { containKeyword } from '~/utils/common'
import { CARGO_TYPE_FIELDS, CARGO_TYPE_STATUS } from '~/constants/cargo-type'

const EMPTY_DATA = Object.values(CARGO_TYPE_FIELDS).reduce((result, item) => (
  Object.assign(result, [CARGO_TYPE_FIELDS.DRIVER, CARGO_TYPE_FIELDS.CARGO_TYPE].includes(item) ? { [item]: [] } : { [item]: '' })), {})

class CargoTypePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: get(KEYS.CARGO_TYPE_DATA) || [...DefaultCargoTypeList],
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
    const nextId = dataProps.reduce((result, item) => Math.max(result, item[CARGO_TYPE_FIELDS.ID]), 0) + 1
    return (Object.assign(data, { id: nextId }))
  }

  closeModal = () => {
    setTimeout(() => {
      this.setState({ modalMessage: CARGO_TYPE_MODAL_MESSAGE.EMPTY, displayModal: false })
    }, 800)
  }

  createItemDone = (item) => {
    const { data } = this.state
    if (data.findIndex(x => x[CARGO_TYPE_FIELDS.NAME] === item[CARGO_TYPE_FIELDS.NAME]) !== -1) {
      this.setState({ messageType: MESSAGE_TYPE.WARNING, modalMessage: CARGO_TYPE_MODAL_MESSAGE.NAME_EXISTED })
    } else {
      this.setState({ data: createCargoType(data, item), messageType: MESSAGE_TYPE.SUCCESS, modalMessage: CARGO_TYPE_MODAL_MESSAGE.CREATE_SUCCESS })
      this.closeModal()
    }
  }

  editItemDone = (item) => {
    const { data } = this.state
    const result = editCargoType(data, item)
    if (result === null) {
      this.setState({ messageType: MESSAGE_TYPE.WARNING, modalMessage: CARGO_TYPE_MODAL_MESSAGE.NAME_EXISTED })
    } else {
      const { data: dataCargoType } = result
      this.setState({ data: dataCargoType, messageType: MESSAGE_TYPE.SUCCESS, modalMessage: CARGO_TYPE_MODAL_MESSAGE.EDIT_SUCCESS })
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
      const { data } = this.state
      this.setState({ data: removeCargoType(data, item) })
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
      containKeyword(x[CARGO_TYPE_FIELDS.NAME], keyword)
      || containKeyword(x[CARGO_TYPE_FIELDS.DESCRIPTION], keyword)
      || containKeyword(x[CARGO_TYPE_FIELDS.NOTE], keyword)
      || containKeyword(CARGO_TYPE_STATUS[x[CARGO_TYPE_FIELDS.STATUS]], keyword)
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

CargoTypePage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  match: PropTypes.shape(),
}

export default CargoTypePage
