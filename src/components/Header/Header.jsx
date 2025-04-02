import { Link, useLocation } from 'react-router';
import styles from './Header.module.css';
import { useState } from 'react';

const Header = () => {
    const location = useLocation();
    
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <header
      className={`navbar navbar-dark fixed-top w-100 d-flex z-3 justify-content-between align-items-center bg-secondary py-1 px-2 ${styles.infoContainer}`}
    >
      <div className="container-fluid d-flex align-items-center">
        {/* Botão do menu toggle para telas menores */}
        <button
          className="navbar-toggler d-lg-none me-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isSidebarOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <button
          className="btn bg-danger me-2"
          style={{ fontFamily: 'fantasy', fontSize: '20px', color: 'white' }}
        >
          <Link to="/signin" style={{ textDecoration: 'none', color: 'white' }}>
            SIGN IN
          </Link>
        </button>

        {/* Botão do menu toggle para telas maiores */}
        <button
          className="navbar-toggler d-none d-lg-block"
          type="button"
          onClick={toggleSidebar}
          aria-expanded={isSidebarOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Logo centralizado */}
        <Link to="/" className="mx-auto" id="logo">
          <img
            src="src/assets/logo.jpeg"
            alt="Logo da RageMode"
            className="rounded d-block mx-auto col-6 col-md-4 col-lg-3"
          />
        </Link>
      </div>

      {/* Menu colapsável para telas menores */}
      <div className={`collapse navbar-collapse d-lg-none mt-3 ${styles.CollapseMenu}`} id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item me-lg-3 text-center mt-3">
            <Link to="/"  className={`${styles.NavLink} ${
                location.pathname === '/' ? styles.NavLinkActive : ''
              }`}>
              Home
            </Link>
          </li>
          <li className="nav-item me-lg-3 text-center mt-3">
            <Link to="/games"  className={`${styles.NavLink} ${
                location.pathname === '/games' ? styles.NavLinkActive : ''
              }`}>
              Games
            </Link>
          </li>
        </ul>
      </div>

      {/* Sidebar para telas maiores */}
      <div
        className={`d-none d-lg-block ${styles.Sidebar} ${
          isSidebarOpen ? styles.SidebarVisible : ''
        }`}
      >
        <button
          className="btn btn-close btn-close-white m-3"
          onClick={toggleSidebar}
          aria-label="Close"
        ></button>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item me-lg-3 text-center mt-3">
            <Link
              to="/"
              className={`${styles.NavLink} ${
                location.pathname === '/' ? styles.NavLinkActive : ''
              }`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item me-lg-3 text-center mt-3">
            <Link
              to="/games"
              className={`${styles.NavLink} ${
                location.pathname === '/games' ? styles.NavLinkActive : ''
              }`}
            >
              Games
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;