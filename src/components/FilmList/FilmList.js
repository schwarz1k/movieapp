import { Component } from 'react'

import Film from '../Film/Film'
import MoviePagination from '../MoviePagination/MoviePagination'
import Loader from '../Loader/Loader'
import Error from '../Error/Error'

import './FilmList.css'

export default class FilmList extends Component {
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
      return (
        <Film
          key={movie.id}
          id={movie.id}
          title={movie.title}
          release={movie.release_date}
          description={movie.overview}
          voteAvg={movie.vote_average}
          src={posterUrl}
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
