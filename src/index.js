import React from 'react'
import ReactDOM from 'react-dom/client'

import GenresProvider from './contexts/GenresProvider'
import App from './components/App/App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <GenresProvider>
      <App />
    </GenresProvider>
  </React.StrictMode>
)
