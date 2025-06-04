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
      getPersonagensByJogo(selectedGame.JogoNome)
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

  const handleSelectGame = (game) => {
    setSelectedGame(game);
    setStep(3);
  };

  const handleSelectPersonagem = (personagem) => {
    setSelectedPersonagem(personagem);
  };

  const handleFinish = () => {
    const tag = {
      tipo: tipo || null,
      jogoId: selectedGame?.JogosId,
      jogoNome: selectedGame?.JogoNome,
      personagemId: selectedPersonagem?.PersonagemId || null,
      personagemNome: selectedPersonagem?.PersonagemNome || null
    };
    if (!tag.jogoId) {
      alert("Selecione um jogo!");
      return;
    }
    if (onFinish) onFinish([tag]);
    setTipo("");
    setSelectedGame(null);
    setPersonagens([]);
    setSelectedPersonagem(null);
    setStep(1);
    if (onClose) onClose();
  };

  return (
    <div className='modal-content bg-secondary'>
        <header className='bg-light fw-bold'><p className=''>Select Tags</p></header>
        {step === 1 &&(
        <div className='modal-body'>
            <div className='d-flex flex-column align-items-center '>
                <ul>
                <button type="button" className="btn btn-outline-dark"  onClick={() => setTipo("Combos")}>Combos</button>
                <button type="button" className="btn btn-outline-dark"  onClick={() => setTipo("Specials")}>Specials</button>
                <button type="button" className="btn btn-outline-dark"  onClick={() => setTipo("Curiosities")}>Curiosities</button>
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
                <ul>
                {games.map(game => (
                    <button key={game.JogosId} type="button" className="btn btn-outline-dark" onClick={()=>handleSelectGame(game.JogoNome)}>{game.JogoNome}</button>
                ))}    
                </ul>  
            </div>
            <div className="d-flex justify-content-center mt-3 w-100">
            <button className="btn btn-outline-danger" onClick={handleCancel} data-bs-toggle="modal">Cancel</button>
          </div>          
            </div>
            )}
                {step===3 && (
            <div className='modal-body'>
            <div className='d-flex flex-column align-items-center bg-secondary'>
                <ul>
                {personagens.map((character) => (
                    <button key={character.PersonagemId} type="button" className="btn btn-outline-dark" data-bs-toggle="modal" onClick={() => handleSelectPersonagem(character.PersonagemId)}>{character.PersonagemNome}</button>
                ))}  
                </ul>    
            </div>    
            <div className="d-flex justify-content-between mt-3 w-100">
            <button className="btn btn-outline-danger" onClick={handleCancel} data-bs-toggle="modal">Cancel</button>
            <button className="btn btn-primary text-light" onClick={handleFinish} data-bs-toggle="modal">Finalize</button>
          </div>     
            </div>
            
)}
    </div>
  )
}

export default ModalTags