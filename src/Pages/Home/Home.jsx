import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import ForumContainer from '../../components/ForumContainer/ForumContainer';
import posterExample from '../../assets/poster_art1.jpg'
import posterExample2 from '../../assets/sfd-characters-banner.jpg'
import Mosaico from '../../assets/Mosaico.png'
import { getPosts } from "../../api/posts";
import { useEffect, useState } from 'react';

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts().then(setPosts).catch(console.error);
  }, []);

  return (
    <div>
      <img src={posterExample2} className={`${styles.posterExample} vw-100 z-1 opacity-75 object-fit-cover object-fit-md-fill `} alt="" srcSet="" />
      
<div className='d-flex flex-column text-center my-5 text-light'>
    <div className={`${styles.jerseyFont} display-1`}>RECENTES</div>
    {posts.map(post => (
          <ForumContainer key={post.id} props={{
            Id: post.id,
            userName: post.userName,
            postDate: post.postDate,
            postTags: post.postTags,
            postTitle: post.postTitle,
            postContent: post.postContent
          }} />
        ))}
</div>
    </div>
  );
};

export default Home;
