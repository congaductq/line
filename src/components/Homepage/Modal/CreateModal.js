
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Model from '~/components/Common/Modal'
import { FEILDS } from '~/constants/car'

class CreateModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...Object.values(FEILDS).reduce((result, item) => (Object.assign(result, { [item]: '', [`${item}Error`]: '' })), {}),
    }
  }

  onPlateChange = (event) => {
    const { target: { value } } = event
    this.setState({ plate: value, plateError: value === '' ? '' : 'vc' })
  }

  onProductionYearChange = (event) => {
    const { target: { value } } = event
    this.setState({ productionYear: value })
  }

  // const stateToCheck = this.state
  // const clear = Object.keys(this.state).filter(x => x.includes('Error')).reduce((result, item) => (result && stateToCheck[item] === ''), true)

  render() {
    const { plate, productionYear, plateError } = this.state
    const { onCreate } = this.props
    return (
      <Model
        display="Create New"
        header="Create New Item"
      >
        <form onSubmit={onCreate}>
          <input
            type="text" className="form-control"
            value={plate}
            onChange={event => this.onPlateChange(event)}
            required="required"
          />
          <div>{plateError}</div>
          <input
            type="number" className="form-control"
            value={productionYear}
            onChange={event => this.onProductionYearChange(event)}
            required="required"
          />
          <button type="submit" className="popup-button" style={{ marginTop: 15 }}>Create</button>
        </form>
      </Model>
    )
  }
}

CreateModal.propTypes = {
  onCreate: PropTypes.func,
}

export default CreateModal
