import React from 'react'
import styles from './Selectsth.module.css'

const SthCard = (props) => {
  return (
    <div className={` min-vw-0 position position-relative p-0 z-1 ${styles.card}`} >
      <div className='position-absolute align-text-center w-100 top-0'>
        <p>{props.Year}</p>
      </div>
      <div>
        <img src={props.Poster} alt={props.Title}  className='w-100 h-h-auto d-block'/>
      </div>
      <div className={`card-title text-light z-1 position-sticky bottom-0`}>
        <h3>{props.Title}</h3>
      </div>
    </div>
  )
}

export default SthCard