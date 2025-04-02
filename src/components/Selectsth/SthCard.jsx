import React from 'react'
import styles from './Selectsth.module.css'

const SthCard = (props) => {
  return (
    <div className={`m-1 card-body ${styles.card}`} >
    <div>
      <p>{props.Year}</p>
    </div>
    <div>
      <img src={props.Poster} alt={props.Title}></img>
    </div>
    <div className={`card-title text-light`}>
      <h3>{props.Title}</h3>
    </div>


  </div>
  )
}

export default SthCard