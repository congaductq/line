import React, { Component } from 'react'

class AutocompleteInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tags: [
        'Tags',
        'Input',
      ],
    }
  }

  removeTag = (i) => {
    const { tags } = this.state
    const newTags = [...tags]
    newTags.splice(i, 1)
    this.setState({ tags: newTags })
  }

  inputKeyDown = (e) => {
    const { tags } = this.state
    const val = e.target.value
    if (e.key === 'Enter' && val) {
      if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return
      }
      this.setState({ tags: [...tags, val] })
      this.tagInput.value = null
      e.preventDefault()
    } else if (e.key === 'Backspace' && !val) {
      this.removeTag(tags.length - 1)
    }
  }

  render() {
    const { tags } = this.state

    return (
      <div className="input-tag">
        <ul className="input-tag__tags">
          { tags.map((tag, i) => (
            <li key={tag}>
              {tag}
              <button type="button" onClick={() => this.removeTag(i)}>+</button>
            </li>
          ))}
          <li className="input-tag__tags__input"><input type="text" onKeyDown={this.inputKeyDown} ref={(c) => { this.tagInput = c }} /></li>
        </ul>
      </div>
    )
  }
}


AutocompleteInput.defaultProps = {
  value: '',
}

export default AutocompleteInput
