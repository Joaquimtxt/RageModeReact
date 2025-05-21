import React, { useRef } from "react";

const SelectCharacter = () => {
  const containerRef = useRef(null);

  const handleScroll = (direction) => {
    const container = containerRef.current;
    const scrollAmount = 300; // Adjust scroll amount as needed
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
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
          <h2 className="text-center mb-4 text-light">Game Information</h2>
          <img
            src="https://placehold.co/300x200" // Placeholder image URL
            alt="Game Placeholder"
            className="mb-4 rounded-4"
          />
        </div>
        <div
          className="col-md-6 d-flex justify-content-between"
          style={{ gap: "15px" }}
        >
          <div>
            <h3 className="text-light">12312321</h3>
            <p className="text-light">
              A thrilling action game where you unleash your rage!
            </p>
          </div>
          <div>
            <h3 className="text-light">Ano</h3>
            <p className="text-light">123123123</p>
          </div>
          <div>
            <h3 className="text-light">Plataformas</h3>
            <p className="text-light">12312321312</p>
          </div>
        </div>
      </div>

      <div id="selectCards" className="row w-100 d-flex justify-content-center">
        <h2 className="text-center mb-4 text-light">Select Your Character</h2>
        <i
          className="bi bi-chevron-left carousel-arrow left"
          onClick={() => handleScroll("left")}
        ></i>
        <div className="character-container" ref={containerRef}>
          {[...Array(16)].map((_, index) => (
            <img
              key={index}
              src={`https://placehold.co/200x200?text=Character+${index + 1}`}
              alt={`Character ${index + 1}`}
              className="rounded-4"
            />
          ))}
        </div>
        <i
          className="bi bi-chevron-left carousel-arrow left"
          onClick={() => handleScroll("left")}
        />
        <i
          className="bi bi-chevron-right carousel-arrow right"
          onClick={() => handleScroll("right")}
        />
      </div>
    </div>
  );
};

export default SelectCharacter;
