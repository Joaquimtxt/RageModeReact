import React, { useEffect, useState } from 'react'
import { getGames, getPersonagensByJogo } from "../../api/personagemJogos";

const ModalTags = ({onClose, onFinish }) => {

  const [tipo, setTipo] = useState("");
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [personagens, setPersonagens] = useState([]);
  const [selectedPersonagem, setSelectedPersonagem] = useState(null);
  const [step, setStep] = useState(1);
  

  useEffect(() => {
    getGames()
      .then(setGames)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedGame) {
      getPersonagensByJogo(selectedGame.jogoNome)
        .then(setPersonagens)
        .catch(console.error);
    }
  }, [selectedGame]);

  const handleCancel = () => {
    setTipo("");
    setSelectedGame(null);
    setPersonagens([]);
    setSelectedPersonagem(null);
    setStep(1);
    if (onClose) onClose();
  };

  const handleNext = () => setStep(2);

  const handleSelectTipo = (tipo)=>{
    setTipo(tipo);
    setStep(2);
  }

  const handleSelectGame = (game) => {
    setSelectedGame(game);
    setStep(3);
  };

 const handleSelectPersonagem = (personagem) => {
  setSelectedPersonagem(personagem);
};

  const handleFinish = () => {
    const tag = [];
    if (tipo) tag.push({ label: tipo, type: "tipo" });
    if (selectedGame?.jogoNome) tag.push({
       label: selectedGame.jogoNome, type: "jogo" })
   if (selectedPersonagem?.personagemNome) tag.push({
  label: selectedPersonagem.personagemNome,
  type: "personagem",
  personagemId: selectedPersonagem.personagemId 
});
    if (onFinish) onFinish(tag);
    
    if (onFinish)
    setStep(1);
    if (onClose) onClose();
  };

  return (
    <div className="modal fade" id="TagModal" tabIndex="-1" aria-labelledby="TagModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg">
    <div className='modal-content bg-secondary'>
        <header className='bg-light fw-bold '><p className='text-dark'>Select Tags</p></header>
        {step === 1 &&(
        <div className='modal-body'>
            <div className='d-flex flex-column align-items-center '>
            <ul className='d-flex flex-row list-unstyled'>
  <li key="combos">
  <button type="button" className="btn btn-outline-dark" onClick={() => handleSelectTipo("Combos")}>Combos</button>
  </li>
  <li key="specials">
    <button type="button" className="btn btn-outline-dark" onClick={() => handleSelectTipo("Specials")}>Specials</button>
  </li>
  <li key="curiosities">
    <button type="button" className="btn btn-outline-dark" onClick={() => handleSelectTipo("Curiosities")}>Curiosities</button>
  </li>
</ul>
            </div>         
            <div className="d-flex justify-content-between mt-3 w-100">
            <button className="btn btn-outline-danger" onClick={handleCancel} data-bs-toggle="modal">Cancel</button>
            <button className="btn btn-primary text-light" onClick={handleNext}>Next</button>
          </div> 
            </div>
            )}

            {step === 2 &&(
       <div className='modal-body'>
    <div className='d-flex flex-column align-items-center bg-secondary'>
      <div className="row w-100">
        {games.map((game) => (
          <div className="col-3 mb-3 d-flex justify-content-center" key={game.jogosId}>
            <button
              type="button"
              className="btn btn-outline-dark w-100"
              onClick={() => handleSelectGame(game)}
            >
              {game.jogoNome}
            </button>
          </div>
        ))}
      </div>
    </div>
    <div className="d-flex justify-content-center mt-3 w-100">
      <button className="btn btn-outline-danger" onClick={handleCancel}>Cancel</button>
    </div>
  </div>
            )}
                {step===3 && (
            <div className='modal-body'>
            <div className='d-flex flex-column align-items-center bg-secondary'>
<div className='row w-100'>
                {personagens.map((character) => (
                     <div className="col-3 mb-3 d-flex justify-content-center" key={character.personagemId}>
                    <button type="button" className="btn btn-outline-dark"  onClick={() => {handleSelectPersonagem(character)}}>{character.personagemNome}</button>
                    </div>
                  ))}  
                  </div>
                
            </div>    
            <div className="d-flex justify-content-between mt-3 w-100">
            <button className="btn btn-outline-danger" onClick={handleCancel} data-bs-toggle="modal">Cancel</button>
            <button className="btn btn-primary text-light" onClick={handleFinish} data-bs-toggle="modal">Finish</button>
          </div>     
            </div>
            
)}
    </div>
    </div>
    </div>
  )
}

export default ModalTags