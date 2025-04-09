class MovieService {
  _apiBase = 'https://api.themoviedb.org/3/search/movi'

  async getResource(params = {}) {
    const APIKEY =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYjQ2MTM3NzBiNmNhZTc1MTMwYmFmYmU4YjQyMDk1MSIsIm5iZiI6MTc0MjkwMzg4My42ODk5OTk4LCJzdWIiOiI2N2UyOWE0YjE2YTNjNWMyMjRmMDYzZTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zzwpgolsICRB5s9cop_hc6dCW8MThP31dQE-bFDXuhk'

    const defaultParams = {
      include_adult: false,
      language: 'ru-RU',
    }

    const finalParams = { ...defaultParams, ...params }

    const queryString = new URLSearchParams(finalParams).toString()
    const url = `${this._apiBase}?${queryString}`

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${APIKEY}`,
        Accept: 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(`Ошибка получения данных ${url}, ответ ${res.status}`)
    }

    return await res.json()
  }
}

export default new MovieService()
