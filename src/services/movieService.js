class MovieService {
  _apiBase = 'https://api.themoviedb.org/3'
  _bearerToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYjQ2MTM3NzBiNmNhZTc1MTMwYmFmYmU4YjQyMDk1MSIsIm5iZiI6MTc0MjkwMzg4My42ODk5OTk4LCJzdWIiOiI2N2UyOWE0YjE2YTNjNWMyMjRmMDYzZTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zzwpgolsICRB5s9cop_hc6dCW8MThP31dQE-bFDXuhk'

  async getResource(params = {}) {
    const defaultParams = {
      include_adult: false,
      language: 'ru-RU',
    }

    const finalParams = { ...defaultParams, ...params }

    const queryString = new URLSearchParams(finalParams).toString()
    const url = `${this._apiBase}/search/movie?${queryString}`

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this._bearerToken}`,
        Accept: 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(`Ошибка получения данных ${url}, ответ ${res.status}`)
    }

    return await res.json()
  }

  async getResourceToken() {
    const url = `${this._apiBase}/authentication/token/new`

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this._bearerToken}`,
        accept: 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(`Не удалось получить request token, код ответа: ${res.status}`)
    }

    return await res.json()
  }

  async createSession(approvedRequestToken) {
    const url = `${this._apiBase}/authentication/guest_session/new`

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this._bearerToken}`,
        accept: 'application/json',
      },
      body: JSON.stringify({
        request_token: approvedRequestToken,
      }),
    })

    if (!res.ok) {
      throw new Error(`Не удалось создать guest_session_id, код ответа: ${res.status}`)
    }

    return await res.json()
  }

  async ratedFilm(filmId, ratingValue, guestSessionId) {
    const url = `${this._apiBase}/movie/${filmId}/rating?guest_session_id=${guestSessionId}`

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this._bearerToken}`,
        'Content-Type': 'application/json;charset=utf-8',
        accept: 'application/json',
      },

      body: JSON.stringify({
        value: ratingValue,
      }),
    })

    if (!res.ok) {
      throw new Error(`Не удалось проставить рейтинг, код ответа: ${res.status}`)
    }

    return await res.json()
  }

  async getGuestRatedMovies(guestSessionId) {
    const url = `${this._apiBase}/guest_session/${guestSessionId}/rated/movies`

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this._bearerToken}`,
        accept: 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(`Не удалось получить список оценённых фильмов, код ответа: ${res.status}`)
    }

    return await res.json()
  }
}

export default new MovieService()
