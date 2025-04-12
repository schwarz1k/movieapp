import React from 'react'

const GenresContext = React.createContext({
  genres: [],
  setGenres: () => {},
})

export default GenresContext
