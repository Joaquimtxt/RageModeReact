import { Link, useLocation, useNavigate } from "react-router";
import styles from "./Header.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { useEffect, useState } from "react";
import BarraPesquisa from "../SearchBar/SearchBar";
import PostFilter from "../PostFilter/PostFilter";
import logo from "../../assets/logo4.png";
import logo2 from "../../../public/logo_ragemode_icon.png";
import { getOwnUserProfile } from "../../api/usuarios";

const Header = () => {
  const [userEmail, setUserEmail] = useState("");
  const [logado, setLogado] = useState(false);
  const [nickname, setNickname] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    setLogado(!!token);

    const storedUserEmail = localStorage.getItem("UserEmail");
    if (storedUserEmail) {
      setUserEmail(storedUserEmail);
    }
  }, [token]);

  useEffect(() => {
    getOwnUserProfile()
      .then(setUserInfo)
      .catch((error) => {
        console.error("Erro ao buscar as informações de perfil: ", error);
      });
  }, []);

  const handleLeave = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("UserEmail");
    setUserEmail("");
    setLogado(false);
    navigate("/");
    window.location.reload();
  };

  const closeOffcanvas = () => {
    const offcanvasEl = document.getElementById("menuOffcanvas");
    if (offcanvasEl) {
      const bsOffcanvas =
        window.bootstrap?.Offcanvas.getOrCreateInstance(offcanvasEl);
      bsOffcanvas?.hide();
    }
  };

  return (
    <>
      <nav className="navbar navbar-dark sticky-md-top px-3">
        <div className="container-fluid">
          {/* Botão para abrir o menu */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#menuOffcanvas"
            aria-controls="menuOffcanvas"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Verificações de login */}
          {!logado ? (
            <div className="text-light ms-3 jersey fs-6">
              Faça login para participar do fórum!
            </div>
          ) : userInfo.usuarioNome === "r0sy" || userInfo.usuarioNome === "pa1n" ? (
            <div className="text-light ms-3 jersey fs-5">
              <span className="mx-1 badge bg-danger">
                <i className="bi bi-gem me-1"></i> RXGEMODE Owner
              </span>{" "}
              {userInfo.usuarioNome}
            </div>
          ) : (
            <div className="text-light ms-3 jersey">
              Bem vindo, {userInfo.usuarioNome}!
            </div>
          )}

          {/* Logo centralizado */}
          <Link to="/" className="mx-auto" id="logo">
            <img
              src={logo2}
              alt="Logo da RageMode"
              className="img-fluid d-block mx-auto"
            />
          </Link>

          {/* Offcanvas Menu */}
          <div
            id="menuOffcanvas"
            className="offcanvas offcanvas-start w-50 h-50 text-bg-dark"
            tabIndex="-1"
            aria-labelledby="menuOffcanvasLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="menuOffcanvasLabel">
                Menu
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav">
                <li className="nav-item text-center mt-3">
                  <Link
                    to="/"
                    className={`${styles.NavLink} ${
                      location.pathname === "/" ? styles.NavLinkActive : ""
                    }`}
                    onClick={closeOffcanvas}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item text-center mt-3">
                  <Link
                    to="/games"
                    className={`${styles.NavLink} ${
                      location.pathname === "/games" ? styles.NavLinkActive : ""
                    }`}
                    onClick={closeOffcanvas}
                  >
                    Games
                  </Link>
                </li>
                <li className="nav-item text-center mt-3">
                  <Link
                    to="/perfil"
                    className={`${styles.NavLink} ${
                      location.pathname === "/perfil"
                        ? styles.NavLinkActive
                        : ""
                    }`}
                    onClick={closeOffcanvas}
                  >
                    Perfil
                  </Link>
                </li>

                <li className="nav-item d-flex flex-column align-items-center mt-3 d-lg-none">
                  <Link to="/sendpost" className="btn btn-dark w-75 mb-2 rounded-5">
                    <i className="bi bi-plus-circle"></i> New Post
                  </Link>
                  {logado ? (
                    <>
                    <img
                      className="rounded-circle"
                      src={`https://ui-avatars.com/api/?name=${userEmail}`}
                      alt="User Avatar"
                      style={{
                        width: "50px",
                        height: "50px",
                      }}
                      />
                      <div className="dropdown">
                  <button
                    className="btn dropdown-toggle  text-light border-0 p-0 "
                    type="button"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-gear-fill"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/perfil">
                        Ver Perfil
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLeave}>
                        Sair
                      </button>
                    </li>
                  </ul>
                </div>

                    
                      </>
                  ) : (
                    <>
                      <Link to="/signin" className="btn btn-danger w-75 mt-2">
                        SIGN IN
                      </Link>
                      <Link
                        to="/signup"
                        className="btn btn-secondary w-75 mt-2"
                      >
                        SIGN UP
                      </Link>

                      

                    </>
                  )}
                </li>
              </ul>
            </div>
          </div>

          {/* Bloco para telas grandes (header) */}
          <div className="d-none d-lg-flex align-items-center ms-3">
            <Link to="/sendpost" className="btn btn-dark me-3">
              <i className="bi bi-plus-circle"></i> New Post
            </Link>
            {logado ? (
              <div className="d-flex flex-row align-items-center">
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle  text-light border-0 p-0 me-3 "
                    type="button"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-gear-fill"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end w-25">
                    <li>
                      <Link className="dropdown-item" to="/perfil">
                        Ver Perfil
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLeave}>
                        Sair
                      </button>
                    </li>
                  </ul>
                </div>

                <img
                  src={`https://ui-avatars.com/api/?name=${userEmail}`}
                  alt="User Avatar"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
              </div>
            ) : (
              <>
                <Link to="/signin" className="btn btn-danger ms-3">
                  SIGN IN
                </Link>
                <Link to="/register" className="btn btn-secondary ms-3">
                  SIGN UP
                </Link>
              </>
            )}
          </div>
        </div>
        {/* Barra de Pesquisa
        <div className="container-fluid d-flex justify-content-center align-items-center">
          <BarraPesquisa />
          <button
            className="btn btn-secondary ms-2 m-3"
            data-bs-toggle="modal"
            data-bs-target="#filterModal"
          >
            <i className="bi bi-funnel-fill"></i>
            Filter Posts
          </button>
        </div> */}
      </nav>

      {/* Modal de filtro de posts */}
      <div
        className="modal fade modal-smooth"
        id="filterModal"
        tabIndex="-1"
        aria-labelledby="filterModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div id="modal-content" className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="filterModalLabel">
                Filter Posts
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" id="modal-body">
              <PostFilter posts={[]} onClose={() => {}} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
