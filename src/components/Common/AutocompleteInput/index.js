import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SuggestionBox from './SuggestionBox'
import { containKeyword } from '~/components/utils/common'

const NUMBER_OF_SUGGESTION = 7

class AutocompleteInput extends Component {
  constructor(props) {
    super(props)

    const { multiple, value } = this.props

    this.state = {
      tags: value ? (multiple ? value : [value]) : [],
      keyword: '',
      focus: false,
    }
  }

  componentWillUnmount() {
    this.toggleTouchOutsideEvent(false)
  }

  openSearchBox = () => {
    this.setState({ focus: true })
  }

  closeSearchBox = () => {
    this.setState({ focus: false })
  }

  toggleTouchOutsideEvent = (enabled) => {
    if (enabled) {
      if (!document.addEventListener && document.attachEvent) {
        document.attachEvent('ontouchstart', this.handleTouchOutside)
        document.attachEvent('onmousedown', this.handleTouchOutside)
      } else {
        document.addEventListener('touchstart', this.handleTouchOutside)
        document.addEventListener('mousedown', this.handleTouchOutside)
      }
    } else if (!document.removeEventListener && document.detachEvent) {
      document.detachEvent('ontouchstart', this.handleTouchOutside)
      document.detachEvent('onmousedown', this.handleTouchOutside)
    } else {
      document.removeEventListener('touchstart', this.handleTouchOutside)
      document.removeEventListener('mousedown', this.handleTouchOutside)
    }
  }

  handleTouchOutside = (event) => {
    if (this.wrapper && !this.wrapper.contains(event.target)) {
      this.closeSearchBox()
      this.toggleTouchOutsideEvent(false)
    }
  }

  toggleSearchBox = () => {
    const { focus } = this.state
    if (!focus) {
      this.openSearchBox()
      this.toggleTouchOutsideEvent(true)
    }
  }

  removeTag = (i) => {
    const { tags } = this.state
    const newTags = [...tags]
    newTags.splice(i, 1)
    this.setState({ tags: newTags })
  }

  inputKeyDown = (event) => {
    const { tags } = this.state
    const { target: { value } } = event
    if (event.key === 'Enter') {
      const { mainSuggestionField, list: listProps, multiple } = this.props
      const list = listProps
        .filter(x => !tags.includes(x[mainSuggestionField]))
        .filter(x => containKeyword(x[mainSuggestionField], value))
      if (list.length > 0) {
        this.setState({ tags: multiple ? [...tags, list[0][mainSuggestionField]] : [list[0][mainSuggestionField]], keyword: '', focus: multiple })
      }
      if (multiple && document.getElementById(`tag-input-${mainSuggestionField}`)) {
        document.getElementById(`tag-input-${mainSuggestionField}`).focus()
      }
      event.preventDefault()
    } else if (event.key === 'Backspace' && !value) {
      this.removeTag(tags.length - 1)
    }
  }

  onSelect = (item) => {
    const { tags } = this.state
    const { mainSuggestionField, multiple, field } = this.props
    this.setState({ tags: multiple ? [...tags, item[mainSuggestionField]] : [item[mainSuggestionField]], keyword: '', focus: multiple })
    if (multiple && document.getElementById(`tag-input-${field}`)) {
      document.getElementById(`tag-input-${field}`).focus()
    }
  }

  updateKeyword = (event) => {
    const { target: { value } } = event
    this.setState({ keyword: value })
  }

  render() {
    const { tags, keyword, focus } = this.state
    const {
      list: listProps, mainSuggestionField, field, value, multiple,
    } = this.props

    const list = listProps
      .filter(x => !tags.includes(x[mainSuggestionField]))
      .filter(x => containKeyword(x[mainSuggestionField], keyword))
      .slice(0, NUMBER_OF_SUGGESTION)

    return (
      <div className="input-tag" ref={(ref) => { this.wrapper = ref }}>
        <ul className="input-tag__tags">
          { tags.map((tag, i) => (
            <li key={tag}>
              {tag}
              <button type="button" onClick={() => this.removeTag(i)}>×</button>
            </li>
          ))}
          {
            (tags.length === 0 || multiple) && (
              <li className="input-tag__tags__input d-flex flex-column">
                <input
                  id={`tag-input-${field}`}
                  className="form-control no-padding"
                  type="text"
                  onKeyDown={this.inputKeyDown}
                  value={keyword}
                  onChange={event => this.updateKeyword(event)}
                  onClick={this.toggleSearchBox}
                />
                <div className="suggestion">
                  {
                    (focus && list.length > 0) && (
                    <SuggestionBox
                      suggestions={list}
                      field={field}
                      mainSuggestionField={mainSuggestionField}
                      value={value}
                      onSelect={this.onSelect}
                      multiple={multiple}
                    />
                    )
                  }
                </div>
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}

AutocompleteInput.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  field: PropTypes.string,
  mainSuggestionField: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  multiple: PropTypes.bool,
}

AutocompleteInput.defaultProps = {
  multiple: true,
}

export default AutocompleteInput
