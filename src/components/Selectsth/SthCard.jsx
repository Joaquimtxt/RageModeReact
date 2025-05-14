import React from 'react'
import styles from './Selectsth.module.css'

const SthCard = (props) => {
  return (
    <div className={`m-0 ${styles.card}`} style={{ width: "100%", minWidth: 0 }}>
      <div>
        <p>{props.Year}</p>
      </div>
      <div>
        <img src={props.Poster} alt={props.Title} style={{ width: "100%", height: "auto", display: "block" }} />
      </div>
      <div className={`card-title text-light`}>
        <h3>{props.Title}</h3>
      </div>
    </div>
  )
}

export default SthCard