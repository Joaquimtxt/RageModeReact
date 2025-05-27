import { Link, useLocation } from "react-router";
import styles from "./Header.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { useEffect, useState } from "react";

const Header = () => {

const [user, setUser] = useState(null);

  const location = useLocation();
  const closeOffcanvas = () => {
    const offcanvasEl = document.getElementById("menuOffcanvas"); //Estou fazendo desse jeito pois o dismiss-"offcanvas não está funcionando
    // Só funciona com elementos nativos como a, button, e não com componentes do React como Link
    if (offcanvasEl) {
      const bsOffcanvas =
        window.bootstrap?.Offcanvas.getOrCreateInstance(offcanvasEl);
      bsOffcanvas?.hide();
    }



   
  };


  useEffect(() => {
    const saveUser = localStorage.getItem("userlogin");

    saveUser && setUser(JSON.parse(saveUser));
  })


  return (
    <nav className="navbar sticky-md-top navbar-dark px-3">
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

        {/* Logo centralizado */}
        <Link to="/" className="" id="logo">
          <img
            src="../../../public/logo_ragemode_icon.png"
            alt="Logo da RageMode"
            className=" col-9 col-md-12"
          />
        </Link>

        {/* Botão SIGN IN (fora do menu em telas grandes) */}
      <div className="text-light d-flex flex-row gap-2 align-items-center">

        {user ? (
          <span> Bem vindo, {user.username} ! </span>
        ) : <span>

          Faça login meu mano 
        </span>}

        {user ? <img src={user.pfp || `https://ui-avatars.com/api/?name=${user?.username}&background=2b87ae&color=fff`} className="rounded-circle" width={30} height={30}/>

        :  <Link to="/signin" className={` ${styles.jerseyFont} btn logNsign text-light border-0 d-none d-lg-block rounded-1 fw-regular fs-5 py-1 px-3`}>
        SIGN IN
      </Link> }
          </div>
       

        {/* Offcanvas Menu */}
        <div
          id="menuOffcanvas"
          className="offcanvas offcanvas-start text-bg-dark"
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
                  className={`  text-decoration-none ${styles.NavLink} ${
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
                  className={` text-decoration-none ${styles.NavLink} ${
                    location.pathname === "/games" ? styles.NavLinkActive : ""
                  }`}
                  onClick={closeOffcanvas}
                >
                  Games
                </Link>
              </li>

              <li className="nav-item text-center mt-3">
                <Link
                  to="/select-character"
                  className={` text-decoration-none ${styles.NavLink} ${
                    location.pathname === "/select-character"
                      ? styles.NavLinkActive
                      : ""
                  }`}
                  onClick={closeOffcanvas}
                >
                  Select Character
                </Link>
              </li>
              <li className="nav-item text-center mt-3 d-lg-none">
                <Link to="/signin" className=" logNsign btn jersey w-50 mt-3">
                  SIGN IN
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
