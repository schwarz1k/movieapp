import { Component } from 'react'

import movieService from '../../services/movieService'
import GenresContext from '../../contexts/GenresContext'

export default class MovieLoader extends Component {
  static contextType = GenresContext

  state = {
    guestSessionId: null,
  }

  constructor(props) {
    super(props)
    this.didMountOnce = false
  }

  componentDidMount() {
    if (!this.didMountOnce) {
      this.didMountOnce = true
      this.setLocalStorage().then(() => {
        this.fetchGenres()
        this.handleTabChange(this.props.activeTab)
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeTab !== this.props.activeTab) {
      this.handleTabChange(this.props.activeTab)
      return
    }

    if (this.props.activeTab === 'search') {
      if (prevProps.query !== this.props.query || prevProps.currentPage !== this.props.currentPage) {
        this.fetchMovies()
      }
    }
  }

  handleTabChange = (activeTab) => {
    if (activeTab === 'search') {
      this.fetchMovies()
    } else if (activeTab === 'rated') {
      this.fetchRatedMovies()
    }
  }

  fetchMovies = () => {
    const { query, onMoviesLoaded, onError, currentPage } = this.props
    if (!query.trim()) {
      onMoviesLoaded([], 0)
      return
    }

    movieService
      .getResource({
        query,
        page: currentPage,
      })
      .then((res) => {
        onMoviesLoaded(res.results, res.total_results)
      })
      .catch((error) => {
        console.error('fetchMovies error:', error)
        onError()
      })
  }

  fetchGenres = () => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=ru'
    fetch(url, {
      headers: {
        Authorization: `Bearer ${movieService._bearerToken}`,
        Accept: 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Ошибка при получении жанров. Статус: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        if (data.genres) {
          this.context.setGenres(data.genres)
        }
      })
      .catch((err) => console.error('Ошибка при загрузке жанров:', err))
  }

  fetchRatedMovies = () => {
    const { onMoviesLoaded, onError } = this.props
    const guestSessionId = localStorage.getItem('guestSessionId')
    if (!guestSessionId) {
      onMoviesLoaded([], 0)
      return
    }

    movieService
      .getGuestRatedMovies(guestSessionId)
      .then((res) => {
        if (!res.results) {
          onMoviesLoaded([], 0)
        } else {
          onMoviesLoaded(res.results, res.total_results)
        }
      })
      .catch((err) => {
        console.error('fetchRatedMovies error:', err)
        onError()
      })
  }

  async setLocalStorage() {
    let storageSession = localStorage.getItem('guestSessionId')
    if (!storageSession) {
      try {
        const { request_token } = await movieService.getResourceToken()
        const { guest_session_id } = await movieService.createSession(request_token)
        localStorage.setItem('guestSessionId', guest_session_id)
        storageSession = guest_session_id
      } catch (error) {
        console.error('Ошибка при создании гостевой сессии:', error)
      }
    }
    this.setState({ guestSessionId: storageSession })
  }

  render() {
    return null
  }
}
