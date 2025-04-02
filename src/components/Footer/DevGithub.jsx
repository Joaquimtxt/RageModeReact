import styles from './Footer.module.css';
const DevGithub = (props) => {
  return (
    <a className={`fw-bolder text-decoration-none ${styles.GithubLink}`} href={props.github} target="_blank"
    rel="noopener noreferrer">  {props.devNome}  </a>
  )
}

export default DevGithub