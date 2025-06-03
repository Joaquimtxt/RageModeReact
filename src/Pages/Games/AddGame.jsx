import React from "react";

const AddGame = () => {
  return (
    <div className="container bg-danger rounded-3 text-light py-2 px-3 d-flex flex-column ">
      <p className="fs-2 fw-bold">ADICIONAR UM GAME</p>

      <div className="d-flex flex-column my-2 col-6">
        <label htmlFor="" className="form-label">
          Nome
        </label>
        <input className="input-text" placeholder=""></input>
      </div>

      <div className="d-flex flex-column my-2">
        <label htmlFor="" className="form-label">
          Descrição
        </label>
        <input className="input-group-text text-start" placeholder=""></input>
      </div>

      <div className="d-flex flex-column my-2">

        <label htmlFor="" className="form-label">
          Ano de Lançamento
        </label>
        <input className="input-group" type="date" placeholder=""></input>
      </div>

<div>
        <label htmlFor="" className="form-label">Poster do Game</label>
        <div className="mt-3 align-self-center">
      <div className=" rounded-2 text-light border border-light d-flex flex-column align-items-center p-4">
          <i className="bi bi-cloud-upload-fill"></i>
          <span className="fw-light fs-3 text-center text-md-start">
            Envie uma URL ou arraste uma imagem aqui.
          </span>
        </div>

        </div>
        </div>
    </div>
  );
};

export default AddGame;
