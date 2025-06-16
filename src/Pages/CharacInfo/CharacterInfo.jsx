import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPersonagemById } from "../../api/personagem";
import { getJogoById } from "../../api/jogo";
import { getTiposPersonagem } from "../../api/tipoPersonagem";
import { getPosts } from "../../api/posts";
import ForumContainer from "../../components/ForumContainer/ForumContainer";


const CharacterInfo = () => {
  const { personagemId } = useParams();
  const [personagem, setPersonagem] = useState(null);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Busca dados do personagem
        const personagemData = await getPersonagemById(personagemId);
        setPersonagem(personagemData);

            let jogo = personagemData.jogo;
        if (!jogo && personagemData.jogoId) {
          jogo = await getJogoById(personagemData.jogoId);
        }

        // Busca o tipo de personagem se não vier populado
        let tipoPersonagem = personagemData.tipoPersonagem;
        if (!tipoPersonagem && personagemData.tipoPersonagemId) {
          
          const tipos = await getTiposPersonagem();
          tipoPersonagem = tipos.find(t => t.tipoPersonagemId === personagemData.tipoPersonagemId);
        }

        setPersonagem({
          ...personagemData,
          jogo,
          tipoPersonagem,
        });

        // Busca todos os posts
        const allPosts = await getPosts();
        setPosts(allPosts);

        // Filtra posts que possuem a tag igual ao nome do personagem
        const postsDoPersonagem = posts.filter(
    (post) =>
      post.Tags &&
      post.Tags.toLowerCase().includes(personagem.personagemNome?.toLowerCase())
  );
        setFilteredPosts(postsDoPersonagem);
      } catch (e) {
        console.error("Erro ao buscar dados:", e);
        setPersonagem(null);
        setPosts([]);
        setFilteredPosts([]);
      }
    }
    fetchData();
  }, [personagemId]);

  if (!personagem) {
    return (
      <div className="container text-light text-center mt-5">
        <h2>Carregando informações do personagem...</h2>
      </div>
    );
  }
  function agruparPostsPorTipo(posts) {
  const agrupados = {};
  posts.forEach(post => {
    const tipo = post.tipoPost || "Outro";
    if (!agrupados[tipo]) agrupados[tipo] = [];
    agrupados[tipo].push(post);
  });
  return agrupados;
}
const tiposOrdem = ["Specials", "Combos"];

  return (
    <div className="px-md-5 container-fluid d-flex flex-column">
      <div className="row bg">
        <div className="d-flex flex-column flex-md-row px-0 align-items-center justify-content-around gap-3 gap-md-5 ">
          <img
            src={personagem.personagemimage || "https://placehold.co/200x200"}
            alt={personagem.personagemNome}
            style={{ maxWidth: 200, maxHeight: 200 }}
          />
          <div className="d-flex flex-column align-items-center">
            <span className="text-light jersey fs-1">{personagem.personagemNome}</span>
            <span className="text-light fs-3">Class:
              {personagem.tipoPersonagem?.tipoNome || "Class not defined"}
            </span>
          </div>
          <span className="fw-light fs-5 text-light text-center">
            {personagem.personagemDescricao}
          </span>
          <span className="fw-light fs-6 text-light text-center">
            Jogo: {personagem.jogo?.jogoNome || personagem.jogoNome || "N/A"}
          </span>
        </div>
      </div>
      <hr className="text-light w-100 my-3 p-0 " />
    <div className="row my-5">
  <p className="text-light display-4 text-center jersey mb-4">
    Posts about {personagem.personagemNome}
  </p>
  <div className="d-flex flex-column gap-4 w-100">
    {(() => {
      // Agrupa os posts filtrados por tipoPost
      const agrupados = agruparPostsPorTipo(filteredPosts);

      // Gera a ordem: Specials, Combos, depois os outros tipos (sem repetir)
      const tiposRestantes = Object.keys(agrupados)
        .filter(tipo => !tiposOrdem.includes(tipo));
      const ordemFinal = [...tiposOrdem, ...tiposRestantes];

      // Renderiza cada grupo
      return ordemFinal.map(tipo => (
        agrupados[tipo] && agrupados[tipo].length > 0 && (
          <div key={tipo}>
            <h2 className="text-light">{tipo}</h2>
            <div className="d-flex flex-wrap gap-3 justify-content-center">
              {agrupados[tipo].map(post => (
                <ForumContainer
                  key={post.PostId}
                  PostId={post.PostId}
                  PostTitulo={post.PostTitulo}
                  PostConteudo={post.PostConteudo}
                  PostImage={post.PostImage}
                  UsuarioNome={post.UsuarioNome}
                  profilePicture={post.profilePicture}
                  DataPostagem={post.DataPostagem}
                  Tags={post.Tags}
                />
              ))}
            </div>
          </div>
        )
      ));
    })()}
    {filteredPosts.length === 0 && (
      <span className="text-light">No posts found for this character.</span>
    )}
  </div>
</div>
    </div>
  );
};

export default CharacterInfo;
