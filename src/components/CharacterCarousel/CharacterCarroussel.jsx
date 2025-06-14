import React, { useEffect, useRef, useState } from "react";
import styles from "./CharacterCarousel.module.css"; // Crie ou copie um CSS semelhante ao Selectsth.module.css
import CharacterCard from "../CharacterCard/CharacterCard"; // Novo componente para cada personagem

const CharacterCarousel = ({ titulo, characters, onCharacterClick }) => {
  const [cardsPerView, setCardsPerView] = useState(4);
  const [startIdx, setStartIdx] = useState(0);
  const touchStartX = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(window.innerWidth < 700 ? 3 : 4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setStartIdx((prev) => Math.max(prev - cardsPerView, 0));
  };

  const handleNext = () => {
    setStartIdx((prev) =>
      Math.min(prev + cardsPerView, characters.length - cardsPerView)
    );
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    touchStartX.current = null;
  };

  return (
    <div
      className={`container-fluid rounded-2 position-relative w-100 px-0 ${styles.carouselContainer}`}
    >
      <h1 className="ms-xl-5 ms-2 text-light">{titulo}</h1>
      <div className={`d-flex align-items-center ${styles.carouselScroll}`}>
        <button
          className={`btn btn-dark d-none d-md-flex align-items-center justify-content-center z-2 position-relative ${styles.scrollIconLeft}`}
          onClick={handlePrev}
          disabled={startIdx === 0}
          aria-label="Anterior"
        >
          <ion-icon name="caret-back-outline" size="large"></ion-icon>
        </button>

        <div className="overflow-hidden" style={{ width: "100%" }}>
          <div
            className={`d-flex flex-nowrap m-0 p-3 ${styles.scrollTransition}`}
            style={{
              transform: `translateX(-${
                (startIdx / characters.length) * 100
              }%)`,
              width: `${(characters.length / cardsPerView) * 100}%`,
              transition: "transform 0.5s ease",
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {characters.map((char, idx) => (
              <div
                key={idx}
                className="flex-shrink-0"
                style={{ width: `${100 / characters.length}%` }}
              >
                <CharacterCard
                  name={char.personagemNome}
      image={char.personagemimage}
      description={char.personagemDescricao || "No description available"}
      onClick={() => onCharacterClick(char)}
                />
              </div>
            ))}
          </div>

          <button
            className={`btn btn-dark d-none d-md-flex align-items-center justify-content-center position-absolute ${styles.scrollIconRight}`}
            onClick={handleNext}
            disabled={startIdx >= characters.length - cardsPerView}
            aria-label="Próximo"
          >
            <ion-icon name="caret-forward-outline" size="large"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterCarousel;
