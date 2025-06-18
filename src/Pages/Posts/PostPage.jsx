import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./Posts.module.css";
import LikePost from "../../components/LikePost/LikePost";
import CommentBar from "../../components/Comments/CommentBar";
import Comments from "../../components/Comments/Comments";
import {
  deletePost,
  followUserFromPost,
  getPostById,
  getPostComments,
} from "../../api/posts";
import { getTimeAgo } from "../../utils/dateUtils";
import {
  followUser,
  getFollowerCount,
  getOwnUserProfile,
  unfollowUser,
} from "../../api/usuarios";

const PostPage = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getOwnUserProfile()
      .then(setUserInfo)
      .catch((error) => {
        console.log("Erro ao buscar as informações de perfil: ", error);
      });
  }, []);

  const handleSubscribe = async () => {
    try {
      const isFollowing = userInfo?.seguindo?.some(
        (seguindo) => seguindo.seguindoId === post.usuarioId
      );

      if (isFollowing) {
        unfollowUser(post.usuarioId);
        setSubscribed(false);
      } else {
        followUserFromPost(id);
        setSubscribed(true);
      }
      
      // Atualiza as informações do usuário após seguir ou deixar de seguir
      const updatedUser = getOwnUserProfile();
      setUserInfo(updatedUser);
    } catch (err) {
      console.error("Erro ao seguir/deixar de seguir:", err);
    }
  };

  useEffect(() => {
    if (userInfo && post) {
      const isFollowing = userInfo.seguindo?.some(
        (seguindo) => seguindo.seguindoId === post.usuarioId
      );
      setSubscribed(isFollowing);
    }
  }, [userInfo, post]);
  
  useEffect(() => {
    getPostById(id)
      .then((data) => {
        setPost(data);
        console.log("Post carregado: ", data);
      })
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    if (post && post.usuarioId) {
      getFollowerCount(post.usuarioId)
        .then(setFollowersCount)
        .catch((e) => console.error("Erro ao pegar seguidores: ", e));
    }
  }, [post]);

  const handleDeletePost = () => {
    if (
      userInfo.usuarioRole !== "Admin" &&
      userInfo.usuarioNome !== post.usuarioNome
    ) {
      navigate("/");
      alert(
        "Você não tem permissão para excluir esta postagem. Somente um administrador ou o autor da postagem pode excluir a publicação. "
      );
    } else {
      const confirmDelete = window.confirm(
        `Tem certeza que deseja excluir a postagem de ${post.usuarioNome}? Esta ação será irreversível. `
      );
      if (!confirmDelete) return;

      deletePost(id)
        .then(() => {
          alert(`A postagem de ${post.usuarioNome} foi removida com sucesso.`);
          window.localStorage.reload();
          navigate("/");
        })
        .catch((error) => {
          console.error("Erro ao excluir a postagem: ", error);
        });
    }
  };

  useEffect(() => {
    getPostComments(id).then(setComments).catch(console.error);
  }, [id]);

  if (!post) {
    return (
      <div className="text-light text-center mt-5">Carregando post...</div>
    );
  }

  return (
    <div className="container vw-100 text-light" id={post.postId}>
      <div className={`border border-light rounded-3 my-4`}>
        <div className={` d-flex gap-2 mx-2 mt-0 p-1 align-items-center`}>
          <img
            src="https://placehold.co/35x35"
            className="img-fluid rounded-circle"
            alt="profile picture"
          ></img>
          <div className="d-flex flex-column align-items-start justify-content-start">
            <h5 className="py-1 fs-6 m-0">@{post.usuarioNome}</h5>
            <p className="fw-lighter small m-0">
              {followersCount} {followersCount == 1 ? "follower" : "followers"}
            </p>
          </div>
          <p className="fw-lighter mt-2 small">
            {" "}
            • {getTimeAgo(post.dataPostagem)}
          </p>
          <button
            className={`btn fw-lighter mt-2 ${
              subscribed ? "btn-secondary" : "btn-light"
            }`}
            onClick={handleSubscribe}
          >
            {subscribed ? "Followed" : "Follow"}
          </button>

          {userInfo &&
          post &&
          (userInfo.usuarioRole === "Admin" ||
            userInfo.id === post.usuarioId) ? (
            <button
              className="btn btn-danger btn-sm border-0 ms-2 "
              onClick={handleDeletePost}
            >
              {" "}
              <i className="bi bi-trash me-1 "></i>Deletar
            </button>
          ) : (
            ""
            // Nao vai aparecer o botão
          )}
        </div>
        <div className={` ms-4 text-start mb-4 mb-md-3`}>
          <div className="  fs-3 fw-bolder mt-2 mb-3">{post.postTitulo}</div>
          <div className="row">
            <div className="col-12 w-auto">
              <p className=" bg-danger ms-auto  px-2 px-md-1 rounded-1 fw-medium text-center text-md-start d-flex flex-row gap-2">
                <i className="bi bi-tags-fill "></i>
                {post.tipoPost}
              </p>
            </div>
          </div>
        </div>
        <div className={`mx-4 ${styles.PostContent}`}>
          {post.postImage ? (
            <div className="text-center post-img">
              <img
                className="img-fluid rounded-1 object-fit-contain postImg"
                src={post.PostImage}
                alt=""
              />
            </div>
          ) : (
            ""
          )}

          <div className="w-100 my-3 text-light text-start">
            {post.postConteudo}
          </div>
        </div>
      </div>
      <div className="w-100 mt-3">
        <LikePost />
      </div>
      <div className="w-100 mt-3">
        <h5 className="text-light">Comments:</h5>
        <CommentBar postId={post.postId} />
      </div>

      <div className="d-flex flex-column gap-2">
        {comments.map((comment) => (
          <Comments
            key={comment.comentariosId}
            userName={comment.usuarioNome}
            postDate={comment.dataComentario}
            commentContent={comment.comentarioTexto}
          />
        ))}
      </div>
    </div>
  );
};

export default PostPage;
