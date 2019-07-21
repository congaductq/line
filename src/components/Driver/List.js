import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  DRIVER_FIELDS, DRIVER_STATUS, DEFAULT_DRIVER_SORT_FIELD, DEFAULT_DRIVER_PAGE_SIZE,
} from '~/constants/driver'
import { highlight } from '~/utils/textFormatter'
import ViewImg from '~/static/img/view.png'
import EditImg from '~/static/img/edit.png'
import RemoveImg from '~/static/img/remove.png'
import Pagination from '../Common/Pagination'
import { getSortClass } from '~/utils/common'

const sortData = (data, order, desc, page, size) => (data.sort((a, b) => {
  let aValue = a[order]
  let bValue = b[order]
  if (order === DRIVER_FIELDS.STATUS) {
    aValue = DRIVER_STATUS[a.status]
    bValue = DRIVER_STATUS[b.status]
  }
  return (aValue > bValue ? 1 : -1) * desc
}).slice((page - 1) * size, page * size))

class List extends Component {
  constructor(props) {
    super(props)

    const { page, data } = props
    const order = DEFAULT_DRIVER_SORT_FIELD
    const desc = 1
    const size = DEFAULT_DRIVER_PAGE_SIZE
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
    const {
      data, page, total, order, desc,
    } = this.state
    const numberOfPage = Math.ceil(total / DEFAULT_DRIVER_PAGE_SIZE)
    return (
      <React.Fragment>
        <div className="list">
          <table className="driver__table">
            <thead>
              <tr>
                <th className={getSortClass(order, desc, DRIVER_FIELDS.NAME)} onClick={() => this.onOrderChange(DRIVER_FIELDS.NAME)}>Name</th>
                <th className={getSortClass(order, desc, DRIVER_FIELDS.YEAR_OF_BIRTH)} onClick={() => this.onOrderChange(DRIVER_FIELDS.YEAR_OF_BIRTH)}>Year Of Birth</th>
                <th className={getSortClass(order, desc, DRIVER_FIELDS.LICENSE_ID)} onClick={() => this.onOrderChange(DRIVER_FIELDS.LICENSE_ID)}>License ID</th>
                <th className={getSortClass(order, desc, DRIVER_FIELDS.ADDRESS)} onClick={() => this.onOrderChange(DRIVER_FIELDS.ADDRESS)}>Address</th>
                <th className={getSortClass(order, desc, DRIVER_FIELDS.NOTE)} onClick={() => this.onOrderChange(DRIVER_FIELDS.NOTE)}>Note</th>
                <th className={getSortClass(order, desc, DRIVER_FIELDS.STATUS)} onClick={() => this.onOrderChange(DRIVER_FIELDS.STATUS)}>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {
                data.map(x => (
                  <tr key={x[DRIVER_FIELDS.NAME]}>
                    <td dangerouslySetInnerHTML={{ __html: highlight(x[DRIVER_FIELDS.NAME], keyword) }} />
                    <td dangerouslySetInnerHTML={{ __html: highlight(x[DRIVER_FIELDS.YEAR_OF_BIRTH].toString(), keyword) }} />
                    <td dangerouslySetInnerHTML={{ __html: highlight(x[DRIVER_FIELDS.LICENSE_ID], keyword) }} />
                    <td dangerouslySetInnerHTML={{ __html: highlight(x[DRIVER_FIELDS.ADDRESS], keyword) }} />
                    <td dangerouslySetInnerHTML={{ __html: highlight(x[DRIVER_FIELDS.NOTE], keyword) }} />
                    <td className={x[DRIVER_FIELDS.STATUS] === 3 ? 'text-red' : (x[DRIVER_FIELDS.STATUS] === 2 ? 'text-blue' : 'text-normal')} dangerouslySetInnerHTML={{ __html: highlight(DRIVER_STATUS[x[DRIVER_FIELDS.STATUS]], keyword) }} />
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
          url="/driver/page"
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
}

export default List
