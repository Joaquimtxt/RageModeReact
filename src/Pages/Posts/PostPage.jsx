import React, { useEffect, useState } from "react";
import {useParams } from "react-router";
import styles from "./Posts.module.css";
import LikePost from "../../components/LikePost/LikePost";
import CommentBar from "../../components/Comments/CommentBar";
import Comments from "../../components/Comments/Comments";
import { getPostById, getPostComments } from "../../api/posts";
import { getTimeAgo } from "../../utils/dateUtils";


const PostPage = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const handleSubscribe = () => {
    if (!subscribed) {
      setSubscribed(true);
      setFollowersCount(followersCount + 1);
    } else {
      setSubscribed(false);
      setFollowersCount(followersCount - 1);
    }
  };
  useEffect(() => {
    getPostComments(id).then(setComments).catch(console.error)
  }, [id])


  useEffect(() => {
    getPostById(id).then(setPost).catch(console.error);
  }, [id]);


 if (!post) {
    return <div className="text-light text-center mt-5">Carregando post...</div>;
  }


  return (
    <div className="container vw-100 text-light" id={post.postId}>
      <div className={`border border-light rounded-3 my-4`}>
        <div className={` d-flex gap-4 mx-2 mt-0 p-1 align-items-center`}>
          <img
            src="https://placehold.co/30x30"
            className="img-fluid rounded-circle"
            alt="profile picture"
          ></img>
          <div className="d-flex flex-column align-items-start justify-content-start">
            <h5 className="py-1 fs-6 m-0">@{post.usuarioNome}</h5>
            <p className="fw-lighter fs-6 m-0">{followersCount} {followersCount == 1? "follower" : "followers"}</p>
          </div>
          <p className="fw-lighter mt-2"> {getTimeAgo(post.dataPostagem)}</p>
          <button className={`btn fw-lighter mt-2 ${subscribed? "btn-secondary" : "btn-light"}`} onClick={handleSubscribe}>{subscribed?"Followed" : "Follow"}</button>
        </div>
        <div className={` ms-4 text-start mb-4 mb-md-3`}>
          <div className="  fs-3 fw-bolder mt-2 mb-3">{post.postTitulo}</div>
          <div className="col-7 col-md-3">
            <p className="bg-danger ms-auto  px-2 px-md-1 rounded-1 fw-medium text-center text-md-start d-flex flex-row gap-2">
              <i className="bi bi-tags-fill"></i>
              {post.tipoPost}
            </p>
          </div>
        </div>
        <div className={`mx-auto ${styles.PostContent}`}>
          <div className="text-center post-img">
            <img
              className="img-fluid rounded-1 object-fit-contain postImg"
              src={post.PostImage}
              alt=""
            />
          </div>
          <div className="w-100 my-3 text-light">{post.postConteudo}</div>
        </div>
      </div>
      <div className="w-100 mt-3">
        <LikePost />
      </div>
      <div className="w-100 mt-3">      
        <h5 className="text-light">Comments:</h5>
  <CommentBar postId={post.postId} />
        </div>

        
    {comments.map(comment => (
      <div className="d-flex flex-column gap-2">
      <Comments key={comment.comentariosId} userName={comment.usuarioNome} postDate={comment.dataComentario} commentContent={comment.comentarioTexto} />
    </div>
    ))}

    </div>
  );
};

export default PostPage;
