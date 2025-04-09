import { Component } from 'react'

import './Search.css'

export default class Search extends Component {
  handleInputChange = (event) => {
    const { value } = event.target
    this.props.searchInputHandler(value)
    event.preventDefault()
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  render() {
    return (
      <div className="search">
        <form className="search-form" onKeyDown={this.handleKeyDown}>
          <input
            className="search-input"
            placeholder="Type to search..."
            type="text"
            autoFocus={true}
            onChange={this.handleInputChange}
          />
        </form>
      </div>
    )
  }
}
