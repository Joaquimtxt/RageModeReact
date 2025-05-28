import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

const games = [
   "Street Fighter 1",
   "Street Fighter 2",
     "Street Fighter 3",
        "Street Fighter 4",
            "Street Fighter 5",
                "Street Fighter 6",
  ];

  const personagens =
[
    {
        id:1,
        nome:"Ryu",
        jogos:["Street Fighter 1", "Street Fighter 2", "Street Fighter 3", "Street Fighter 4", "Street Fighter 5", "Street Fighter 6"]
    },
    {
        id:2,
        nome:"Ken",
        jogos:["Street Fighter 1", "Street Fighter 2", "Street Fighter 3", "Street Fighter 4", "Street Fighter 5", "Street Fighter 6"]
    },
    {
        id:3,
        nome:"Chun-Li",
        jogos:[ "Street Fighter 2", "Street Fighter 3", "Street Fighter 4", "Street Fighter 5", "Street Fighter 6"]
    },
    {
        id:4,
        nome:"Guile",
        jogos:[ "Street Fighter 2", "Street Fighter 3", "Street Fighter 4", "Street Fighter 5", "Street Fighter 6"]
    },

    {
        id:5,
        nome:"Blanka",
        jogos:[ "Street Fighter 2", "Street Fighter 4", "Street Fighter 5", "Street Fighter 6"]
    },

    {
        id:6,
        nome:"Zangief",
        jogos:[ "Street Fighter 2", "Street Fighter 4", "Street Fighter 5", "Street Fighter 6"]
    }


]
const ModalTags = () => {

    const [mostrar, setMostrar] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
    })
     // Filtra personagens que aparecem no jogo selecionado
  const personagensDoJogo = selectedGame
  ? personagens.filter(p => p.jogos.includes(selectedGame))
  : [];
  // Função para botão Próximo/Finalizar
  const handleNextOrFinish = () => {
    if (!mostrar && !selectedGame) {
      setMostrar(true);
    } else if (selectedGame) {
      navigate("/");
    }
  };
  const handleCancel = () => {
    navigate("/");
  };
  return (
    <div className='modal-content bg-secondary'>
        <header className='bg-light fw-bold'><p className=''>Select Tags</p></header>
        {!mostrar && !selectedGame &&(
        <div className='modal-body'>
            <div className='d-flex flex-column align-items-center '>
                <ul>
                <button type="button" className="btn btn-outline-dark"  onClick={() => setMostrar(true)}>Combos</button>
                <button type="button" className="btn btn-outline-dark"  onClick={() => setMostrar(true)}>Specials</button>
                <button type="button" className="btn btn-outline-dark"  onClick={() => setMostrar(true)}>Curiosities</button>
                </ul>
            </div>         
            <div className="d-flex justify-content-between mt-3 w-100">
            <button className="btn btn-outline-danger" onClick={handleCancel} data-bs-toggle="modal">Cancel</button>
            <button className="btn btn-primary text-light" onClick={handleNextOrFinish}>Next</button>
          </div> 
            </div>
            )}

            {mostrar && !selectedGame &&(
            <div className='modal-body'>
            <div className='d-flex flex-column align-items-center bg-secondary'>
                <ul>
                {games.map((game, index) => (
                    <button key={index} type="button" className="btn btn-outline-dark" onClick={()=>setSelectedGame(game)}>{game}</button>
                ))}    
                </ul>  
            </div>
            <div className="d-flex justify-content-center mt-3 w-100">
            <button className="btn btn-outline-danger" onClick={handleCancel} data-bs-toggle="modal">Cancel</button>
          </div>          
            </div>
            )}
                {selectedGame && (
            <div className='modal-body'>
            <div className='d-flex flex-column align-items-center bg-secondary'>
                <ul>
                {personagensDoJogo.map((character) => (
                    <button key={character.id} type="button" className="btn btn-outline-dark" data-bs-toggle="modal" onClick={() => navigate("/")}>{character.nome}</button>
                ))}  
                </ul>    
            </div>    
            <div className="d-flex justify-content-between mt-3 w-100">
            <button className="btn btn-outline-danger" onClick={handleCancel} data-bs-toggle="modal">Cancel</button>
            <button className="btn btn-primary text-light" onClick={handleNextOrFinish} data-bs-toggle="modal">Finalize</button>
          </div>     
            </div>
            
)}
    </div>
  )
}

export default ModalTags