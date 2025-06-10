import React, { useRef, useState } from "react";
import ModalTags from "../../components/ModalTags/ModalTags";
import { createPost } from "../../api/posts";

const CreatePost = () => {
  const [tags, setTags] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [postImage, setPostImage] = useState("");
  const fileInputRef = useRef(null);

  // Recebe as tags da modal
  const handleAddTags = (newTags) => {
    const validTags = newTags.filter(tag => tag.label && tag.label.trim() !== "");
    setTags(prev => [...prev, ...validTags]);
  };

  

  // Remove tag (seta como null)
  const handleRemoveTag = (idx) => {
    setTags(prev => prev.filter((_, i) => i !== idx));
  };

  // Cancela criação do post
  const handleCancel = () => {
    setTags([]);
    setTitulo("");
    setConteudo("");
    setPostImage("");
  };

   // Lida com envio de URL manual
   const handleImageUrlChange = (e) => {
    setPostImage(e.target.value);
  };
    // Lida com upload de arquivo (drag & drop ou input)
    const handleImageFile = (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPostImage(e.target.result);
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

  // Cria o post (envia apenas tags válidas)
  const handleCreate = async () => {
    const validTags = tags.filter(Boolean);



 

    const postData = {
      PostTitulo: titulo,
      PostConteudo: conteudo,
      TipoPost: validTags.find(t => t.type === "tipo")?.label || null,
      PersonagemId: validTags.find(t => t.type === "personagem")?.id || null,
      DataPostagem: new Date().toISOString()
    };
  createPost(postData)
  .then(() => {
    alert("Post criado com sucesso!");
    handleCancel();
  })
  .catch((err) => {
    console.error("Erro ao criar post:", err);
    alert("Erro ao criar post!");
  });

};

  return (
    <div className="container-fluid col-12 col-md-5">
      <div className="d-flex flex-column gap-4">
            {/* Drag & Drop e URL */}
            <div
          className="rounded-2 text-light border border-light d-flex flex-column align-items-center p-4"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{ cursor: "pointer" }}
          onClick={() => fileInputRef.current.click()}
        >
          <i className="bi bi-cloud-upload-fill"></i>
          <span className="fw-light fs-3 text-center text-md-start">
            Envie uma URL ou arraste uma imagem aqui.
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
            value={postImage.startsWith("data:") ? "" : postImage}
            onChange={handleImageUrlChange}
            disabled={!!postImage}
          />
          {postImage && (
            <div className="mt-2">
              <img src={postImage} alt="Preview" style={{ maxWidth: 200, maxHeight: 200 }} />
              <button className="btn btn-sm btn-danger ms-2" onClick={() => setPostImage("")}>
                Remover imagem
              </button>
            </div>
          )}
        </div>
        <div className="border-light border rounded-2">
          <div className="form-label text-center bg-light bg-opacity-50 fw-bolder m-0">Título</div>
          <input type="" className="input-group p-0 m-0 bg-opacity-10 bg-light border-0 py-1 px-3 text-light text-opacity-75" placeholder="Insira um título. Max caracteres: 100"   value={titulo}
  onChange={e => setTitulo(e.target.value)}/>
        </div>

        <div className="border-light border rounded-2">
          <div className="form-conteudo form-label text-center bg-light bg-opacity-50 fw-bolder m-0 pt-1 pb-2">Conteúdo</div>
          <textarea type="" className="input-group p-0 m-0 bg-opacity-10 bg-light border-0 py-1 px-3 text-light text-opacity-75" rows="3" placeholder="Escreva algo sobre a postagem aqui..."   value={conteudo}
  onChange={e => setConteudo(e.target.value)}/>
        </div>

        <div className="row">
            <div className="col-5">
                <div className="border-light border rounded-2">
          <div className="form-label text-center bg-light bg-opacity-50 fw-bolder m-0">Tags</div>
          <div className="d-flex flex-wrap gap-2 p-2">
          {tags.map((tag, idx) => (
  <div key={idx} className="bg-danger text-light px-2 py-1 rounded d-flex align-items-center gap-2">
    <span>{tag.label}</span>
    <button
      className="btn btn-sm btn-close btn-close-white ms-2"
      onClick={() => handleRemoveTag(idx)}
      aria-label="Remover tag"
    />
  </div>
))}
              </div>
          <input type="button" className="p-0 m-0 border-0 text-truncate" />
          <button
  className="btn bg-light bg-opacity-10 text-secondary w-100"
  data-bs-toggle="modal"
  data-bs-target="#TagModal"
>
  Selecione as tags
</button>
        </div>
            </div>
        </div>
        <button className="btn btn-outline-secondary text-light w-auto align-self-center fw-bolder" onClick={handleCancel}>Cancelar</button>
        <button className=" logNsign btn text-light w-auto align-self-center fw-bolder" onClick={handleCreate}>Criar discussão <i className="ms-2 bi bi-plus-circle-fill fs-6"></i></button>
      </div>
  <ModalTags onFinish={handleAddTags} />
    </div>
  );
};

export default CreatePost;
