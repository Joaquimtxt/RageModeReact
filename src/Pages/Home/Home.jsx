import styles from './Home.module.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import ForumContainer from '../../components/ForumContainer/ForumContainer';
import posterExample from '../../assets/poster_art1.jpg'
import posterExample2 from '../../assets/sfd-characters-banner.jpg'

const Home = () => {
  return (
    <div>
      <img src={posterExample2} className={`${styles.posterExample} vw-100 z-1 opacity-75 object-fit-cover object-fit-md-fill `} alt="" srcset="" />
<div className='d-flex flex-column text-center my-5 text-light'>
    <div className={`${styles.jerseyFont} display-1`}>RECENTES</div>
    <ForumContainer
    userName={"DaigoUmehara"}
    postDate={"10 m"}
    postTags={"Street Fighter 6, Discussion"}
    postTitle={"How we feeling about the season 3 throw change?"}
    postContent={"If you haven’t heard about it already, defenders now gain a bar of drive gauge when teching a throw. Here at 00:28. This is gives the defender some reward when going for a tech and it seems to be their answer to throw loops."} />
</div>
    </div>
  )
}

export default Home