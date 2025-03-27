import { Component } from 'react'

import ActionButtons from '../ActionButtons/ActionButtons'
import Search from '../Search/Search'
import FilmList from '../FilmList/FilmList'
import movieService from '../../services/movieService'

import './App.css'

export default class App extends Component {
  state = {
    movie: [],
    loading: true,
    result: true,
    error: false,
  }

  componentDidMount() {
    movieService
      .getResource({
        query: 'Титаник',
        include_adult: false,
        language: 'ru-RU',
        page: 1,
      })
      .then((res) => {
        if (res.results.length === 0) {
          this.setState({ result: false, loading: false })
        } else {
          this.setState({ movie: res.results, loading: false, result: true })
        }
      })
      .catch((error) => {
        this.setState({ loading: false, error: true })
        console.log(error)
      })
  }

  render() {
    const { movie, loading, result, error } = this.state

    return (
      <section className="app">
        <div className="action-buttons">
          <ul className="action-buttons__list">
            <ActionButtons text="Search" isSelected={true} onClick={() => console.log('Клик!')} id="searchButton" />
            <ActionButtons text="Rated" isSelected={false} onClick={() => console.log('Клик!')} id="ratedButton" />
          </ul>
        </div>
        <Search />
        <FilmList movies={movie} loading={loading} result={result} error={error} />
      </section>
    )
  }
}
