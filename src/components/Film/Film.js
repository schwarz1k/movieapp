import { Component } from 'react'
import { Rate } from 'antd'
import { format } from 'date-fns'

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
  state = {
    isDescriptionVisible: false,
  }

  toggleDescription = () => {
    this.setState((prevState) => ({
      isDescriptionVisible: !prevState.isDescriptionVisible,
    }))
  }

  render() {
    const { id, title, release, description, voteAvg, src } = this.props
    const { isDescriptionVisible } = this.state
    const shortDescription = truncateText(description, 180)

    return (
      <li className="film-item" key={id}>
        <img src={src} alt={title} />
        <div className="film-item__content">
          <h2 className="film-item__title">{title}</h2>
          <span className="film-item__released">{formatReleaseDate(release)}</span>
          <ul className="film-item__genre-list">
            <li className="film-item__genre-list__item">Action</li>
            <li className="film-item__genre-list__item">Drama</li>
          </ul>
          <p className="film-item__description" onClick={this.toggleDescription}>
            {isDescriptionVisible ? description : shortDescription}
          </p>
          <Rate className="film-item__vote-rate" allowHalf defaultValue={voteAvg} count={10} />
          <span className="film-item__rate">{Math.round(voteAvg * 10) / 10}</span>
        </div>
      </li>
    )
  }
}
