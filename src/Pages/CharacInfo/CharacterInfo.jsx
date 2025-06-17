import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { deletePersonagem, getPersonagemById } from "../../api/personagem";
import { getJogoById } from "../../api/jogo";
import { getTiposPersonagem } from "../../api/tipoPersonagem";
import { getPosts } from "../../api/posts";
import ForumContainer from "../../components/ForumContainer/ForumContainer";
import { getOwnUserProfile } from "../../api/usuarios";




const CharacterInfo = () => {
  const { personagemId } = useParams();
  const [personagem, setPersonagem] = useState(null);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
    const [userInfo, setUserInfo] = useState()
  
  const navigate = useNavigate();
  
getOwnUserProfile().then(setUserInfo).catch(error => {
    console.log("Erro ao buscar as informações de perfil: ", error);
  })


  const handleDeleteCharacter = () => {

// if(userInfo.usuarioRole != "Admin") {
  //   navigate("/")
  //   alert("Somente um administrador pode excluir ou alterar postagens.")
  // }

      const confirmDelete = window.confirm(`Deseja excluir ${personagem.personagemNome} do banco de dados de ${personagem.jogo.jogoNome} ? esta será uma ação irreversivel.`)

      if(!confirmDelete) return;

      deletePersonagem(personagemId);
      navigate(`/games/${personagem.jogoId}/character`)
      alert( "Personagem removido com sucesso." )

  }

  useEffect(() => {
    async function fetchData() {
      try {
        const personagemData = await getPersonagemById(personagemId);

        let jogo = personagemData.jogo;
        if (!jogo && personagemData.jogoId) {
          jogo = await getJogoById(personagemData.jogoId);
        }

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
      } catch (error) {
        console.error("Erro ao buscar dados do personagem:", error);
      }
    }
    fetchData();
  }, [personagemId]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const allPosts = await getPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    }
    fetchPosts();
  }, []);

  // Filtro robusto dos posts
  useEffect(() => {
    if (!personagem || !personagem.jogo || !posts?.length) {
      setFilteredPosts([]);
      return;
    }

    const postsDoPersonagem = posts.filter(post => {
      if (!post.tipoPost || typeof post.tipoPost !== "string") return false;

      // Limpa e separa as partes
      const tipoPostLimpo = post.tipoPost
        .replace(/\s*\|\s*/g, '|')
        .replace(/\|+/g, '|')
        .trim();

      const partes = tipoPostLimpo.split('|').map(s => s.trim()).filter(Boolean);
      if (partes.length !== 3) return false;

      // Normalização
      const normalize = str =>
        str
          ?.normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s+/g, " ")
          .trim()
          .toLowerCase();

      const [tipo, jogo, personagemNome] = partes.map(normalize);
      const tipoPersonagem = normalize(personagem.personagemNome);
      const jogoPersonagem = normalize(personagem.jogo?.jogoNome);

      const tipoValido = ["specials", "combos"].includes(tipo);
      const jogoValido = !!jogo && !!jogoPersonagem && jogo === jogoPersonagem;
      const personagemValido = !!personagemNome && !!tipoPersonagem && personagemNome === tipoPersonagem;
      return tipoValido && jogoValido && personagemValido;
    });

    setFilteredPosts(postsDoPersonagem);
  }, [personagem, posts]);

  if (!personagem) {
    return (
      <div className="container text-light text-center mt-5">
        <h2>Carregando informações do personagem...</h2>
      </div>
    );
  }
  function agruparPostsPorTipo(posts) {
    const agrupados = { specials: [], combos: [] };
    posts.forEach(post => {
      if (!post.tipoPost) return;
      const partes = post.tipoPost
        .replace(/\s*\|\s*/g, '|')
        .replace(/\|+/g, '|')
        .trim()
        .split('|')
        .map(s => s.trim())
        .filter(Boolean);
      if (partes.length !== 3) return;
      const tipo = partes[0].toLowerCase();
      if (tipo === "specials") agrupados.specials.push(post);
      if (tipo === "combos") agrupados.combos.push(post);
    });
    return agrupados;
  }
  
  const agrupados = agruparPostsPorTipo(filteredPosts);

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
            <span className="text-light fs-3">Classe:  
              <b className="ms-2">{personagem.tipoPersonagem?.tipoNome || "Class not defined"}</b>
            </span>
          </div>
          <span className="fw-light fs-5 text-light text-center">
            {personagem.personagemDescricao}
          </span>
          <span className="fw-light fs-6 text-light text-center">
            Jogo: {personagem.jogo?.jogoNome || personagem.jogoNome || "N/A"}
          </span>
          <button className="bg-danger px-2 py-1 rounded-3 text-light border-0" onClick={handleDeleteCharacter} ><i className="bi bi-trash me-2"></i> Deletar </button>
        </div>
      </div>
      <hr className="text-light w-100 my-3 p-0 " />
    <div className="row my-5">
  <p className="text-light display-4 text-center jersey mb-4">
    Posts about {personagem.personagemNome}
  </p>
  <div className="d-flex flex-column gap-4 w-100">
    <div className="d-flex flex-column gap-3 justify-content-center text-light">
      {["specials", "combos"].map(tipo => (
        <div key={tipo}>
          <h3>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h3>
          {agrupados[tipo].map(post => (
            <ForumContainer
              key={post.postId}
              PostId={post.postId}
              PostTitulo={post.postTitulo}
              PostConteudo={post.postConteudo}
              UsuarioNome={post.usuarioNome}
              DataPostagem={post.dataPostagem}
              PostImage={post.imageUrl}
              profilePicture={post.profilePicture}
              Tags={post.tipoPost}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
</div>
</div> 
  );
};


export default CharacterInfo;
