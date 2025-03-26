import { Component } from 'react'

import ActionButtons from '../ActionButtons/ActionButtons'
import Search from '../Search/Search'
import FilmList from '../FilmList/FilmList'
import movieService from '../../services/movieService'

import './App.css'

export default class App extends Component {
  state = {
    movie: [],
  }

  componentDidMount() {
    movieService
      .getResource({
        query: 'Казино',
        include_adult: false,
        language: 'ru-RU',
        page: 1,
      })
      .then((res) => {
        this.setState({ movie: res.results })
      })
      .catch((error) => {
        console.error('Ошибка при получении данных:', error)
      })
  }

  render() {
    return (
      <section className="app">
        <div className="action-buttons">
          <ul className="action-buttons__list">
            <ActionButtons text="Search" isSelected={true} onClick={() => console.log('Клик!')} id="searchButton" />
            <ActionButtons text="Rated" isSelected={false} onClick={() => console.log('Клик!')} id="ratedButton" />
          </ul>
        </div>
        <Search />
        <FilmList movies={this.state.movie} />
      </section>
    )
  }
}
