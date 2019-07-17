import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Layout from '../Layout'
import Control from './Control'
import List from './List'
import TruckModal from './Modal/TruckModal'
import '~/static/less/index.less'
import { MODAL_TYPE } from '~/constants/modal'
import DefaultList from '~/static/data'
import { TRUCK_FIELDS } from '~/constants/car'
import { KEYS, get, set } from '../utils/localStorage'
import { formatLargeNumber } from '../utils/textFormatter'

const EMPTY_DATA = Object.values(TRUCK_FIELDS).reduce((result, item) => (Object.assign(result, { [item]: '' })), {})

class Homepage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      keyword: '',
      data: get(KEYS.TRUCK_DATA) || DefaultList,
      displayModal: false,
      modalType: MODAL_TYPE.CREATE,
      modalData: EMPTY_DATA,
    }
  }

  containKeyword = (str, keyword) => !keyword || str.toString().toLowerCase().includes(keyword.toLowerCase())

  onAction = () => {
    const { modalType } = this.state
    if (modalType === MODAL_TYPE.CREATE) {
      this.editItemDone(item)
    } else if (modalType === MODAL_TYPE.CREATE) {
      this.editItemDone(item)
    }
  }

  createItem = () => {
    this.updateModalDisplay(true)
    this.updateModalData(EMPTY_DATA)
    this.updateModalType(MODAL_TYPE.CREATE)
  }

  editItemDone = (item) => {
    console.log(item)
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

  editItemDone = (item) => {
    console.log(item)
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
    const { location: { pathname } } = this.props
    const {
      keyword, displayModal, modalType, modalData, data,
    } = this.state
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
          data={data.filter(x => (
            this.containKeyword(x.plate, keyword)
            || this.containKeyword(x.cargoType.join(', '), keyword)
            || this.containKeyword(x.driver, keyword)
            || this.containKeyword(x.truckType, keyword)
            || this.containKeyword(formatLargeNumber(x.price), keyword)
            || this.containKeyword(x.dimension, keyword)
            || this.containKeyword(x.parkingAddress, keyword)
            || this.containKeyword(x.productionYear.toString(), keyword)
            || this.containKeyword(x.status, keyword)
            || this.containKeyword(x.description, keyword)
          ))}
        />
        <TruckModal
          displayModal={displayModal}
          modalType={modalType}
          modalData={modalData}
          onAction={this.onAction}
          onClose={() => this.updateModalDisplay(false)}
        />
      </Layout>
    )
  }
}

Homepage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default Homepage
