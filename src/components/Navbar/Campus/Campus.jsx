import React from 'react'
import './Campus.css'
import gallery1 from '../../../assets/gallery1.jpg'
import gallery2 from '../../../assets/gallery2.jpg'
import gallery3 from '../../../assets/gallery3.jpg'
import gallery4 from '../../../assets/gallery4.jpg'
import darkarrow from '../../../assets/darkarrow.webp'

const Campus = () => {
  return (
    <div className='campus'>
        <div className="gallery">
            <img src={gallery1} alt="" />
            <img src={gallery2} alt="" />
            <img src={gallery3} alt="" />
            <img src={gallery4} alt="" />
        </div>
        <button className='btn dark-btn'> See more here!<img src={darkarrow} alt="" /></button>    
    </div>
  )
}

export default Campus
