import React from 'react'

import './Error.css'
import icon from './ops.png'

const Error = () => {
  return (
    <div className="error">
      <img width="150px" src={icon} alt="Иконка ошибки" />
      <span className="error-description">Что-то пошло не так</span>
      <span className="error-description">Знаем о проблеме, исправим в ближайшее время.</span>
    </div>
  )
}

export default Error
