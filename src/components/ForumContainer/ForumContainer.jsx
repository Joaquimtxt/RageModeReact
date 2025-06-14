import { useNavigate, useParams } from "react-router";
import styles from "./ForumContainer.module.css";
import { getPostById } from "../../api/posts";
import { getTimeAgo } from "../../utils/dateUtils";
import { useEffect, useState } from "react";




const ForumContainer = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();

   useEffect(() => {
    if(id){
      getPostById(id).catch(console.error);
    }}, [id]);
  const handleClick = () => {
    navigate(`/post/${props.PostId}`);
  };
    return (
    <div className="container container-md vw-100">

      <div className={` border border-light rounded-3 my-4 ${styles.PostContainer}` } id={id} onClick={handleClick}>
        <div className="row">
          <div className="col-md-7">
            <div className="container">
              <div
                className={` d-flex gap-4 mx-2 mt-0 p-1 align-items-center`}
              >
                <img
                  src={props.profilePicture}
                  className="img-fluid rounded-circle"
                  width={"30px"}
                  height={"30px"}
                ></img>
                <h5 className="text-center py-2 fs-6">@{props.UsuarioNome}</h5>
                <p className="fw-lighter mt-2">{getTimeAgo(props.DataPostagem)}</p>
              </div>
              <div className="row">
          <div className="col-12 mx-3 w-auto">
            <p className="bg-danger ms-auto  px-2 px-md-1 rounded-1 fw-medium text-center text-md-start d-flex flex-row gap-2">
                <i className="bi bi-tags-fill"></i>
              {props.Tags}
            </p>
          </div>
        </div>
              <div className={` ms-4 text-start mb-4 mb-md-3`}>
                <div className="  fs-3 fw-bolder mt-2 mb-3">
                  {props.PostTitulo}
                </div>
                <div className="text-truncate w-100">
                  {props.PostConteudo}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5 text-end post-img">
            <img
              className="img-fluid rounded-1 object-fit-contain postImg"
              src={props.PostImage}
            />
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default ForumContainer;
