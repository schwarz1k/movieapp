import React from 'react'
import { Pagination } from 'antd'

import './MoviePagination.css'

const MoviePagination = () => {
  return (
    <div className="movie-pagination">
      <Pagination defaultCurrent={1} total={50} />
    </div>
  )
}

export default MoviePagination
