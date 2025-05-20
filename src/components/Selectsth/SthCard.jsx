import React from 'react'
import styles from './Selectsth.module.css'

const SthCard = (props) => {
  const isSmallScreen = window.innerWidth < 700;
  return (
    <div className="col-12  mb-3 h-100 justify-content-center"
    
    >
    <div className={`card h-100 ${styles.card}`} >
      <div className='card-body position-absolute align-text-center w-100 top-0'>
        <p>{props.Year}</p>
      </div>
      <div className='position-relative'>
        <img src={props.Poster} alt={props.Title}  className='w-100 card-body h-100'/>
      </div>
      <div  className="position-absolute bottom-0 w-100 text-center text-light p-1">
        <h3 className='m-0'>{props.Title}</h3>
      </div>
    </div>
    </div>
  )
}

export default SthCard