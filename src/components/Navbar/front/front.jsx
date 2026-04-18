import React from 'react'
import './front.css'
import darkarrow from '../../../assets/darkarrow.webp'

const Front = () => {
  return (
    <div className='front' id='front'>
      <div className='hero-text'>
        <h1>We Ensure better education for a better world</h1>
        <p>Our cutting-edge curriculum is designed to empower students with
           the knowledge,skills and experience they need to excel in the dynamic field of education.</p>
           <button className='btn'>Explore more<img src={darkarrow} alt="Arrow"/></button>
      </div>
      
    </div>
  )
}

export default Front
