import styles from './Footer.module.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import DevGithub from './DevGithub';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub'



const Footer = () => {

    const GetDate = new Date();
    const DateYear = GetDate.getFullYear();

  return (
    <footer className={`footer footer bg-transparent px-4 py-5 w-100 ${styles.Footer}`}>
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-12 col-lg-6 d-flex flex-column align-items-center align-items-lg-start ms-lg-0">
          <h5 className="text-center text-light fw-light mb-2">
            Find us at our <b className="text-danger">socials:</b>
          </h5>
          <div className="d-flex ms-1 gap-2 mt-3">
          <a href='https://instagram.com'
            className={`text-decoration-none text-light mx-2 ${styles.Icon}`}
            target='_blank'
            rel='nooopener noreferrer'
            >
              <GitHubIcon fontSize='large'/>
            </a>  
            <a
              href="https://youtube.com"
              className={`text-decoration-none text-light  mx-2 ${styles.Icon}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <YouTubeIcon fontSize="large" />
            </a>
            <a
              href="https://instagram.com"
              className={`text-decoration-none text-light mx-2 ${styles.Icon}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon fontSize="large" />
            </a>

            
              
          </div>
        </div>

        <div className="col-12 col-lg-6 d-flex justify-content-lg-end justify-content-center flex-wrap">
          <DevGithub github="https://github.com/Limazxz" devNome="@Limazxz" />
          <span className="mx-2">|</span>
          <DevGithub github="https://github.com/Joaquimtxt" devNome="@Joaquimtxt" />
          <span className="mx-2">|</span>
          <DevGithub github="https://github.com/LLuizXL" devNome="@LLuizXL" />
        </div>
      </div>

      <hr className="text-light mt-5 mb-3"  />

      <div className="row mt-3">
        <div className="col-12 text-center fw-bolder text-secondary mb-5">
          &copy; {DateYear} RageMode | Todos os direitos reservados.
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer;