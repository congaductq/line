import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SuggestionBox from './SuggestionBox'
import { containKeyword } from '~/utils/common'

const NUMBER_OF_SUGGESTION = 7

class AutocompleteInput extends Component {
  constructor(props) {
    super(props)

    const { multiple, value } = this.props

    this.state = {
      tags: !value || value.length === 0 ? [] : (multiple ? value : [value]),
      keyword: '',
      focus: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { value, multiple } = this.props
    if (nextProps.value !== value) {
      this.setState({ tags: !nextProps.value || nextProps.value.length === 0 ? [] : (multiple ? nextProps.value : [nextProps.value]) })
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
      event.preventDefault()
      const {
        mainSuggestionField, list: listProps, multiple, onChange, field,
      } = this.props
      const list = listProps
        .filter(x => tags.findIndex(y => y.id === x.id) === -1)
        .filter(x => containKeyword(x[mainSuggestionField], value))
      if (list.length > 0) {
        const newTags = multiple ? [...tags, list[0]] : [list[0]]
        onChange(field, multiple ? newTags : (newTags[0]))
        this.setState({ tags: newTags, keyword: '', focus: multiple })
      }
      if (multiple && document.getElementById(`tag-input-${mainSuggestionField}`)) {
        document.getElementById(`tag-input-${mainSuggestionField}`).focus()
      }
    } else if (event.key === 'Backspace' && !value) {
      this.removeTag(tags.length - 1)
    }
  }

  onSelect = (item) => {
    const { tags } = this.state
    const { multiple, field, onChange } = this.props
    const newTags = multiple ? [...tags, item] : [item]
    onChange(field, multiple ? newTags : (newTags[0]))
    this.setState({ tags: newTags, keyword: '', focus: multiple })
    if (multiple && document.getElementById(`tag-input-${field}`)) {
      document.getElementById(`tag-input-${field}`).focus()
    }
  }

  updateKeyword = (value) => {
    this.setState({ keyword: value })
  }

  render() {
    const {
      tags, keyword, focus,
    } = this.state
    const {
      list: listProps, mainSuggestionField, field, value, multiple, required, maxLength, disabled,
    } = this.props

    const list = listProps
      .filter(x => tags.findIndex(y => y.id === x.id) === -1)
      .filter(x => containKeyword(x[mainSuggestionField], keyword))
      .slice(0, NUMBER_OF_SUGGESTION)
    return (
      <div className={`input-tag${disabled ? ' disabled' : ''}`} ref={(ref) => { this.wrapper = ref }}>
        <ul className="input-tag__tags">
          { tags.map((tag, i) => (
            <li key={tag[mainSuggestionField]}>
              {tag[mainSuggestionField]}
              {!disabled && <button type="button" onClick={() => this.removeTag(i)}>×</button>}
            </li>
          ))}
          {
            (!disabled && (tags.length === 0 || (multiple && tags.length < maxLength))) && (
              <li className="input-tag__tags__input d-flex flex-column">
                <input
                  id={`tag-input-${field}`}
                  className="form-control no-padding"
                  type="text"
                  onKeyDown={this.inputKeyDown}
                  value={keyword}
                  onChange={event => this.updateKeyword(event.target.value)}
                  onClick={this.toggleSearchBox}
                  required={required && tags.length === 0}
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
    PropTypes.shape(),
    PropTypes.arrayOf(PropTypes.shape()),
  ]),
  multiple: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
}

AutocompleteInput.defaultProps = {
  multiple: true,
  required: false,
  maxLength: 20,
  disabled: false,
}

export default AutocompleteInput
