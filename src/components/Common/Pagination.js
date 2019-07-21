import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Pagination extends Component {
  render() {
    const {
      url, numberOfPage, page, disabled,
    } = this.props
    if (disabled) return <div />
    return (
      <div className="pagination">
        <nav aria-label="...">
          <ul className="pagination">
            <li className={`page-item ${page === '1' ? ' disabled' : ''}`}>
              <Link className="page-link" to={`${url}/${parseInt(page, 10) - 1}`}>Previous</Link>
            </li>
            {
              Array.from(Array(numberOfPage).keys()).map(x => (
                <li key={`page_${x}`} className={`page-item${page === (x + 1).toString() ? ' active' : ''}`}>
                  <Link className="page-link" to={`${url}/${x + 1}`}>{x + 1}</Link>
                </li>
              ))
            }
            <li className={`page-item ${page === numberOfPage.toString() ? ' disabled' : ''}`}>
              <Link className="page-link" to={`${url}/${parseInt(page, 10) + 1}`}>Next</Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

Pagination.propTypes = {
  url: PropTypes.string,
  page: PropTypes.string,
  numberOfPage: PropTypes.number,
  disabled: PropTypes.bool,
}

export default Pagination
