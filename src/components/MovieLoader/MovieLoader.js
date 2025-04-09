import { Component } from 'react'

import movieService from '../../services/movieService'

export default class MovieLoader extends Component {
  fetchMovies = () => {
    const { query, onMoviesLoaded, onError, currentPage } = this.props

    if (!query.trim()) {
      return
    }

    movieService
      .getResource({
        query,
        page: currentPage,
      })
      .then((res) => {
        onMoviesLoaded(res.results, res.total_results)
      })
      .catch((error) => {
        console.error(error)
        onError()
      })
  }

  componentDidMount() {
    this.fetchMovies()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query || prevProps.currentPage !== this.props.currentPage) {
      if (!this.props.query || this.props.query.trim() === '') {
        this.props.onMoviesLoaded([])
        return
      }

      this.fetchMovies()
    }
  }

  render() {
    return null
  }
}
