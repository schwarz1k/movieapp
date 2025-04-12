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
    activeTab: 'search',
  }

  handleMoviesLoaded = (movies, totalResults) => {
    if (!movies || movies.length === 0) {
      this.setState({ movies: [], result: false, loading: false, totalResults: 0 })
    } else {
      this.setState({ movies, totalResults, result: true, loading: false })
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
    const { movies, loading, result, error, currentPage, totalResults, activeTab, searchValue } = this.state

    return (
      <section className="app">
        <div className="action-buttons">
          <ul className="action-buttons__list">
            <ActionButtons
              text="Search"
              isSelected={activeTab === 'search'}
              onClick={() => this.setState({ activeTab: 'search', loading: true })}
              id="searchButton"
            />
            <ActionButtons
              text="Rated"
              isSelected={activeTab === 'rated'}
              onClick={() => this.setState({ activeTab: 'rated', loading: true })}
              id="ratedButton"
            />
          </ul>
        </div>

        {activeTab === 'search' && (
          <Search defaultValue={searchValue} searchInputHandler={this.debouncedSearchInputHandler} />
        )}

        <MovieLoader
          activeTab={activeTab}
          query={searchValue}
          currentPage={currentPage}
          onMoviesLoaded={this.handleMoviesLoaded}
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
