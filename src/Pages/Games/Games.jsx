import React from 'react'
import SelectGame from '../../components/SelectGame/SelectGame.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { Link } from 'react-router';

const Games = () => {
  return (
    <div className={`container-fluid p-0 mt-4 mb-4 d-flex flex-column align-items-start w-100`}>
      <h1 className="text-light mt-5 text-start">Jogos</h1>
    <div className=" py-3 rounded bg-dark mt-2 px-0">
      <SelectGame Titulo="games" />
    </div>
<Link to={"/AddGame"} className='text-decoration-none text-light btn btn-danger btn-lg align-self-center mt-3'> <i className='bi bi-plus-circle fs-5 me-2'></i>  Adicionar um Game</Link>
  </div>
  );
};

export default Games