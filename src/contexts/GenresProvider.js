import React, { Component } from 'react'

import GenresContext from './GenresContext'

export default class GenresProvider extends Component {
  state = {
    genres: [],
  }

  setGenres = (genresArray) => {
    this.setState({ genres: genresArray })
  }

  render() {
    const value = {
      genres: this.state.genres,
      setGenres: this.setGenres,
    }

    return <GenresContext.Provider value={value}>{this.props.children}</GenresContext.Provider>
  }
}
