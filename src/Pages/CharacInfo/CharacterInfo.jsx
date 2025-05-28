import React from "react";
import styles from "./CharacterInfo.module.css"



const CharacterInfo = () => {
  return (
    <div className=" px-md-5 container-fluid d-flex flex-column">
      <div className="row bg">
        <div className="d-flex flex-column flex-md-row px-0 align-items-center justify-content-around gap-3 gap-md-5 ">
          <img src="https://placehold.co/200x200" />
          <div className="d-flex flex-column align-items-center">
            <span className="text-light jersey fs-1">PERSONAGEM</span>
            <span className="text-light fs-3">Classe</span>
            </div>
          <span className="fw-light fs-5 text-light">Descrição do Personagem específico</span>
        </div>
      </div>
<hr  className="text-light w-100 my-3 p-0 "/>
      <div className="row my-5">
        <p className="text-light display-4 text-center jersey mb-4">Moveset</p>
        <div className="d-flex flex-wrap gap-3">
          <div className="  border-light border rounded-1 p-1 text-center d-flex flex-column align-items-center text-light">
            <img
              src="https://placehold.co/400x220"
              className="img-fluid"
              alt=""
            />
            <p className="fw-bolder fs-4 my-2"> Move Name </p>
            <div className="">
              <img
                src="https://wiki.supercombo.gg/images/0/00/Qcb.png"
                className="img-fluid w-50"
                alt=""
              />
              + LK
            </div>
          </div>
        </div>
      </div>
      <div className="row"></div>
    </div>
  );
};

export default CharacterInfo;
