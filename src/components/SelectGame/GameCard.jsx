import React from 'react'
import styles from './SelectGame.module.css'
import { Link } from 'react-router';

const GameCard = (props) => {
  const isSmallScreen = window.innerWidth < 700;
  return (
    <div
      className="p-1"
      style={{
        width: isSmallScreen ? '70%' : '100%',
        minWidth: isSmallScreen ? '70%' : '100%',
        maxWidth: isSmallScreen ? '70%' : '100%',
        boxSizing: 'border-box',
        cursor: "pointer"
      }}
      onClick={props.onClick} // Trigger onClick when the card is clicked
    >
      <div className={`card h-100 w-100 ${styles.card}`}
        style={{
          transform: isSmallScreen ? 'scale(0.95)' : 'scale(1)',
        }} >
        <div className='card-body position-absolute align-text-center w-100 top-0'>
          <p>{props.Year}</p>
        </div>
        <div className='position-relative'>
          <img src={props.Poster} alt={props.Title} className='card-img-top object-fit-cover'
          />
        </div>
        <div className="card-body text-center d-flex p-1 p-md-3 flex-column justify-content-end">
          <h6 className='m-0'>{props.Title}</h6>
        </div>
        <Link to={`/games/${props.jogoId}/character/${props.personagemId}`}></Link>
      </div>
    </div>
  )
}

export default GameCard