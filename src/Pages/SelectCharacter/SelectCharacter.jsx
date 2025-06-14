import React, { useEffect, useState } from "react";
import {useParams } from "react-router"; 
import { getJogoById } from "../../api/jogo";
import { getPersonagensByJogo } from "../../api/personagemJogos";
import { getTiposPersonagem } from "../../api/tipoPersonagem";
import { getCharacterPicture } from "../../api/personagem";
import CharacterCarroussel from "../../components/CharacterCarousel/CharacterCarroussel";
import Modal from "react-bootstrap/Modal";




// Componente principal do carrossel de personagens


const SelectCharacter = () => {
   const { jogoId } = useParams();
  const [gameInfo, setGameInfo] = useState(null);
  const [tipos, setTipos] = useState([]);
  const [personagensPorTipo, setPersonagensPorTipo] = useState({});
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    async function fetchData() {
      try {
        // Busca informações do jogo
        const jogo = await getJogoById(jogoId);
        setGameInfo(jogo);


         // Busca todos os tipos de personagem
        const tiposPersonagem = await getTiposPersonagem();
        setTipos(tiposPersonagem);

        // Busca personagens pelo nome do jogo
        const personagens = await getPersonagensByJogo(jogo.jogoNome || jogo.nome);
      
        const personagensComImagem = await Promise.all(
          personagens.map(async (personagem) => {
            let image = personagem.personagemimage;
            // Se não vier imagem, tenta buscar
            if (!image && personagem.personagemId) {
              try {
                const imgData = await getCharacterPicture(personagem.personagemId);
                image = imgData?.image || "";
              } catch {
                image = "";
              }
            }
            return { ...personagem, image };
          })
        );


        // Agrupa personagens por tipoPersonagem
        const agrupados = {};
        personagensComImagem.forEach((personagem) => {
          // Pode ser personagem.tipoPersonagem ou personagem.tipoPersonagemId
          const tipoId = personagem.tipoPersonagemId || personagem.tipoPersonagem?.id || personagem.tipoPersonagem;
          if (!tipoId) return;
          if (!agrupados[tipoId]) agrupados[tipoId] = [];
          agrupados[tipoId].push(personagem);
        });
        setPersonagensPorTipo(agrupados);
      } catch (e) {
         console.error("Erro ao buscar dados:", e);
        setGameInfo(null);
        setTipos([]);
        setPersonagensPorTipo({});
      }
    }
    fetchData();
  }, [jogoId]);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCharacter(null);
  };

  return (
    <div
      className="container-fluid d-flex flex-column align-items-center"
      style={{ minHeight: "100vh", marginTop: "60px", padding: "0" }}
    >
      <div
        id="gameTittle"
        className="row w-100"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "20px",
          margin: "0",
        }}
      >
        <div className="col-md-6 d-flex flex-column align-items-center">
          <h2 className="text-center mb-4 text-light">
            {gameInfo?.jogoNome}
          </h2>
          <img
            src={gameInfo?.imageBanner}
            alt={gameInfo?.jogoNome || "Game Placeholder"}
            className="mb-4 rounded-4"
          />
        </div>
        <div
          className="col-md-6 d-flex justify-content-between"
          style={{ gap: "15px" }}
        >
          <div>
            <h3 className="text-light">Year</h3>
            <p className="text-light">{gameInfo?.anoLancamento || "N/A"}</p>
          </div>
          <div>
            <h3 className="text-light">Description</h3>
            <p className="text-light">
              {gameInfo?.jogoDescricao || "No description available"}
            </p>
          </div>
        </div>
      </div>

     <div className="container-fluid p-0 mt-4 mb-4 d-flex flex-column align-items-start w-100">
        <h1 className="text-light mt-5 text-start">Selecione o Personagem</h1>
        {tipos.map((tipo) => {
          const personagensDoTipo = personagensPorTipo[tipo.tipoPersonagemId] || [];
          if (personagensDoTipo.length === 0) return null;
          return (
            <div key={tipo.tipoPersonagemId} className="mb-5 w-100">
              <CharacterCarroussel
                titulo={tipo.tipoNome}
                characters={personagensDoTipo}
                onCharacterClick={handleCharacterClick}
              />
            </div>
          );
        })}
      </div>

      {/* Modal for character details */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton id="modal-header">
          <Modal.Title>{selectedCharacter?.personagemNome}</Modal.Title>
        </Modal.Header >
        <Modal.Body id="modal-body" className="text-center">
          <img
            src={selectedCharacter?.personagemimage}
            alt={selectedCharacter?.personagemNome}
            className="img-fluid mb-3"
          />
          <p>{selectedCharacter?.personagemDescricao}</p>
        </Modal.Body>
        <Modal.Footer id="modal-footer">
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SelectCharacter;
