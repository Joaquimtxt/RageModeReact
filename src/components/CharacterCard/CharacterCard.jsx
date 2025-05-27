import React from 'react';
import styles from './CharacterCard.module.css'; // estilo individual opcional

const CharacterCard = ({ name, image }) => {
  return (
    <div className={`card text-bg-dark ${styles.card}`}>
      <img src={image} className="card-img" alt={name} />
      <div className="card-img-overlay d-flex align-items-end">
        <h5 className="card-title bg-dark bg-opacity-75 p-2 w-100 text-center">{name}</h5>
      </div>
    </div>
  );
};

export default CharacterCard;
