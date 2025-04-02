import React, { useRef } from 'react';
import styles from './Selectsth.module.css';
import SthCard from './SthCard';

const Selectsth = (props) => {
  const scrollRef = useRef(null);

  const handleScroll1 = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const handleScroll2 = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  return (
    <div className="container-fluid rounded-2 position-relative">
      <h1 className="ms-xl-5 ms-2 text-light">{props.Titulo}</h1>
      <div className={`position-relative ${styles.SthScroll}`}>
        <div
          className={`d-flex flex-nowrap justify-content-start mt-2 mb-xl-5 mb-2 p-2 ${styles.SthScroll}`}
          ref={scrollRef}
        >
          <SthCard Year="1999" Poster="https://placehold.co/300x400" Title="Street Fighter 20" />
          <SthCard Year="1999" Poster="https://placehold.co/300x400" Title="Street Fighter 20" />
          <SthCard Year="1999" Poster="https://placehold.co/300x400" Title="Street Fighter 20" />
          <SthCard Year="1999" Poster="https://placehold.co/300x400" Title="Street Fighter 20" />
          <SthCard Year="1999" Poster="https://placehold.co/300x400" Title="Street Fighter 20" />
          <SthCard Year="1999" Poster="https://placehold.co/300x400" Title="Street Fighter 20" />
          <SthCard Year="1999" Poster="https://placehold.co/300x400" Title="Street Fighter 20" />
          <SthCard Year="1999" Poster="https://placehold.co/300x400" Title="Street Fighter 20" />
          <SthCard Year="1999" Poster="https://placehold.co/300x400" Title="Street Fighter 20" />
          <SthCard Year="1999" Poster="https://placehold.co/300x400" Title="Street Fighter 20" />
          <SthCard Year="1999" Poster="https://placehold.co/300x400" Title="Street Fighter 20" />
          <SthCard Year="1999" Poster="https://placehold.co/300x400" Title="Street Fighter 20" />
          
        </div>
      </div>
      {/* Ícones de scroll fora da SthScroll */}
      <ion-icon
        name="caret-back-outline"
        size="large"
        className={`d-none d-md-block ${styles.scrollIcon2}`}
        onClick={handleScroll2}
      ></ion-icon>
      <ion-icon
        name="caret-forward-outline"
        size="large"
        className={`d-none d-md-block ${styles.scrollIcon1}`}
        onClick={handleScroll1}
      ></ion-icon>
    </div>
  );
};

export default Selectsth;