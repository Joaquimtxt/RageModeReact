import React, { useEffect, useRef, useState } from "react";
import styles from "./Selectsth.module.css";
import SthCard from "./SthCard";
import { useNavigate } from "react-router"; // Import useNavigate from react-router-dom
import { jogosDeLuta } from "../../data"; // Import jogosDeLuta from data.js

const Selectsth = (props) => {
  const games = props.games || jogosDeLuta; // Use props.games or fallback to jogosDeLuta

  const [cardsPerView, setCardsPerView] = useState(4);
  const [startIdx, setStartIdx] = useState(0);
  const touchStartX = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 700) {
        setCardsPerView(3); // Para telas menores que "sm", mostrar 3 cards
      } else {
        setCardsPerView(4); // Para telas maiores, mostrar 4 cards
      }
    };

    handleResize(); // Chamar a função ao carregar o componente
    window.addEventListener("resize", handleResize); // Adicionar listener para redimensionamento

    return () => {
      window.removeEventListener("resize", handleResize); // Remover listener ao desmontar o componente
    };
  }, []);

  const handlePrev = () => {
    setStartIdx((prev) => Math.max(prev - cardsPerView, 0)); // Diminui o índice inicial, mas não permite que fique negativo
  };

  const handleNext = () => {
    setStartIdx(
      (prev) => Math.min(prev + cardsPerView, games.length - cardsPerView) // Aumenta o índice inicial, mas não permite que ultrapasse o limite
    );
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX; // Calcula a diferença da posição do touch inicial, com a posição final do touch
    if (diff > 50) {
      handleNext(); // É chamado para respeitar os limites do carrossel
    } else if (diff < -50) {
      handlePrev(); // É chamado para respeitar os limites do carrossel
    }
    touchStartX.current = null;
  };

  const handleCardClick = (id) => {
    navigate(`/select-character?gameId=${id}`); // Pass game ID in query parameter
  };

  return (
    <div
      className={`container-fluid rounded-2 position-relative w-100 px-0 ${styles.sthContainer}`}
    >
      <h1 className="ms-xl-5 ms-2 text-light ">{props.Titulo}</h1>
      <div className={`d-flex align-items-center  ${styles.SthScroll}`}>
        <button
          className={`btn btn-dark d-none d-md-flex align-items-center justify-content-center z-2 position-relative ${styles.scrollIcon2}`}
          onClick={handlePrev}
          disabled={startIdx === 0}
          aria-label="Anterior"
        >
          <ion-icon name="caret-back-outline" size="large"></ion-icon>
        </button>
        <div className="overflow-hidden">
          <div
            className={`d-flex flex-nowrap m-0 p-3 ${styles.scrollTransition}`}
            style={{
              transform: `translateX(-${(startIdx / games.length) * 100}%)`,
              width: `${(games.length / cardsPerView) * 100}%`,
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {games.map((game) => (
              <div
                key={game.id}
                className="flex-shrink-0"
                style={{
                  width: `${100 / games.length}%`,
                }}
                onClick={() => handleCardClick(game.id)} // Pass game ID on click
              >
                <SthCard
                  Year={game.lancamento}
                  Poster={`https://placehold.co/300x400?text=${game.nome}`}
                  Title={game.nome}
                />
              </div>
            ))}
          </div>
          <button
            className={`btn btn-dark d-none d-md-flex align-items-center justify-content-center  position-absolute ${styles.scrollIcon1}`}
            onClick={handleNext}
            disabled={startIdx >= games.length - cardsPerView}
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
