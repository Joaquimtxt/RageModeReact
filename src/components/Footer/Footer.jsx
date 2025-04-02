import styles from './Footer.module.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import DevGithub from './DevGithub';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';



const Footer = () => {

    const GetDate = new Date();
    const DateYear = GetDate.getFullYear();

  return (
    <footer className={`footer footer-dark bg-dark fixed-bottom py-3 px-2 w-100 ${styles.Footer}`}>
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-12 col-lg-6 d-flex flex-column align-items-center align-items-lg-start ms-lg-0">
          <h5 className="text-center text-light mb-2">
            Find us on our <b className="text-danger">social</b>:
          </h5>
          <div className="d-flex">
            <a
              href="https://instagram.com"
              className={`text-decoration-none text-light fw-bolder mx-2 ${styles.Icon}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon fontSize="large" />
            </a>
            <a
              href="https://youtube.com"
              className={`text-decoration-none text-light fw-bolder mx-2 ${styles.Icon}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <YouTubeIcon fontSize="large" />
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

      <hr className="text-light m-0"  />

      <div className="row mt-3">
        <div className="col-12 text-center fw-bolder text-secondary">
          &copy; {DateYear} RageMode | Todos os direitos reservados.
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer;