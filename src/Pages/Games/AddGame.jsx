import React, { useState } from "react";
import api from '../../services/api';
import { Navigate, useNavigate } from "react-router";
import axios from 'axios'




const AddGame = () => {
  const [jogoNome, setJogoNome] = useState("")
  const [jogoDesc, setJogoDesc] = useState("")
  const [jogoData, setJogoData] = useState("")
  const [Erro, setErro] = useState("")
  const [imageBanner, setImageBanner] = useState("")
const navigate = useNavigate();


  const handleEnviar = async (e) => {
    e.preventDefault();
    
    if (!jogoNome || !jogoDesc || !jogoData) {
      setErro("Preencha todos os campos obrigatórios.")
      return;
  }
  try {

    
    const infoJogo = {
      jogoNome: jogoNome,
      imageBanner: imageBanner || "https://placehold.co/300x400",
      jogoDescricao: jogoDesc,
      anoLancamento: jogoData
    }
    
    const resposta = await api.post('/api/Jogos', infoJogo);
    
    console.log(`Jogo adicionado com sucesso:`, resposta.data)
    console.log("Jogo adicionado com sucesso.")
    
    setJogoNome("");
    setImageBanner("");
    setJogoDesc("");
    setJogoData("");
    
    navigate("/");
  }
 catch (err) {
  if (axios.isAxiosError(err)) { // Use axios.isAxiosError para verificar se é um erro do Axios
    if (err.response) {
      console.error("Erro na resposta do servidor:", err.response.data);
      // Opcional: Se sua API retornar mensagens de erro específicas, você pode acessá-las aqui
      setErro(err.response.data.message || err.response.data || "Erro ao adicionar o jogo.");
    } else if (err.request) {
      console.error("Nenhuma resposta recebida:", err.request);
      setErro("Não foi possível conectar ao servidor. Verifique sua conexão.");
    } else {
      console.error("Erro ao configurar a requisição:", err.message);
      setErro("Ocorreu um erro inesperado. Tente novamente.");
    }
  } else {
    // Erro não relacionado ao Axios
    console.error("Erro inesperado:", err);
    setErro("Ocorreu um erro inesperado.");
  }

  }
}
  return (
    <div className="container bg-danger rounded-3 text-light py-2 px-3 d-flex flex-column ">
      <p className="fs-2 fw-bold">ADICIONAR UM GAME</p>

      <div className="d-flex flex-column my-2 col-6">
        <label htmlFor="" className="form-label">
          Nome
        </label>
        <input value={jogoNome} onChange={(e) => setJogoNome(e.target.value)} className="input-text" placeholder=""></input>
      </div>

      <div className="d-flex flex-column my-2">
        <label htmlFor="" className="form-label">
          Descrição
        </label>
        <input  value={jogoDesc} onChange={(e) => setJogoDesc(e.target.value)} className="input-group-text text-start" placeholder=""></input>
      </div>

      <div className="d-flex flex-column my-2">

        <label htmlFor="" className="form-label">
          Ano de Lançamento
        </label>
        <input onChange={(e) => setJogoData(e.target.value) } value={jogoData} className="input-group" type="date" placeholder=""></input>
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
        <button onClick={handleEnviar} className="btn btn-success my-3"> Adicionar</button>
    </div>
  );
};


export default AddGame;
