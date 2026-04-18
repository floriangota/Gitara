import React from 'react'
import './tittle.css'

const Tittle = ({ subtitle, title }) => {
  return (
    <div className='tittle'>
      <p>{subtitle} </p>
      <h2>{title}</h2>
    </div>
  )
}

export default Tittle
