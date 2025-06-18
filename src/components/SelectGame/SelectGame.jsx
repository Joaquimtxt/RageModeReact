import React, { useEffect, useRef, useState } from "react";
import styles from "./SelectGame.module.css";
import GameCard from "./GameCard";
import { getGames } from "../../api/personagemJogos";
import { getGamePicture } from "../../api/jogo";

const SelectGame = ({ props, Titulo, franquia }) => {
  const [jogos, setJogos] = useState([]);

  async function fetchImageBanner(jogo) {
    // Se imageBanner não existe ou está vazio, tenta buscar pelo endpoint
    if (!jogo.imageBanner) {
      try {
        const imgResult = await getGamePicture(jogo.jogosId);
        return { ...jogo, imageBannerFinal: imgResult.base64Image };
      } catch {
        return { ...jogo, imageBannerFinal: null };
      }
    }

    // Se já está em base64
    if (
      typeof jogo.imageBanner === "string" &&
      jogo.imageBanner.startsWith("data:image/")
    ) {
      return { ...jogo, imageBannerFinal: jogo.imageBanner };
    }

    // Se é uma URL externa
    if (
      typeof jogo.imageBanner === "string" &&
      (jogo.imageBanner.startsWith("http://") ||
        jogo.imageBanner.startsWith("https://"))
    ) {
      return { ...jogo, imageBannerFinal: jogo.imageBanner };
    }

    // Se é um nome de arquivo (tenta buscar pelo endpoint)
    try {
      const imgResult = await getGamePicture(jogo.jogosId);
      // Se vier base64, usa ele
      if (imgResult && imgResult.base64Image) {
        return { ...jogo, imageBannerFinal: imgResult.base64Image };
      }
      // Se não vier base64, usa o caminho local
      return {
        ...jogo,
        imageBannerFinal: `/Resources/Games/${jogo.imageBanner}`,
      };
    } catch {
      // Qualquer erro, usa o caminho local
      return {
        ...jogo,
        imageBannerFinal: `/Resources/Games/${jogo.imageBanner}`,
      };
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchJogos() {
      try {
        let jogosData = await getGames();

        // Filtra por franquia se necessário
        if (franquia) {
          const franquiaNormalized = franquia.replace(/\s/g, "").toLowerCase();
          jogosData = jogosData.filter((jogo) =>
            (jogo.jogoNome || jogo.nome || "")
              .replace(/\s/g, "")
              .toLowerCase()
              .includes(franquiaNormalized)
          );
        }

        // Ordena por anoLancamento (mais antigo à esquerda)
        jogosData.sort((a, b) => {
          const dataA = a.anoLancamento
            ? new Date(a.anoLancamento)
            : new Date(0);
          const dataB = b.anoLancamento
            ? new Date(b.anoLancamento)
            : new Date(0);
          return dataA - dataB;
        });

        const jogosComImagem = await Promise.all(
          jogosData.map(fetchImageBanner)
        );

        if (isMounted) setJogos(jogosComImagem);
      } catch (error) {
        console.log("Erro com a API ao buscar os jogos:", error);
      }
    }

    fetchJogos();

    return () => {
      isMounted = false;
    };
  }, [franquia]);

  const cards = jogos.map((jogo) => (
    <GameCard
      key={jogo.jogosId}
      Year={jogo.anoLancamento}
      jogoId={jogo.jogosId}
      Title={jogo.jogoNome}
      Poster={jogo.imageBannerFinal || null}
    />
  ));

  const [cardsPerView, setCardsPerView] = useState(4);
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
      <h1 className="ms-xl-5 ms-2 text-light ">
        {Titulo || (props && props.Titulo)}
      </h1>
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
            {cards.map((card, idx) => (
              <div key={idx} className="flex-shrink-0" style={{}}>
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
