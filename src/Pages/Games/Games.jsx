import React from 'react'
import Selectsth from '../../components/SelectGame/SelectGame.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import  games  from "../../data/Games.js"

const Games = () => {
  return (
    <div className={`container-fluid p-0 mt-4 mb-4 d-flex flex-column align-items-start w-100`}>
      <h1 className="text-light mt-5 text-start">Jogos</h1>
    <div className=" py-3 rounded bg-dark mt-2 px-0">
      <Selectsth Titulo="games" />
    </div>
  </div>
  );
};

export default Games