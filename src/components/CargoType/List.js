import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  CARGO_TYPE_FIELDS, CARGO_TYPE_STATUS, DEFAULT_CARGO_TYPE_SORT_FIELD, DEFAULT_CARGO_TYPE_PAGE_SIZE,
} from '~/constants/cargo-type'
import { highlight } from '~/utils/textFormatter'
import ViewImg from '~/static/img/view.png'
import EditImg from '~/static/img/edit.png'
import RemoveImg from '~/static/img/remove.png'
import Pagination from '../Common/Pagination'
import { getSortClass } from '~/utils/common'

const sortData = (data, order, desc, page, size) => (data.sort((a, b) => {
  let aValue = a[order]
  let bValue = b[order]
  if (order === CARGO_TYPE_FIELDS.STATUS) {
    aValue = CARGO_TYPE_STATUS[a.status]
    bValue = CARGO_TYPE_STATUS[b.status]
  }
  return (aValue > bValue ? 1 : -1) * desc
}).slice((page - 1) * size, page * size))

class List extends Component {
  constructor(props) {
    super(props)

    const { page, data } = props
    const order = DEFAULT_CARGO_TYPE_SORT_FIELD
    const desc = 1
    const size = DEFAULT_CARGO_TYPE_PAGE_SIZE
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
    const numberOfPage = Math.ceil(total / DEFAULT_CARGO_TYPE_PAGE_SIZE)
    return (
      <React.Fragment>
        <div className="list">
          <table className="cargo-type__table">
            <thead>
              <tr>
                <th className={getSortClass(order, desc, CARGO_TYPE_FIELDS.NAME)} onClick={() => this.onOrderChange(CARGO_TYPE_FIELDS.NAME)}>Name</th>
                <th className={getSortClass(order, desc, CARGO_TYPE_FIELDS.DESCRIPTION)} onClick={() => this.onOrderChange(CARGO_TYPE_FIELDS.DESCRIPTION)}>DESCRIPTION</th>
                <th className={getSortClass(order, desc, CARGO_TYPE_FIELDS.NOTE)} onClick={() => this.onOrderChange(CARGO_TYPE_FIELDS.NOTE)}>NOTE</th>
                <th className={getSortClass(order, desc, CARGO_TYPE_FIELDS.STATUS)} onClick={() => this.onOrderChange(CARGO_TYPE_FIELDS.STATUS)}>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {
                data.map(x => (
                  <tr key={x[CARGO_TYPE_FIELDS.NAME]}>
                    <td dangerouslySetInnerHTML={{ __html: highlight(x[CARGO_TYPE_FIELDS.NAME], keyword) }} />
                    <td dangerouslySetInnerHTML={{ __html: highlight(x[CARGO_TYPE_FIELDS.DESCRIPTION], keyword) }} />
                    <td dangerouslySetInnerHTML={{ __html: highlight(x[CARGO_TYPE_FIELDS.NOTE], keyword) }} />
                    <td className={x[CARGO_TYPE_FIELDS.STATUS] === 2 ? 'text-red' : 'text-normal'} dangerouslySetInnerHTML={{ __html: highlight(CARGO_TYPE_STATUS[x[CARGO_TYPE_FIELDS.STATUS]], keyword) }} />
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
          url="/cargo-type/page"
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
