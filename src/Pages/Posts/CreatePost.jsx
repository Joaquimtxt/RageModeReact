import React from "react";
import ModalTags from "../../components/ModalTags/ModalTags";

const CreatePost = () => {
  return (
    <div className="container-fluid col-12 col-md-5">
      <div className="d-flex flex-column gap-4">
        <div className=" rounded-2 text-light border border-light d-flex flex-column align-items-center p-4">
          <i className="bi bi-cloud-upload-fill"></i>
          <span className="fw-light fs-3 text-center text-md-start">
            Envie uma URL ou arraste uma imagem aqui.
          </span>
        </div>
        <div className="border-light border rounded-2">
          <div className="form-label text-center bg-light bg-opacity-50 fw-bolder m-0">Título</div>
          <input type="" className="input-group p-0 m-0 bg-opacity-10 bg-light border-0 py-1 px-3 text-light text-opacity-75" placeholder="Insira um título. Max caracteres: 100" />
        </div>

        <div className="border-light border rounded-2">
          <div className="form-conteudo form-label text-center bg-light bg-opacity-50 fw-bolder m-0 pt-1 pb-2">Conteúdo</div>
          <textarea type="" className="input-group p-0 m-0 bg-opacity-10 bg-light border-0 py-1 px-3 text-light text-opacity-75" rows="3" placeholder="Escreva algo sobre a postagem aqui..." />
        </div>

        <div className="row">
            <div className="col-5">
                <div className="border-light border rounded-2">
          <div className="form-label text-center bg-light bg-opacity-50 fw-bolder m-0">Tags</div>
          <input type="button" className="p-0 m-0 border-0 text-truncate" />
       <button className="btn bg-light bg-opacity-10 text-secondary w-100"  data-bs-toggle="modal" data-bs-target="#TagModal">Selecione as tags</button>
        </div>
            </div>
        </div>

        <button className=" logNsign btn text-light w-auto align-self-center fw-bolder">Criar discussão <i className="ms-2 bi bi-plus-circle-fill fs-6"></i></button>
      </div>
    <div className="modal fade" id="TagModal" tabIndex="-1" aria-labelledby="TagModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg">
        <div className="modal-content">
        <ModalTags />
        </div>
          
          </div>
          </div>
    </div>
  );
};

export default CreatePost;
