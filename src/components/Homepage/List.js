import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TRUCK_FIELDS } from '~/constants/car'
import { formatLargeNumber, highlight } from '~/components/utils/textFormatter'
import ViewImg from '~/static/img/view.png'
import EditImg from '~/static/img/edit.png'
import RemoveImg from '~/static/img/remove.png'

const sort = (data, order, desc) => (data.sort((a, b) => ((a[order] > b[order]) ? 1 : -1) * desc))
class List extends Component {
  constructor(props) {
    super(props)

    const order = TRUCK_FIELDS.PLATE
    const desc = 1

    this.state = {
      order,
      desc,
      data: sort(props.data, order, desc),
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data } = this.props
    if (nextProps.data !== data) {
      const { order, desc } = this.state
      this.setState({ data: sort(nextProps.data, order, desc) })
    }
  }

  containKeyword = (str, keyword) => !keyword || str.toLowerCase().includes(keyword.toLowerCase())


  onOrderChange = (newOrder) => {
    const { data, order } = this.state
    let { desc } = this.state
    desc = (order === newOrder) ? -desc : 1
    this.setState({ order: newOrder, desc, data: sort(data, newOrder, desc) })
  }

  render() {
    const {
      viewItem, editItem, removeItem, keyword,
    } = this.props
    const { data } = this.state
    return (
      <div className="home__list">
        <table className="home__table">
          <thead>
            <tr>
              <th onClick={() => this.onOrderChange(TRUCK_FIELDS.PLATE)}>Truck plate</th>
              <th onClick={() => this.onOrderChange(TRUCK_FIELDS.CARGO_TYPE)}>Cargo type</th>
              <th onClick={() => this.onOrderChange(TRUCK_FIELDS.DRIVER)}>Driver</th>
              <th onClick={() => this.onOrderChange(TRUCK_FIELDS.TRUCK_TYPE)}>Truck type</th>
              <th onClick={() => this.onOrderChange(TRUCK_FIELDS.PRICE)}>Price</th>
              <th onClick={() => this.onOrderChange(TRUCK_FIELDS.DIMENSION)}>Dimension (L-W-H)</th>
              <th onClick={() => this.onOrderChange(TRUCK_FIELDS.PARKING_ADDRESS)}>Parking Address</th>
              <th onClick={() => this.onOrderChange(TRUCK_FIELDS.PRODUCTION_YEAR)}>Prod. year</th>
              <th onClick={() => this.onOrderChange(TRUCK_FIELDS.STATUS)}>Status</th>
              <th onClick={() => this.onOrderChange(TRUCK_FIELDS.DESCRIPTION)}>Description</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {
              data.map(x => (
                <tr key={x.plate}>
                  <td dangerouslySetInnerHTML={{ __html: highlight(x.plate, keyword) }} />
                  <td dangerouslySetInnerHTML={{ __html: highlight(!x.cargoType ? '' : x.cargoType.join(', '), keyword) }} />
                  <td dangerouslySetInnerHTML={{ __html: highlight(x.driver, keyword) }} />
                  <td dangerouslySetInnerHTML={{ __html: highlight(x.truckType, keyword) }} />
                  <td dangerouslySetInnerHTML={{ __html: highlight(formatLargeNumber(x.price), keyword) }} />
                  <td dangerouslySetInnerHTML={{ __html: highlight(x.dimension, keyword) }} />
                  <td dangerouslySetInnerHTML={{ __html: highlight(x.parkingAddress, keyword) }} />
                  <td dangerouslySetInnerHTML={{ __html: highlight(x.productionYear.toString(), keyword) }} />
                  <td className={x.status === 'Stopped' ? 'stop' : (x.status === 'New' ? 'new' : 'use')} dangerouslySetInnerHTML={{ __html: highlight(x.status, keyword) }} />
                  <td dangerouslySetInnerHTML={{ __html: highlight(x.description, keyword) }} />
                  <td className="d-flex justify-content-center">
                    <img
                      className="home__action"
                      src={ViewImg} alt="View"
                      role="presentation"
                      onClick={() => viewItem(x)}
                    />
                    <img
                      className="home__action"
                      src={EditImg} alt="Edit"
                      role="presentation"
                      onClick={() => editItem(x)}
                    />
                    <img
                      className="home__action"
                      src={RemoveImg} alt="Remove"
                      role="presentation"
                      onClick={() => removeItem(x)}
                    />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}


List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  viewItem: PropTypes.func,
  editItem: PropTypes.func,
  removeItem: PropTypes.func,
  keyword: PropTypes.string,
}

export default List
