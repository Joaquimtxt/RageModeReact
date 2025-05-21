import React from "react";

const CreatePost = () => {
  return (
    <div className="container container-fluid">
      <div className="d-flex flex-column gap-4">
        <div className=" rounded-2 text-light border border-light d-flex flex-column align-items-center p-4">
          <i className="bi bi-cloud-upload-fill"></i>
          <span className="fw-light fs-3 text-center text-md-start">
            Envie uma URL ou arraste uma imagem aqui.
          </span>
        </div>
        <div className="border-light border rounded-2">
          <div className="form-label text-center bg-light bg-opacity-50 fw-bolder m-0">Título</div>
          <input type="" className="input-group p-0 m-0 bg-opacity-10 bg-light border-0 py-1 px-3" placeholder="Insira um título. Max caracteres: 100" />
        </div>

        <div className="border-light border rounded-2">
          <div className="form-conteudo form-label text-center bg-light bg-opacity-50 fw-bolder m-0 pt-1 pb-2">Conteúdo</div>
          <textarea type="" className="input-group p-0 m-0 bg-opacity-10 bg-light border-0 py-1 px-3" rows="3" placeholder="Escreva algo sobre a postagem aqui..." />
        </div>

        <div className="row">
            <div className="col-5">
                <div className="border-light border rounded-2">
          <div className="form-label text-center bg-light bg-opacity-50 fw-bolder m-0">Tags</div>
          <input type="" className="input-group p-0 m-0 bg-opacity-10 bg-light border-0 py-1 px-3 text-truncate" placeholder="Selecione as tags" />
        </div>
            </div>
        </div>

        <button className="logNsign btn text-light w-50 align-self-center fw-bolder">Criar discussão <i className="ms-2 bi bi-plus-circle-fill fs-6"></i></button>
      </div>
    </div>
  );
};

export default CreatePost;
