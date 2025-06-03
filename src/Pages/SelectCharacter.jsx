import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router"; // Import useLocation to get query parameters
import styles from "../components/CharacterCarousel/CharacterCarousel.module.css"; // Importando o CSS do carrossel
import { gameCharacters, jogosDeLuta } from "../data"; // Import gameCharacters and jogosDeLuta
import Modal from "react-bootstrap/Modal"; // Import Bootstrap Modal

// Componente CharacterCard para cada personagem
const CharacterCard = ({ name, image, description, onClick }) => {
  return (
    <div
      className={`card text-bg-dark ${styles.card}`}
      onClick={() => onClick({ name, image, description })}
      style={{ cursor: "pointer" }}
    >
      <img src={image} className="card-img" alt={name} />
      <div className="card-img-overlay d-flex align-items-end">
        <h5 className="card-title bg-dark bg-opacity-75 p-2 w-100 text-center">
          {name}
        </h5>
      </div>
    </div>
  );
};

// Componente principal do carrossel de personagens
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
                  name={char.name}
                  image={char.img}
                  description={char.description || "No description available"}
                  onClick={onCharacterClick}
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

const SelectCharacter = () => {
  const location = useLocation(); // Get location object
  const queryParams = new URLSearchParams(location.search); // Parse query parameters
  const gameId = queryParams.get("gameId"); // Extract gameId from query parameters
  const characters = gameCharacters[gameId] || []; // Fetch characters by game ID
  const gameInfo = jogosDeLuta.find((game) => game.id === parseInt(gameId)); // Fetch game info by ID

  const [selectedCharacter, setSelectedCharacter] = useState(null); // State for selected character
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCharacter(null);
  };

  return (
    <div
      className="container-fluid d-flex flex-column align-items-center"
      style={{ minHeight: "100vh", marginTop: "60px", padding: "0" }}
    >
      <div
        id="gameTittle"
        className="row w-100"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "20px",
          margin: "0",
        }}
      >
        <div className="col-md-6 d-flex flex-column align-items-center">
          <h2 className="text-center mb-4 text-light">
            {gameInfo?.nome || "Game Information"}
          </h2>
          <img
            src={
              gameInfo
                ? `/images/${gameInfo.imagem}`
                : "https://placehold.co/300x200"
            }
            alt={gameInfo?.nome || "Game Placeholder"}
            className="mb-4 rounded-4"
          />
        </div>
        <div
          className="col-md-6 d-flex justify-content-between"
          style={{ gap: "15px" }}
        >
          <div>
            <h3 className="text-light">Desenvolvedora</h3>
            <p className="text-light">{gameInfo?.desenvolvedora || "N/A"}</p>
          </div>
          <div>
            <h3 className="text-light">Ano</h3>
            <p className="text-light">{gameInfo?.lancamento || "N/A"}</p>
          </div>
          <div>
            <h3 className="text-light">Plataformas</h3>
            <p className="text-light">
              {gameInfo?.plataformas.join(", ") || "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div
        className={`container-fluid p-0 mt-4 mb-4 d-flex flex-column align-items-start w-100`}
      >
        <h1 className="text-light mt-5 text-start">Select Character</h1>
        <div className="py-3 rounded bg-dark mt-2 px-0 w-100">
          <CharacterCarousel
            titulo={`Personagens`}
            characters={characters}
            onCharacterClick={handleCharacterClick}
          />
        </div>
      </div>

      {/* Modal for character details */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton id="modal-header">
          <Modal.Title>{selectedCharacter?.name}</Modal.Title>
        </Modal.Header >
        <Modal.Body id="modal-body" className="text-center">
          <img
            src={selectedCharacter?.image}
            alt={selectedCharacter?.name}
            className="img-fluid mb-3"
          />
          <p>{selectedCharacter?.description}</p>
        </Modal.Body>
        <Modal.Footer id="modal-footer">
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SelectCharacter;
