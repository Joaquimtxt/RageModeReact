import styles from './Home.module.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import ForumContainer from '../../components/ForumContainer/ForumContainer';
import posterExample from '../../assets/poster_art1.jpg'

const Home = () => {
  return (
    <div>
      <img src={posterExample} className={`${styles.posterExample} vw-100 opacity-50 object-fit-cover`} alt="" srcset="" />
<div className='d-flex flex-column text-center my-5 text-light'>
    <div className='display-5'>TEXTOTEXTOTEXTO</div>
    <ForumContainer />
</div>
    </div>
  )
}

export default Home