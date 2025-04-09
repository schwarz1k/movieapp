import { Component } from 'react'
import debounce from 'lodash.debounce'

import ActionButtons from '../ActionButtons/ActionButtons'
import Search from '../Search/Search'
import FilmList from '../FilmList/FilmList'
import MovieLoader from '../MovieLoader/MovieLoader'

import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.debouncedSearchInputHandler = debounce(this.searchInputHandler, 500)
  }

  state = {
    movies: [],
    loading: false,
    result: false,
    error: false,
    searchValue: '',
    currentPage: 1,
    totalResults: 0,
  }

  handleMoviesLoaded = (movies, totalResults) => {
    if (movies.length === 0) {
      this.setState({ result: false, loading: false })
    } else {
      this.setState({ movies, loading: false, result: true, totalResults })
    }
  }

  handleError = () => {
    this.setState({ loading: false, error: true })
  }

  searchInputHandler = (value) => {
    if (value.trim() === '') {
      this.setState({ searchValue: '', movies: [], loading: false, result: false })
    } else {
      this.setState({ searchValue: value, loading: true, currentPage: 1 })
    }
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page, loading: true })
  }

  render() {
    const { movies, loading, result, error, currentPage, totalResults } = this.state

    return (
      <section className="app">
        <div className="action-buttons">
          <ul className="action-buttons__list">
            <ActionButtons text="Search" isSelected={true} onClick={() => console.log('Клик!')} id="searchButton" />
            <ActionButtons text="Rated" isSelected={false} onClick={() => console.log('Клик!')} id="ratedButton" />
          </ul>
        </div>
        <Search searchInputHandler={this.debouncedSearchInputHandler} />
        <MovieLoader
          query={this.state.searchValue}
          currentPage={this.state.currentPage}
          onMoviesLoaded={(movies, totalResults) => this.handleMoviesLoaded(movies, totalResults)}
          onError={this.handleError}
        />
        <FilmList
          movies={movies}
          loading={loading}
          result={result}
          error={error}
          currentPage={currentPage}
          totalResults={totalResults}
          onPageChange={this.handlePageChange}
        />
      </section>
    )
  }
}
