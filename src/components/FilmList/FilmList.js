import Film from '../Film/Film'
import MoviePagination from '../MoviePagination/MoviePagination'

import './FilmList.css'

const FilmList = ({ movies }) => {
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
      <MoviePagination />
    </>
  )
}

export default FilmList
