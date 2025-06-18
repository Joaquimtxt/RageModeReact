import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import ForumContainer from '../../components/ForumContainer/ForumContainer';
import posterExample from '../../assets/poster_art1.jpg'
import posterExample2 from '../../assets/sfd-characters-banner.jpg'
import Mosaico from '../../assets/Mosaico.png'
import { getPostById, getPosts } from "../../api/posts";
import { useEffect, useState } from 'react';
import { useParams } from "react-router";

const Home = () => {


  const [posts, setPosts] = useState([]);
  useEffect(() => {
      getPosts().then(setPosts).catch(console.error);
  
  }, []);

  

  return (
    <div>
    <div className={`${styles.HomeContainer} `}>

    </div>
<div className='d-flex flex-column text-center my-5 text-light'>
    <div className={`${styles.jerseyFont} display-1`}>RECENTES</div>
    {posts.map(post => (
         <ForumContainer
         key={post.postId}
         PostId={post.postId}
         UsuarioNome={post.usuarioNome}
         DataPostagem={post.dataPostagem}
         Tags={post.tipoPost}
         PostTitulo={post.postTitulo}
         PostConteudo={post.postConteudo}
         PostImage={post.postImage || "https://placehold.co/600x300"}
         profilePicture={`https://ui-avatars.com/api/?name=${post.usuarioNome}`}
       />
        ))}
</div>

    </div>
  );
};

export default Home;
