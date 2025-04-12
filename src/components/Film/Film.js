import { Component } from 'react'
import { Rate } from 'antd'
import { format } from 'date-fns'

import GenresContext from '../../contexts/GenresContext'
import './Film.css'

const truncateText = (text, maxLength) => {
  const words = text.split(' ')
  let truncatedText = ''
  for (let i = 0; i < words.length; i++) {
    if ((truncatedText + words[i]).length <= maxLength) {
      truncatedText += words[i] + ' '
    } else {
      break
    }
  }
  return truncatedText.trim() + (truncatedText.length < text.length ? ' ...' : '')
}

const formatReleaseDate = (date) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return 'Дата неизвестна'
  }
  return format(new Date(date), 'MMMM dd, yyyy')
}

export default class Film extends Component {
  static contextType = GenresContext

  state = {
    isDescriptionVisible: false,
  }

  toggleDescription = () => {
    this.setState((prevState) => ({
      isDescriptionVisible: !prevState.isDescriptionVisible,
    }))
  }

  handleRateChange = (value) => {
    const { id, onRateFilm } = this.props
    if (onRateFilm) {
      onRateFilm(id, value)
    }
  }

  render() {
    const { id, title, release, description, voteAvg, src } = this.props
    const { isDescriptionVisible } = this.state
    const shortDescription = truncateText(description, 180)
    const { genres } = this.context
    const { genreIds } = this.props
    let colorClass

    const genreNames = genreIds.map((genreId) => {
      const foundGenre = genres.find((g) => g.id === genreId)
      return foundGenre ? foundGenre.name : 'Неизвестно'
    })

    if (voteAvg >= 0 && voteAvg <= 3) {
      colorClass = 'film-item__rate--low'
    } else if (voteAvg > 3 && voteAvg <= 5) {
      colorClass = 'film-item__rate--high'
    } else if (voteAvg > 5 && voteAvg <= 7) {
      colorClass = 'film-item__rate--above-medium'
    } else {
      colorClass = 'film-item__rate--high'
    }

    return (
      <li className="film-item" key={id}>
        <img src={src} alt={title} />
        <div className="film-item__content">
          <h2 className="film-item__title">{title}</h2>
          <span className="film-item__released">{formatReleaseDate(release)}</span>
          <ul className="film-item__genre-list">
            {genreNames.map((name) => (
              <li key={name} className="film-item__genre-list__item">
                {name}
              </li>
            ))}
          </ul>
          <p className="film-item__description" onClick={this.toggleDescription}>
            {isDescriptionVisible ? description : shortDescription}
          </p>
          <Rate
            className="film-item__vote-rate"
            allowHalf
            count={10}
            value={this.props.userRating}
            onChange={this.handleRateChange}
          />
          <span className={`film-item__rate ${colorClass}`}>{Math.round(voteAvg * 10) / 10}</span>
        </div>
      </li>
    )
  }
}
