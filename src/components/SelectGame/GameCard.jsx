import React from "react";
import styles from "./SelectGame.module.css";

const GameCard = ({ id, Title, Poster }) => {
  const isSmallScreen = window.innerWidth < 700;

  return (
    <div
      className="p-1"
      style={{
        width: isSmallScreen ? "70%" : "100%",
        minWidth: isSmallScreen ? "70%" : "100%",
        maxWidth: isSmallScreen ? "70%" : "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        className={`card h-100 w-100 ${styles.card}`}
        style={{
          transform: isSmallScreen ? "scale(0.95)" : "scale(1)",
        }}
      >
        <div className="position-relative">
          <img
            src={Poster}
            alt={Title}
            className="card-img-top object-fit-cover"
          />
        </div>
        <div className="card-body text-center d-flex p-1 p-md-3 flex-column justify-content-end">
          <h6 className="m-0">{Title}</h6>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
