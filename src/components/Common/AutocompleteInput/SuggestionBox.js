import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SuggestionBox extends Component {
  render() {
    const {
      suggestions, field, mainSuggestionField, onSelect,
    } = this.props
    return (
      <div className="suggestion__box">
        <table>
          <tbody>
            {
              suggestions.map(x => (
                <tr key={`${field}_${x.id}`} onClick={() => onSelect(x)}>
                  <td>{x[mainSuggestionField]}</td>
                  {
                    Object.keys(x).filter(y => y !== mainSuggestionField && y !== 'id').map(subField => (
                      <td key={`${field}_${x[subField]}`}>{x[subField]}</td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}

SuggestionBox.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.object),
  field: PropTypes.string,
  mainSuggestionField: PropTypes.string,
  onSelect: PropTypes.func,
}

SuggestionBox.defaultProps = {
  suggestions: [],
}

export default SuggestionBox
