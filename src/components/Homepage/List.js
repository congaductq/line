import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { TRUCK_FIELDS } from '~/constants/car'
import { formatLargeNumber, highlight } from '~/components/utils/textFormatter'
import ViewImg from '~/static/img/view.png'
import EditImg from '~/static/img/edit.png'
import RemoveImg from '~/static/img/remove.png'
import { STATUS } from '~/static/data'

const DEFAULT_SIZE = 10

const sortData = (data, order, desc, page, size) => (data.sort((a, b) => {
  let aValue = a[order]
  let bValue = b[order]
  if (order === TRUCK_FIELDS.DRIVER) {
    aValue = a.driver.name
    bValue = b.driver.name
  } else if (order === TRUCK_FIELDS.CARGO_TYPE) {
    aValue = a.cargoType.map(y => y.name).join(', ')
    bValue = b.cargoType.map(y => y.name).join(', ')
  } else if (order === TRUCK_FIELDS.STATUS) {
    aValue = STATUS[a.status]
    bValue = STATUS[b.status]
  }
  return (aValue > bValue ? 1 : -1) * desc
}).slice((page - 1) * size, page * size))

class List extends Component {
  constructor(props) {
    super(props)

    const { page, data } = props
    const order = TRUCK_FIELDS.PLATE
    const desc = 1
    const size = DEFAULT_SIZE
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
      this.setState({ data: sortData(nextProps.data, order, desc, nextProps.page, size), page: nextProps.page })
    }
  }

  containKeyword = (str, keyword) => !keyword || str.toLowerCase().includes(keyword.toLowerCase())


  onOrderChange = (newOrder) => {
    const {
      data, order, page, size,
    } = this.state
    let { desc } = this.state
    desc = (order === newOrder) ? -desc : 1
    this.setState({ order: newOrder, desc, data: sortData(data, newOrder, desc, page, size) })
  }

  render() {
    const {
      viewItem, editItem, removeItem, keyword,
    } = this.props
    const { data, page, total } = this.state
    const numberOfPage = Math.ceil(total / DEFAULT_SIZE)
    return (
      <React.Fragment>
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
                    <td dangerouslySetInnerHTML={{ __html: highlight(x.cargoType.length === 0 ? '' : x.cargoType.map(y => y.name).join(', '), keyword) }} />
                    <td dangerouslySetInnerHTML={{ __html: highlight(x.driver.name, keyword) }} />
                    <td dangerouslySetInnerHTML={{ __html: highlight(x.truckType, keyword) }} />
                    <td dangerouslySetInnerHTML={{ __html: highlight(formatLargeNumber(x.price), keyword) }} />
                    <td dangerouslySetInnerHTML={{ __html: highlight(x.dimension, keyword) }} />
                    <td dangerouslySetInnerHTML={{ __html: highlight(x.parkingAddress, keyword) }} />
                    <td dangerouslySetInnerHTML={{ __html: highlight(x.productionYear.toString(), keyword) }} />
                    <td className={x.status === 3 ? 'text-red' : (x.status === 2 ? 'text-blue' : 'text-normal')} dangerouslySetInnerHTML={{ __html: highlight(STATUS[x.status], keyword) }} />
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
        <div className="pagination">
          <nav aria-label="...">
            <ul className="pagination">
              <li className={`page-item ${page === '1' ? ' disabled' : ''}`}>
                <Link className="page-link" to={`/${parseInt(page, 10) - 1}`}>Previous</Link>
              </li>
              {
                Array.from(Array(numberOfPage).keys()).map(x => (
                  <li key={`page_${x}`} className={`page-item${page === (x + 1).toString() ? ' active' : ''}`}>
                    <Link className="page-link" to={`/${x + 1}`}>{x + 1}</Link>
                  </li>
                ))
              }
              <li className={`page-item ${page === '2' ? ' disabled' : ''}`}>
                <Link className="page-link" to={`/${parseInt(page, 10) + 1}`}>Next</Link>
              </li>
            </ul>
          </nav>
        </div>
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
}

export default List
