import React, { useEffect, useRef, useState } from "react";
import styles from "./CharacterCarousel.module.css"; // Crie ou copie um CSS semelhante ao Selectsth.module.css
import CharacterCard from "./CharacterCard"; // Novo componente para cada personagem

const CharacterCarousel = ({ titulo }) => {
  const characters = [
    { name: "Ryu", img: "https://placehold.co/300x400?text=Ryu" },
    { name: "Ken", img: "https://placehold.co/300x400?text=Ken" },
    { name: "Chun-Li", img: "https://placehold.co/300x400?text=Chun-Li" },
    { name: "Guile", img: "https://placehold.co/300x400?text=Guile" },
    { name: "Blanka", img: "https://placehold.co/300x400?text=Blanka" },
    { name: "Bison", img: "https://placehold.co/300x400?text=Bison" },
  ];

  const [cardsPerView, setCardsPerView] = useState(4);
  const [startIdx, setStartIdx] = useState(0);
  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

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
        >
          <ion-icon name="caret-back-outline" size="large"></ion-icon>
        </button>

        <div className="overflow-hidden">
          <div
            className={`d-flex flex-nowrap m-0 p-3 ${styles.scrollTransition}`}
            style={{
              transform: `translateX(-${
                (startIdx / characters.length) * 100
              }%)`,
              width: `${(characters.length / cardsPerView) * 100}%`,
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
                <CharacterCard name={char.name} image={char.img} />
              </div>
            ))}
          </div>

          <button
            className={`btn btn-dark d-none d-md-flex align-items-center justify-content-center position-absolute ${styles.scrollIconRight}`}
            onClick={handleNext}
            disabled={startIdx >= characters.length - cardsPerView}
          >
            <ion-icon name="caret-forward-outline" size="large"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterCarousel;
