import React, { useRef, useState } from "react";
import { createJogo } from "../../api/jogo";
import { Navigate, useNavigate } from "react-router";




const AddGame = () => {
  const [jogoNome, setJogoNome] = useState("")
  const [jogoDesc, setJogoDesc] = useState("")
  const [jogoData, setJogoData] = useState("")
  const [Erro, setErro] = useState("")
  const [imageBanner, setImageBanner] = useState("")
  const fileInputRef = useRef(null);
const navigate = useNavigate();



// Cancela criação do game
  const handleCancel = () => {
    setJogoData("");
    setJogoNome("");
    setJogoDesc("");
    setImageBanner("");
    navigate("/games");
  };

   // Lida com envio de URL manual
   const handleImageUrlChange = (e) => {
    setImageBanner(e.target.value);
  };
    // Lida com upload de arquivo (drag & drop ou input)
    const handleImageFile = (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageBanner(e.target.result);
      };
      reader.readAsDataURL(file);
    };
  
    // Drag & Drop
    const handleDrop = (e) => {
      e.preventDefault();
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleImageFile(e.dataTransfer.files[0]);
      }
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
    };
  
    // Input file
    const handleFileInputChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        handleImageFile(e.target.files[0]);
      }
    };

  // Cria o jogo (envia apenas tags válidas)
  const handleCreate = async () => {
    
if (!jogoNome || !jogoDesc || !jogoData) {
      setErro("Preencha todos os campos obrigatórios!");
      return;
    }
    const GameData = {
      jogoNome: jogoNome,
      jogoDescricao: jogoDesc,
      anoLancamento: jogoData,
      imageBanner: imageBanner || "https://placehold.co/300x400"
    };
 
    createJogo(GameData)
  .then(() => {
    alert("Game created successfully!");
    handleCancel();
  })
  .catch((err) => {
    console.error("Error creating game:", err);
    alert("Error creating game!");
  });

   navigate("/games");
};

  

  return (
    <div className="container bg-danger rounded-3 text-light py-2 px-3 d-flex flex-column ">
      <p className="fs-2 fw-bold">ADD A GAME</p>

      <div className="d-flex flex-column my-2 col-6">
        <label htmlFor="" className="form-label">
          Name
        </label>
        <input value={jogoNome} onChange={(e) => setJogoNome(e.target.value)} className="input-text" placeholder=""></input>
      </div>

      <div className="d-flex flex-column my-2">
        <label htmlFor="" className="form-label">
          Description
        </label>
        <input  value={jogoDesc} onChange={(e) => setJogoDesc(e.target.value)} className="input-group-text text-start" placeholder=""></input>
      </div>

      <div className="d-flex flex-column my-2">

        <label htmlFor="" className="form-label">
          Release Date
        </label>
        <input onChange={(e) => setJogoData(e.target.value) } value={jogoData} className="input-group" type="date" placeholder=""></input>
      </div>

<div>
        <label htmlFor="" className="form-label">Game's Poster</label>
        <div className="mt-3 align-self-center">
      <div className=" rounded-2 text-light border border-light d-flex flex-column align-items-center p-4">
             <div
          className="rounded-2 text-light border border-light d-flex flex-column align-items-center p-4"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{ cursor: "pointer" }}
          onClick={() => fileInputRef.current.click()}
        >
          <i className="bi bi-cloud-upload-fill"></i>
          <span className="fw-light fs-3 text-center text-md-start">
         Send a URL or drag an image here.
          </span>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Ou cole a URL da imagem"
            value={imageBanner.startsWith("data:") ? "" : imageBanner}
            onChange={handleImageUrlChange}
            disabled={!!imageBanner}
          />
          {imageBanner && (
            <div className="mt-2">
              <img src={imageBanner} alt="Preview" style={{ maxWidth: 200, maxHeight: 200 }} />
              <button className="btn btn-sm btn-danger ms-2" onClick={() => setImageBanner("")}>
                Remove image
              </button>
            </div>
          )}
        </div>

        </div>

        </div>
        <div className="d-flex justify-content-between my-3" >
        <button onClick={handleCancel} className="btn btn-outline-secondary"> Cancel</button>
        <button onClick={handleCreate} className="btn btn-success"> Add</button>
        </div>
      </div>
    </div>
  );
};


export default AddGame;
