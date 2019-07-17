import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AutocompleteInput extends Component {
  render() {
    const {
      field, value, onChange, suggestion, mainSuggestionField,
    } = this.props
    return (
      <div className="auto-box">
        <input
          type="text"
          className="form-control d-flex w-100"
          value={value}
          onChange={event => onChange(field, event)}
          required="required"
        />
        <div className="suggestion-box">
          <table>
            {
              suggestion.map(x => (
                <tr key={`${field}_${x.id}`}>
                  <td>{x[mainSuggestionField]}</td>
                  {
                    Object.keys(x).filter(y => y !== mainSuggestionField && y !== 'id').map(subField => (
                      <td>{x[subField]}</td>
                    ))
                  }
                </tr>
              ))
            }
          </table>
        </div>
      </div>
    )
  }
}

AutocompleteInput.propTypes = {
  onChange: PropTypes.func,
  suggestion: PropTypes.arrayOf(PropTypes.object),
  field: PropTypes.string,
  mainSuggestionField: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

AutocompleteInput.defaultProps = {
  value: '',
}

export default AutocompleteInput
