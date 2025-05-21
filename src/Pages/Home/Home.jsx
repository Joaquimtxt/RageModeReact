import styles from './Home.module.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import ForumContainer from '../../components/ForumContainer/ForumContainer';
import Mosaico from '../../assets/Mosaico.png'
import { Navigate } from 'react-router';

const Home = () => {
  return (
    <div>
      <div className=' text-light PosterContainer d-flex flex-column align-items-center'>
        <img src='../../../public/logo_ragemode_icon.png' className='img-fluid col-8 col-md-3 align-self-center mt-5 mb-3'/>
<p className='fs-5 fw-medium mb-4'> Fighting Game Community</p>

<div className='bg-danger bg-opacity-75 px-4 py-2 fw-bold text-light d-flex flex-row gap-5 w-auto rounded-1'>
  <p className='m-0'>Row</p>
  <p className='m-0'>Row</p>
  <p className='m-0'>Row</p>
  <p className='m-0'>Row</p>
</div>
      </div>
      {/* <img src={posterExample2} className={` position-static ${styles.posterExample} vw-100 z-1 opacity-75 object-fit-cover object-fit-md-fill`} alt="" srcset="" /> */}
      
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