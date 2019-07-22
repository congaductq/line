import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  TRUCK_FIELDS, TRUCK_STATUS, DEFAULT_TRUCK_SORT_FIELD, DEFAULT_TRUCK_PAGE_SIZE,
} from '~/constants/truck'
import { formatLargeNumber, highlight } from '~/utils/textFormatter'
import ViewImg from '~/static/img/view.png'
import EditImg from '~/static/img/edit.png'
import RemoveImg from '~/static/img/remove.png'
import Pagination from '../Common/Pagination'
import { DRIVER_FIELDS } from '~/constants/driver'
import { getSortClass } from '~/utils/common'

const sortData = (data, order, desc, page, size) => (data.sort((a, b) => {
  let aValue = a[order]
  let bValue = b[order]
  if (order === TRUCK_FIELDS.DRIVER) {
    aValue = a[TRUCK_FIELDS.DRIVER].name
    bValue = b[TRUCK_FIELDS.DRIVER].name
  } else if (order === TRUCK_FIELDS.CARGO_TYPE) {
    aValue = a[TRUCK_FIELDS.CARGO_TYPE].map(y => y.name).join(', ')
    bValue = b[TRUCK_FIELDS.CARGO_TYPE].map(y => y.name).join(', ')
  } else if (order === TRUCK_FIELDS.STATUS) {
    aValue = TRUCK_STATUS[a.status]
    bValue = TRUCK_STATUS[b.status]
  }
  return (aValue > bValue ? 1 : -1) * desc
}).slice((page - 1) * size, page * size))

class List extends Component {
  constructor(props) {
    super(props)

    const { page, data } = props
    const order = DEFAULT_TRUCK_SORT_FIELD
    const desc = 1
    const size = DEFAULT_TRUCK_PAGE_SIZE
    const total = data.length

    this.state = {
      order,
      desc,
      page,
      size,
      total,
      data: sortData(data, order, desc, page, size),
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data: currentData, page: currentPage } = this.props
    if (nextProps.data !== currentData || nextProps.page !== currentPage) {
      const {
        order, desc, size,
      } = this.state
      this.setState({ data: sortData(nextProps.data, order, desc, nextProps.page, size), page: nextProps.page, total: nextProps.data.length })
    }
  }

  containKeyword = (str, keyword) => !keyword || str.toLowerCase().includes(keyword.toLowerCase())

  onOrderChange = (newOrder) => {
    const {
      order, page, size,
    } = this.state
    const { data } = this.props
    let { desc } = this.state
    desc = (order === newOrder) ? -desc : 1
    this.setState({ order: newOrder, desc, data: sortData(data, newOrder, desc, page, size) })
  }

