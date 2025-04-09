import React from 'react'
import { Pagination } from 'antd'

import './MoviePagination.css'

const MoviePagination = ({ currentPage, totalResults, onPageChange }) => {
  return (
    <div className="movie-pagination">
      <Pagination current={currentPage} total={totalResults} pageSize={20} onChange={onPageChange} />
    </div>
  )
}

export default MoviePagination
