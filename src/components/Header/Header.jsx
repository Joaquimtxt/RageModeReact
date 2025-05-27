import { Link, useLocation } from "react-router";
import styles from "./Header.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { useEffect, useState } from "react";

const Header = () => {
  const location = useLocation();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  const closeOffcanvas = () => {
    const offcanvasEl = document.getElementById("menuOffcanvas"); //Estou fazendo desse jeito pois o dismiss-"offcanvas não está funcionando
    // Só funciona com elementos nativos como a, button, e não com componentes do React como Link
    if (offcanvasEl) {
      const bsOffcanvas =
        window.bootstrap?.Offcanvas.getOrCreateInstance(offcanvasEl);
      bsOffcanvas?.hide();
    }
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark px-3">
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
          <Link to="/" className="mx-auto" id="logo">
            <img
              src="https://placehold.co/200x70"
              alt="Logo da RageMode"
              className="rounded d-block mx-auto col-6 col-md-4 col-lg-3"
            />
          </Link>

          <Link to="/signin" className="btn btn-danger d-none d-lg-block">
            SIGN IN
          </Link>

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
                    to="/select-character"
                    className={`${styles.NavLink} ${
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
                  {usuario ? (
                    <img
                      src="https://placehold.co/50x50"
                      alt="User Avatar"
                      style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                    />
                  ) : (
                    <Link to="/signin" className="btn btn-danger w-50 mt-3">
                      SIGN IN
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
