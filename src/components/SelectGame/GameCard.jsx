import styles from "./SelectGame.module.css";
import { Link } from "react-router";

const GameCard = (props) => {
  const isSmallScreen = window.innerWidth < 700;
  return (
    <Link className="" to={`/games/${props.jogoId}/character`}>
      <div
        className={`card ${styles.card} position-relative rounded-bottom-3`}
        style={{
          transform: isSmallScreen ? "scale(0.95)" : "scale(1)",
          width: "300px",
          height: "450px",
        }}
      >
        <div className="card-body position-absolute align-text-center w-100 top-0">
          <p>{props.Year}</p>
        </div>
        <div className="card-body position-absolute top-0 start-0 p-0 w-100 h-100 ">
          <img
            src={props.Poster}
            alt={props.Title}
            className="rounded-0 rounded-bottom-2 w-100 h-100 object-fit-cover"
          />
        </div>
        <div
          className="card-footer position-absolute bottom-0 w-100 text-center d-flex p-1 p-md-3 flex-column justify-content-end z-3"
          style={{ height: "50px" }}
        >
          <h6 className="m-0">{props.Title}</h6>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
