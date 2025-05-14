import React, { useState } from 'react';
import styles from './Selectsth.module.css';
import SthCard from './SthCard';

const Selectsth = (props) => {
  // Total de cards (ajuste conforme necessário)
  const cards = [
    <SthCard Year="1999" Poster="https://placehold.co/300x400" Title="Street Fighter 20" />,
    <SthCard Year="1999" Poster="https://placehold.co/300x400" Title="Street Fighter 20" />,
    <SthCard Year="1999" Poster="https://placehold.co/300x400" Title="Street Fighter 20" />,
    <SthCard Year="1999" Poster="https://placehold.co/300x400" Title="Street Fighter 20" />,
    <SthCard Year="1999" Poster="https://placehold.co/300x400" Title="Street Fighter 20" />,
    <SthCard Year="1999" Poster="https://placehold.co/300x400" Title="Street Fighter 20" />,
    <SthCard Year="1999" Poster="https://placehold.co/300x400" Title="Street Fighter 20" />,
    <SthCard Year="1999" Poster="https://placehold.co/300x400" Title="Street Fighter 20" />,
    <SthCard Year="1999" Poster="https://placehold.co/300x400" Title="Street Fighter 20" />,
    <SthCard Year="1999" Poster="https://placehold.co/300x400" Title="Street Fighter 20" />,
    <SthCard Year="1999" Poster="https://placehold.co/300x400" Title="Street Fighter 20" />,
    <SthCard Year="1999" Poster="https://placehold.co/300x400" Title="Street Fighter 20" />,
  ];

  const CARDS_PER_VIEW = 4;
  const [startIdx, setStartIdx] = useState(0);

  const handlePrev = () => {
    setStartIdx((prev) => Math.max(prev - CARDS_PER_VIEW, 0));
  };

  const handleNext = () => {
    setStartIdx((prev) =>
      Math.min(prev + CARDS_PER_VIEW, cards.length - CARDS_PER_VIEW)
    );
  };

  return (
    <div className="container-fluid rounded-2 position-relative w-100" style={{ maxWidth: "1600px"}}>
      <h1 className="ms-xl-5 ms-2 text-light">{props.Titulo}</h1>
      <div className={`position-relative ${styles.SthScroll}`}>
        <div className="d-flex align-items-center">
          <button
            className={`btn btn-dark d-none d-md-flex align-items-center justify-content-center ${styles.scrollIcon2}`}
            onClick={handlePrev}
            disabled={startIdx === 0}
            aria-label="Anterior"
            style={{ zIndex: 2 }}
          >
            <ion-icon name="caret-back-outline" size="large"></ion-icon>
          </button>
          <div className="overflow-hidden w-100">
            <div
              className={`d-flex flex-nowrap ${styles.SthScroll}`}
              style={{
                transform: `translateX(-${(startIdx / cards.length) * 100}%)`,
                transition: 'transform 3s',
                width: `${(cards.length / CARDS_PER_VIEW) * 100}%`,
                margin: 0,
                padding: 0,
              }}
            >
              {cards.map((card, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0"
                  style={{
                    width: `${100 / cards.length}%`,
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {card}
                </div>
              ))}
            </div>
          </div>
          <button
            className={`btn btn-dark d-none d-md-flex align-items-center justify-content-center ${styles.scrollIcon1}`}
            onClick={handleNext}
            disabled={startIdx >= cards.length - CARDS_PER_VIEW}
            aria-label="Próximo"
            style={{ zIndex: 2 }}
          >
            <ion-icon name="caret-forward-outline" size="large"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Selectsth;