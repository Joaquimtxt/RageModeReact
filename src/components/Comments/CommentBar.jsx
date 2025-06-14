import React, { useState } from "react";
import { createComentario } from "../../api/comments";

const CommentBar = (props) => {
  const [commenting, setCommenting] = useState(false);
  const [comment, setComment] = useState("");

  const comentarioData = {
    comentarioTexto: comment,
    postId: props.postId,
  };

  const handleCancel = () => {
    setCommenting(false);
    setComment("");
  };

  const handleSend = () => {
    createComentario(comentarioData).then(alert("Comentário publicado!"));
    setCommenting(false);
    window.location.reload()
    setComment("");
  };

  return (
    <div className="container container-md vw-100">
      <div className="row">
        <div className="col-md-7">
          <div className="container">
            <div className={` d-flex gap-4 mx-2 mt-0 p-1 align-items-center`}>
              <img
                src="https://placehold.co/30x30"
                className="img-fluid rounded-circle"
              ></img>
              <input
                type="text"
                placeholder="Adicionar um comentário..."
                value={comment}
                onFocus={() => setCommenting(true)}
                onChange={(e) => setComment(e.target.value)}
                className="form-control"
              />
            </div>
            {commenting && (
              <div className="mt-2 d-flex gap-2 justify-content-center">
                <button className="btn btn-secondary" onClick={handleCancel}>
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={handleSend}>
                  Enviar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentBar;
