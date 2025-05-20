import React, { useEffect, useState } from 'react';
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

  const [cardsPerView, setCardsPerView] = useState(4);
  const [startIdx, setStartIdx] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 576) {
        setCardsPerView(3); // Para telas menores que "sm", mostrar 3 cards
      } else {
        setCardsPerView(4); // Para telas maiores, mostrar 4 cards
      }
    };

    handleResize(); // Chamar a função ao carregar o componente
    window.addEventListener('resize', handleResize); // Adicionar listener para redimensionamento

    return () => {
      window.removeEventListener('resize', handleResize); // Remover listener ao desmontar o componente
    };
  }, []);

  const handlePrev = () => {
    setStartIdx((prev) => Math.max(prev - cardsPerView, 0));
  };

  const handleNext = () => {
    setStartIdx((prev) =>
      Math.min(prev + cardsPerView, cards.length - cardsPerView)
    );
  };

  return (
    <div className={`container-fluid rounded-2 position-relative w-100 ${styles.SthContainer}`}>
      <h1 className="ms-xl-5 ms-2 text-light">{props.Titulo}</h1>
      <div className={`d-flex align-items-center justify-content-between ${styles.SthScroll}`}>
          <button
           className={`btn btn-dark d-none d-md-flex align-items-center justify-content-center z-2 position-relative ${styles.scrollIcon2}`}
           onClick={handlePrev}
           disabled={startIdx === 0}
           aria-label="Anterior"
         >
           <ion-icon name="caret-back-outline" size="large"></ion-icon>
         </button>
          <div className="overflow-hidden flex-grow-1 mx-3 ">
            <div
              className={`d-flex flex-nowrap m-0 p-0${styles.SthScroll}`}
              style={{
                transform: `translateX(-${(startIdx / cards.length) * 100}%)`,
                transition: 'transform 0.5s ease-in-out',
                width: `${(cards.length / cardsPerView) * 100}%`,
              }}
            >
              {cards.map((card, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 p-2"
                  style={{
                    width: `${100 / cards.length}%`,
                  }}
                >
                  {card}
                </div>
              ))}
            </div>
          <button
            className={`btn btn-dark d-none d-md-flex align-items-center justify-content-center  position-absolute ${styles.scrollIcon1}`}
            onClick={handleNext}
            disabled={startIdx >= cards.length - cardsPerView}
            aria-label="Próximo"
          >
            <ion-icon name="caret-forward-outline" size="large"></ion-icon>
          </button>
          </div>
        </div>
      </div>
  );
};

export default Selectsth;