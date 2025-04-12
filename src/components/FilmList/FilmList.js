import { Component } from 'react'

import Film from '../Film/Film'
import MoviePagination from '../MoviePagination/MoviePagination'
import Loader from '../Loader/Loader'
import Error from '../Error/Error'
import movieService from '../../services/movieService'

import './FilmList.css'

export default class FilmList extends Component {
  state = {
    ratedMovies: {},
  }

  handleRateFilm = (filmId, value) => {
    const guestSessionId = localStorage.getItem('guestSessionId')
    movieService
      .ratedFilm(filmId, value, guestSessionId)
      .then(() => {
        this.setState((prevState) => ({
          ratedMovies: {
            ...prevState.ratedMovies,
            [filmId]: value,
          },
        }))
      })
      .catch((err) => {
        console.error('Ошибка при оценке фильма:', err)
      })
  }

  async loadRatedMovies() {
    try {
      const guestSessionId = localStorage.getItem('guestSessionId')
      if (!guestSessionId) return

      const data = await movieService.getGuestRatedMovies(guestSessionId)
      const mapRatings = {}
      data.results.forEach((film) => {
        mapRatings[film.id] = film.rating
      })
      this.setState({ ratedMovies: mapRatings })
    } catch (error) {
      console.error('Ошибка при загрузке пользовательских оценок:', error)
    }
  }

  componentDidMount() {
    this.loadRatedMovies()
  }

  render() {
    const { movies, loading, result, error, currentPage, totalResults, onPageChange } = this.props

    if (loading) {
      return <Loader />
    }

    if (error) {
      return <Error />
    }

    if (!result) {
      return <span className="film-list__clear">Упс, ничего не найдено, попробуйте найти другой фильм.</span>
    }

    const elements = movies.map((movie) => {
      const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      const userRating = this.state.ratedMovies[movie.id] ?? 0

      return (
        <Film
          key={movie.id}
          id={movie.id}
          title={movie.title}
          release={movie.release_date}
          description={movie.overview}
          voteAvg={movie.vote_average}
          genreIds={movie.genre_ids}
          src={posterUrl}
          userRating={userRating}
          onRateFilm={this.handleRateFilm}
        />
      )
    })

    return (
      <>
        <ul className="film-list">{elements}</ul>
        <MoviePagination currentPage={currentPage} totalResults={totalResults} onPageChange={onPageChange} />
      </>
    )
  }
}
