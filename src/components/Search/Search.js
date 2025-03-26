import { Component } from 'react'

import './Search.css'

export default class Search extends Component {
  render() {
    return (
      <div className="search">
        <form className="search-form">
          <input className="search-input" placeholder="Type to search..." type="text" autoFocus={true} />
        </form>
      </div>
    )
  }
}
