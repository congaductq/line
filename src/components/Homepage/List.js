import React, { Component } from 'react'
import DefaultList from '~/static/data'
import { FEILDS } from '~/constants/car'
import CreateModal from './Modal/CreateModal'

export default class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: DefaultList,
      order: 'plate',
      desc: 1,
    }
  }

  onOrderChange = (newOrder) => {
    const { data, order } = this.state
    let { desc } = this.state
    desc = (order === newOrder) ? -desc : 1
    this.setState({ order: newOrder, desc, data: data.sort((a, b) => ((a[newOrder] > b[newOrder]) ? 1 : -1) * desc) })
  }

  render() {
    const { data } = this.state
    return (
      <div className="home-list">
        <table className="home-table">
          <thead>
            <tr>
              <th onClick={() => this.onOrderChange(FEILDS.PLATE)}>Truck plate</th>
              <th onClick={() => this.onOrderChange(FEILDS.CARGO_TYPE)}>Cargo type</th>
              <th onClick={() => this.onOrderChange(FEILDS.DRIVER)}>Driver</th>
              <th onClick={() => this.onOrderChange(FEILDS.TRUCK_TYPE)}>Truck type</th>
              <th onClick={() => this.onOrderChange(FEILDS.PRICE)}>Price</th>
              <th onClick={() => this.onOrderChange(FEILDS.DIMENSION)}>Dimension (L-W-H)</th>
              <th onClick={() => this.onOrderChange(FEILDS.PARKING_ADDRESS)}>Parking Adderss</th>
              <th onClick={() => this.onOrderChange(FEILDS.PRODUCTION_YEAR)}>Production year</th>
              <th onClick={() => this.onOrderChange(FEILDS.STATUS)}>Status</th>
              <th onClick={() => this.onOrderChange(FEILDS.DESCRIPTION)}>Description</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map(x => (
                <tr key={x.plate}>
                  <td>{x.plate}</td>
                  <td>{x.cargoType}</td>
                  <td>{x.driver}</td>
                  <td>{x.truckType}</td>
                  <td>{x.price}</td>
                  <td>{x.dimension}</td>
                  <td>{x.parkingAddress}</td>
                  <td>{x.productionYear}</td>
                  <td style={{ color: x.status === 'Stopped' ? '#f44336' : (x.status === 'New' ? '#4caf50' : 'inherit') }}>{x.status}</td>
                  <td>{x.description}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <CreateModal onCreate={this.onCreate} />
      </div>
    )
  }
}
