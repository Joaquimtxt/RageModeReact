import React, { useEffect, useRef, useState } from "react";
import styles from "./SelectGame.module.css";
import GameCard from "./GameCard";
import { getGames } from "../../api/personagemJogos";

const SelectGame = ({props, Titulo, franquia}) => {
  const [jogos, setJogos] = useState([])
const [loading, setLoading] = useState(true);
 const [cardsPerView, setCardsPerView] = useState(4);


 useEffect(() => {
    let isMounted = true;
 setLoading(true);
    async function fetchJogos() {
      try {
        let jogosData = await getGames();

        // Filtra por franquia se necessário
        if (franquia) {
          const franquiaNormalized = franquia.replace(/\s/g, "").toLowerCase();
          jogosData = jogosData.filter(jogo =>
            (jogo.jogoNome || jogo.nome || "")
              .replace(/\s/g, "")
              .toLowerCase()
              .includes(franquiaNormalized)
          );
        }

        // Ordena por anoLancamento (mais antigo à esquerda)
  jogosData.sort((a, b) => {
          const anoA = parseInt(a.anoLancamento) || 0;
          const anoB = parseInt(b.anoLancamento) || 0;
          return anoA - anoB;
        });

        if (isMounted) setJogos(jogosData);
      } catch (error) {
        console.log("Erro com a API ao buscar os jogos:", error);
      }
      finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchJogos();

    return () => { isMounted = false; };
  }, [franquia]);

  const placeholders = Array(cardsPerView).fill(0).map((_, idx) => (
    <div key={idx} className="card m-2" style={{ width: 200 }}>
      <div className="placeholder-glow" style={{ height: 300, background: "#e0e0e0" }}>
        <span className="placeholder col-12" style={{ height: "100%", display: "block" }}></span>
      </div>
      <div className="card-body bg-secondary">
        <h5 className="card-title placeholder-glow">
          <span className="placeholder col-6"></span>
        </h5>
        <p className="card-text placeholder-glow">
          <span className="placeholder col-4"></span>
        </p>
      </div>
    </div>
  ));

  const cards = jogos.map((jogo) => (
    <GameCard
      key={jogo.jogosId}
      Year={jogo.anoLancamento}
      jogoId={jogo.jogosId}
      Title={jogo.jogoNome}
      Poster={jogo.imageBanner || null}
    />
  ));



 
  const [startIdx, setStartIdx] = useState(0);
  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

 useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 700) {
      setCardsPerView(3);
    } else {
      setCardsPerView(4);
    }
  };

  handleResize();
  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

  const handlePrev = () => {
    setStartIdx((prev) => Math.max(prev - cardsPerView, 0)); // Diminui o índice inicial, mas não permite que fique negativo(Rolar para o início), o limite é 0
  };

  const handleNext = () => {
    setStartIdx((prev) =>
      Math.min(prev + cardsPerView, cards.length - cardsPerView)
    ); // Aumenta o índice inicial, mas não permite que ultrapasse o limite, que é o tanto de cards - cards por view
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX; // Calcula a diferença da posição do touch inicial, com a posição final do touch
    if (diff > 50) {
      // Se o user arrastar mais de 50px para a esquerda, vai para os próximos card
      handleNext(); // É chamado para respeitar os limites do carrossel
    } else if (diff < -50) {
      // Se o user arrastar mais de 50px para a direita, vai para os cards anteriores
      handlePrev(); // É chamado para respeitar os limites do carrossel
    }
    touchStartX.current = null;
  };

  return (
    <div
      className={`container-fluid rounded-2 position-relative w-100 px-0 ${styles.sthContainer}`}
    >
      <h1 className="ms-xl-5 ms-2 text-light ">{Titulo || (props && props.Titulo)}</h1>
      <div className={`d-flex align-items-center  ${styles.SthScroll}`}>
        <button
          className={`btn btn-dark d-none d-md-flex align-items-center justify-content-center z-2 position-relative ${styles.scrollIcon2}`}
          onClick={handlePrev}
          disabled={startIdx === 0}
          aria-label="Anterior"
        >
          <ion-icon name="caret-back-outline" size="large"></ion-icon>
        </button>
        <div className="overflow-hidden ">
          <div
            id="scrollContainer"
            className={`d-flex flex-nowrap gap-3 m-0 ${styles.scrollTransition} overflow-x-scroll w-100`}
            style={{
              transform: `translateX(-${(startIdx / cards.length) * 100}%)`,
            }}
          >
         {loading
              ? placeholders.map((ph, idx) => (
                  <div key={idx} className="flex-shrink-0">
                    {ph}
                  </div>
                ))
              : cards.map((card, idx) => (
                  <div key={idx} className="flex-shrink-0">
                    {card}
                  </div>
                ))}
          </div>
          <button
            className={`btn btn-dark d-none d-md-flex align-items-center justify-content-center  position-absolute ${styles.scrollIcon1}`}
            onClick={handleNext}
            disabled={startIdx >= cards.length - cardsPerView}
            aria-label="Próximo"
          >
            <ion-icon name="caret-forward-outline" size="large"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectGame;
