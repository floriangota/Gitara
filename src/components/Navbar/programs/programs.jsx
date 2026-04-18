import React from 'react'
import './programs.css'
import little from '../../../assets/little.jpg'
import little2 from '../../../assets/little2.jpg'
import littlee3 from '../../../assets/littlee3.jpg'

const Programs = () => {
    return (
        <div className='programs'>
            <div className='program'>
                <img src={little} alt="" />
                <div className='caption'>
                    <i className="bi bi-book-fill"></i>
                    <p>Graduation Degree</p>
                </div>
            </div>
            <div className='program'>
                <img src={little2} alt="" />
                <div className='caption'>
                    <i className="bi bi-person-vcard-fill "></i>
                    <p>Master's Degree</p>
                </div>
            </div>
            <div className='program'>
                <img src={littlee3} alt="" />
                <div className='caption'>
                    <i className="bi bi-mortarboard-fill" id='icon'></i>
                    <p>Post Graduation</p>
                </div>
            </div>
        </div>
    )
}

export default Programs