  render() {
    const {
      viewItem, editItem, removeItem, keyword, displayDriver,
    } = this.props
    const {
      data, page, total, order, desc,
    } = this.state
    const numberOfPage = Math.ceil(total / DEFAULT_TRUCK_PAGE_SIZE)
    return (
      <React.Fragment>
        <div className="list">
          <table className="home__table">
            <thead>
              <tr>
                <th className={getSortClass(order, desc, TRUCK_FIELDS.PLATE)} onClick={() => this.onOrderChange(TRUCK_FIELDS.PLATE)}>Truck plate</th>
                <th className={getSortClass(order, desc, TRUCK_FIELDS.CARGO_TYPE)} onClick={() => this.onOrderChange(TRUCK_FIELDS.CARGO_TYPE)}>Cargo type</th>
                <th className={getSortClass(order, desc, TRUCK_FIELDS.DRIVER)} onClick={() => this.onOrderChange(TRUCK_FIELDS.DRIVER)}>Driver</th>
                <th className={getSortClass(order, desc, TRUCK_FIELDS.TRUCK_TYPE)} onClick={() => this.onOrderChange(TRUCK_FIELDS.TRUCK_TYPE)}>Truck type</th>
                <th className={getSortClass(order, desc, TRUCK_FIELDS.PRICE)} onClick={() => this.onOrderChange(TRUCK_FIELDS.PRICE)}>Price</th>
                <th className={getSortClass(order, desc, TRUCK_FIELDS.DIMENSION)} onClick={() => this.onOrderChange(TRUCK_FIELDS.DIMENSION)}>Dimension (L-W-H)</th>
                <th className={getSortClass(order, desc, TRUCK_FIELDS.PARKING_ADDRESS)} onClick={() => this.onOrderChange(TRUCK_FIELDS.PARKING_ADDRESS)}>Parking Address</th>
                <th className={getSortClass(order, desc, TRUCK_FIELDS.PRODUCTION_YEAR)} onClick={() => this.onOrderChange(TRUCK_FIELDS.PRODUCTION_YEAR)}>Prod. year</th>
                <th className={getSortClass(order, desc, TRUCK_FIELDS.STATUS)} onClick={() => this.onOrderChange(TRUCK_FIELDS.STATUS)}>Status</th>
                <th className={getSortClass(order, desc, TRUCK_FIELDS.DESCRIPTION)} onClick={() => this.onOrderChange(TRUCK_FIELDS.DESCRIPTION)}>Description</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {
                data.map(x => (
                  <tr key={x[TRUCK_FIELDS.PLATE]}>
                    <td dangerouslySetInnerHTML={{ __html: highlight(x[TRUCK_FIELDS.PLATE], keyword) }} />
                    <td dangerouslySetInnerHTML={{ __html: highlight(x[TRUCK_FIELDS.CARGO_TYPE].length === 0 ? '' : x[TRUCK_FIELDS.CARGO_TYPE].map(y => y.name).join(', '), keyword) }} />
                    <td
                      role="presentation"
                      dangerouslySetInnerHTML={{ __html: highlight((x[TRUCK_FIELDS.DRIVER] && x[TRUCK_FIELDS.DRIVER].name) ? x[TRUCK_FIELDS.DRIVER].name : '', keyword) }}
                      onClick={() => displayDriver(x[TRUCK_FIELDS.DRIVER][DRIVER_FIELDS.ID])}
                    />
                    <td dangerouslySetInnerHTML={{ __html: highlight(x[TRUCK_FIELDS.TRUCK_TYPE], keyword) }} />
                    <td dangerouslySetInnerHTML={{ __html: highlight(formatLargeNumber(x[TRUCK_FIELDS.PRICE]), keyword) }} />
                    <td dangerouslySetInnerHTML={{ __html: highlight(x[TRUCK_FIELDS.DIMENSION], keyword) }} />
                    <td dangerouslySetInnerHTML={{ __html: highlight(x[TRUCK_FIELDS.PARKING_ADDRESS], keyword) }} />
                    <td dangerouslySetInnerHTML={{ __html: highlight(x[TRUCK_FIELDS.PRODUCTION_YEAR].toString(), keyword) }} />
                    <td className={x[TRUCK_FIELDS.STATUS] === 3 ? 'text-red' : (x[TRUCK_FIELDS.STATUS] === 2 ? 'text-blue' : 'text-normal')} dangerouslySetInnerHTML={{ __html: highlight(TRUCK_STATUS[x[TRUCK_FIELDS.STATUS]], keyword) }} />
                    <td dangerouslySetInnerHTML={{ __html: highlight(x[TRUCK_FIELDS.DESCRIPTION], keyword) }} />
                    <td className="d-flex justify-content-center">
                      <img
                        className="list__action"
                        src={ViewImg} alt="View"
                        role="presentation"
                        onClick={() => viewItem(x)}
                      />
                      <img
                        className="list__action"
                        src={EditImg} alt="Edit"
                        role="presentation"
                        onClick={() => editItem(x)}
                      />
                      <img
                        className="list__action"
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
        <Pagination
          url="/page"
          numberOfPage={numberOfPage}
          page={page}
          disabled={total === 0}
        />
      </React.Fragment>
    )
  }
}


List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  viewItem: PropTypes.func,
  editItem: PropTypes.func,
  removeItem: PropTypes.func,
  keyword: PropTypes.string,
  page: PropTypes.string,
  displayDriver: PropTypes.func,
}

export default List
