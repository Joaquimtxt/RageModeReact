import React, { useState } from 'react'
import styles from './SelectGame.module.css'
import { Link } from 'react-router';
import { getGamePicture } from '../../api/jogo';

const GameCard = (props) => {




  const isSmallScreen = window.innerWidth < 700;
  return (
    <Link to={`/games/${props.jogoId}/character`}>
    <div   className="p-1"
    style={{
      width: isSmallScreen ? '70%' : '100%',
      minWidth: isSmallScreen ? '70%' : '100%',
      maxWidth: isSmallScreen ? '70%' : '100%',
      boxSizing: 'border-box',
    }}
    >
    <div className={`card h-100 w-100 ${styles.card}`}
    style={{
      transform: isSmallScreen ? 'scale(0.95)' : 'scale(1)',
     }} >
      <div className='card-body position-absolute align-text-center w-100 top-0'>
        <p>{props.Year}</p>
      </div>
      <div className={`${styles.cardImg} position-relative`}>
        <img src={ props.Poster || "https://placehold.co/300x400" } alt={props.Title}  className='card-img-top object-fit-cover'
        />
      </div>
      <div  className="card-body text-center d-flex p-1 p-md-3 flex-column justify-content-end">
        <h6 className='m-0'>{props.Title}</h6>
      </div>
    </div>
    </div>
    </Link>
  )
}

export default GameCard