import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import ForumContainer from "../../components/ForumContainer/ForumContainer";
import Mosaico from "../../assets/Mosaico.png";
import { Link, Navigate } from "react-router";
import posterExample from "../../assets/poster_art1.jpg";
import posterExample2 from "../../assets/sfd-characters-banner.jpg";

import posts from "../../data/Posts";

const Home = () => {
  return (
    <div>
      <div
        className={` ${styles.HomeContainer} py-4 text-light PosterContainer d-flex flex-column align-items-center justify-content-center `}
      >
        <img
          src="../../../public/logo_ragemode_icon.png"
          className="img-fluid col-8 col-md-3 align-self-center mb-3"
        />
        <p className="fs-5 fw-medium mb-4"> Fighting Game Community</p>

        <div className="bg-danger bg-opacity-75 px-4 py-2 fw-bold text-light d-flex flex-row gap-5 w-auto rounded-1">
          <Link to={"/games"} className="m-0 text-decoration-none text-light">
            Jogos
          </Link>
          <Link to={"/forum"} className="m-0 text-decoration-none text-light">
            Fórum
          </Link>
          <Link to={"/about"} className="m-0 text-decoration-none text-light">
            Sobre
          </Link>
        </div>
      </div>
      {/* <img src={posterExample2} className={` position-static ${styles.posterExample} vw-100 z-1 opacity-75 object-fit-cover object-fit-md-fill`} alt="" srcset="" /> */}

      <div className="d-flex flex-column text-center my-5 text-light">
        <div className={`${styles.jerseyFont} display-1`}>RECENTES</div>
        {posts.map((post) => (
          <ForumContainer
            key={post.id}
            userName={post.user.userName}
            profilePicture={post.user.profilePicture}
            postDate={post.postDate}
            postTags={post.postTags}
            postTitle={post.postTitle}
            postContent={post.postContent}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
