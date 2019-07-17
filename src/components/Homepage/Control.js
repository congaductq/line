import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Control extends Component {
  onKeyUp = () => {}

  render() {
    const { keyword, createItem, updateKeyword } = this.props
    return (
      <div className="control">
        <div role="button" tabIndex="0" className="popup__btn" onClick={() => createItem()} onKeyUp={this.onKeyUp}>Create Item</div>
        <input
          className="form-control search-form"
          name="keyword"
          placeholder="Search plate, driver..."
          onChange={event => updateKeyword(event.target.value)}
          autoComplete="off"
          onClick={this.toggleSearchBox}
          value={keyword}
        />
      </div>
    )
  }
}

Control.propTypes = {
  keyword: PropTypes.string,
  createItem: PropTypes.func,
  updateKeyword: PropTypes.func,
}

export default Control
