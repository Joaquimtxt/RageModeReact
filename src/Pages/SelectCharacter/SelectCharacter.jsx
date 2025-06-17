import React, { useEffect, useImperativeHandle, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { deleteJogo, getJogoById } from "../../api/jogo";
import { getPersonagensByJogo } from "../../api/personagemJogos";
import { createTipoPersonagem, getTiposPersonagem } from "../../api/tipoPersonagem";
import { getCharacterPicture } from "../../api/personagem";
import CharacterCarroussel from "../../components/CharacterCarousel/CharacterCarroussel";
import Modal from "react-bootstrap/Modal";
import { getOwnUserProfile } from "../../api/usuarios";

// Componente principal do carrossel de personagens

const SelectCharacter = () => {
  const { jogoId } = useParams();
  const [gameInfo, setGameInfo] = useState(null);
  const [tipos, setTipos] = useState([]);
  const [personagensPorTipo, setPersonagensPorTipo] = useState({});
  const [userInfo, setUserInfo] = useState();
  const [nomeClasse, setNomeClasse] = useState("")
  const navigate = useNavigate();

    getOwnUserProfile()
      .then(setUserInfo)
      .catch((error) => {
        console.log(error);
      });
 

    const addClass = () => {

      const dataClasse = {
        tipoNome: nomeClasse
      }

      createTipoPersonagem(dataClasse).catch(error => {
        console.log("Erro ao Adicionar uma Classe: ", error)
      });
    }

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
        const personagens = await getPersonagensByJogo(
          jogo.jogoNome || jogo.nome
        );

        const personagensComImagem = await Promise.all(
          personagens.map(async (personagem) => {
            let image = personagem.personagemimage;
            // Se não vier imagem, tenta buscar
            if (!image && personagem.personagemId) {
              try {
                const imgData = await getCharacterPicture(
                  personagem.personagemId
                );
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
          const tipoId =
            personagem.tipoPersonagemId ||
            personagem.tipoPersonagem?.id ||
            personagem.tipoPersonagem;
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
    navigate(`/characterInfo/${character.personagemId}`);
  };

  const handleDeleteGame = () => {
    if(userInfo.usuarioRole != "Admin") {
      navigate("/")
      alert("Somente um administrador pode excluir ou alterar a lista de Jogos.")
    } else {

      
      const confirmDelete = window.confirm(
      `Deseja excluir o jogo ${gameInfo.jogoNome}? esta será uma ação irreversivel.`
    );

    if (!confirmDelete) return;
    
    deleteJogo(jogoId).then(setGameInfo(null));
    navigate("/games");
    window.location.reload();
    alert("Jogo deletado com sucesso.");
  }
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
          <h2 className="text-center mb-4 text-light">{gameInfo?.jogoNome}</h2>
          <img
            src={gameInfo?.imageBanner}
            alt={gameInfo?.jogoNome || "Game Placeholder"}
            className="mb-4 rounded-4"
          />

{gameInfo && userInfo.usuarioRole ? (
  <button
            className="bg-danger px-2 py-1 rounded-3 text-light border-0"
            onClick={handleDeleteGame}
          >
             <i className="bi bi-trash me-2"></i> Deletar{" "}
          </button>
) : ("")}
          
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
        <h1 className="text-light my-5 text-start fw-bold align-self-center">
          Lista de Personagens
        </h1>
        {tipos.map((tipo) => {
          const personagensDoTipo =
            personagensPorTipo[tipo.tipoPersonagemId] || [];
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
        <Link
          to={`/games/${jogoId}/addcharacter`}
          state={{
            jogoSelecionado: {
              jogoId: gameInfo?.jogoId || jogoId,
              jogoNome: gameInfo?.jogoNome,
            },
          }}
          className="text-decoration-none text-light btn btn-danger btn-lg align-self-center mt-3"
        >
          <i className="bi bi-plus-circle fs-5 me-2"></i> Adicionar um
          Personagem
        </Link>
        <button
          type="button"
          className="btn btn-warning btn-lg align-self-center mt-2 "
          data-bs-toggle="modal"
          data-bs-target="#modalClasse"
        >
          <i className="bi bi-lightning-charge-fill me-1"></i> Adicionar uma
          Classe
        </button>

        <div className="modal fade" id="modalClasse" aria-hidden="true" >
          <div className="modal-dialog">
            <div className="modal-content bg-secondary shadow-lg border-3 border-light">
              <div className="modal-header py-2">
              <div className="modal-title jersey text-light mt-3 fs-3 ms-0">
                  ADICIONAR CLASSES
              </div>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body d-flex flex-column gap-3">
                <div className="d-flex flex-column">
                  <label htmlFor="" className="form-label">Insira o nome da Classe:</label>
                  <input
                  type=""
                   className="col-6" 
                  placeholder="Ex: Grappler..." 
                  value={nomeClasse} 
                  onChange={(e) => setNomeClasse(e.target.value)}  />
                </div>
                <div className="align-self-center">
                  <button className="btn btn-success btn-sm" ><i className="bi bi-check-all me-1" onClick={addClass}></i>Criar</button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default SelectCharacter;
