import React from 'react'
import Selectsth from '../../components/Selectsth/Selectsth'

const Games = () => {
  return (
    <div className="container-fluid p-0 mt-4 mb-4 d-flex justify-content-start">
    <div className=" p-3 rounded bg-dark" style={{ maxWidth: '50%' }}>
      <h1 className="text-light mb-4 text-center">Jogos</h1>
      <Selectsth Titulo="Street Fighter" />
    </div>
  </div>
  );
};

export default Games