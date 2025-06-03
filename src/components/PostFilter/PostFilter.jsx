import React, { useState, useEffect } from "react";

// Lista fixa dos jogos (você pode adaptar para puxar da API depois)
const jogos = [
  "Street Fighter II",
  "Tekken 7",
  "Mortal Kombat 11",
  "Guilty Gear Strive",
  "King of Fighters XIV",
  "BlazBlue",
  "Dragon Ball FighterZ",
  "Samurai Shodown",
  "Injustice 2",
  "Soulcalibur VI",
  // adicione mais jogos icônicos e menos conhecidos aqui
];

// Tipos de posts disponíveis
const tiposPost = ["Discussão", "Dica", "Notícia", "Tutorial", "Gameplay"];

// Função para calcular se a data do post está dentro do filtro de data escolhido
const filtrarPorDataTag = (postData, tag) => {
  if (!tag || tag === "Todas") return true;

  const hoje = new Date();
  const dataPost = new Date(postData);

  switch (tag) {
    case "Recentes":
      // posts dos últimos 7 dias
      return (hoje - dataPost) / (1000 * 60 * 60 * 24) <= 7;

    case "Último mês":
      // posts dos últimos 30 dias
      return (hoje - dataPost) / (1000 * 60 * 60 * 24) <= 30;

    case "Últimos 3 meses":
      // posts dos últimos 90 dias
      return (hoje - dataPost) / (1000 * 60 * 60 * 24) <= 90;

    case "Mais antigos":
      // posts com mais de 90 dias
      return (hoje - dataPost) / (1000 * 60 * 60 * 24) > 90;

    default:
      return true;
  }
};

const PostFilter = ({ posts }) => {
  const [modalAberto, setModalAberto] = useState(false);

  // Estado para filtro de jogo (escolha de lista)
  const [filtroJogo, setFiltroJogo] = useState("");

  // Estado para filtro de data por tag
  const [filtroDataTag, setFiltroDataTag] = useState("Todas");

  // Estado para filtro de tipo de post
  const [filtroTipoPost, setFiltroTipoPost] = useState("Todas");

  // Estado para usuários e busca
  const [usuarios, setUsuarios] = useState([]);
  const [searchUsuario, setSearchUsuario] = useState("");

  useEffect(() => {
    const storedUsers = localStorage.getItem("usuarios");
    if (storedUsers) {
      setUsuarios(JSON.parse(storedUsers));
    }
  }, []);

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.toLowerCase().includes(searchUsuario.toLowerCase())
  );

  // Filtra os posts pelo jogo, tipo e data (tag)
  const postsFiltrados = posts.filter((post) => {
    const jogoMatch = filtroJogo ? post.jogo === filtroJogo : true;
    const tipoMatch =
      filtroTipoPost === "Todas" ? true : post.tipo === filtroTipoPost;
    const dataMatch = filtrarPorDataTag(post.data, filtroDataTag);

    return jogoMatch && tipoMatch && dataMatch;
  });

  return (
    <div>
      {/* Botão para abrir modal */}
      <button className="btn btn-outline-dark bg-light text-dark fw-bold" onClick={() => setModalAberto(true)}>Abrir filtro</button>

      {/* Modal */}
      {modalAberto && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setModalAberto(false)} // fecha modal clicando fora
        >
          <div
            id="post-filter-modal"
            style={{
              padding: 20,
              borderRadius: 8,
              width: 400,
              maxHeight: "80vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()} // evita fechar clicando dentro
          >
            <h2>Filtrar Posts</h2>

            {/* Barra de pesquisa de usuários */}
            <div style={{ marginTop: 15 }}>
              <h4>Buscar Usuários</h4>
              <input
                type="text"
                placeholder="Digite o nome do usuário"
                value={searchUsuario}
                onChange={(e) => setSearchUsuario(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
              <ul style={{ paddingLeft: 20, maxHeight: 150, overflowY: "auto" }}>
                {usuariosFiltrados.length === 0 && <li>Nenhum usuário encontrado.</li>}
                {usuariosFiltrados.map((usuario, index) => (
                  <li key={index}>{usuario}</li>
                ))}
              </ul>
            </div>

            {/* Filtro por jogo */}
            <div>
              <h4>Jogo</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {/* Botão para limpar filtro */}
                <button
                  onClick={() => setFiltroJogo("")}
                  style={{
                    backgroundColor: filtroJogo === "" ? "#007bff" : "#eee",
                    color: filtroJogo === "" ? "white" : "black",
                    border: "none",
                    borderRadius: 4,
                    padding: "6px 12px",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  Todos
                </button>
                {jogos.map((jogo) => (
                  <button
                    key={jogo}
                    onClick={() => setFiltroJogo(jogo)}
                    style={{
                      backgroundColor: filtroJogo === jogo ? "#28a745" : "#eee",
                      color: filtroJogo === jogo ? "white" : "black",
                      border: "none",
                      borderRadius: 4,
                      padding: "6px 12px",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    {jogo}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtro por tipo de post */}
            <div style={{ marginTop: 15 }}>
              <h4>Tipo de Post</h4>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  onClick={() => setFiltroTipoPost("Todas")}
                  style={{
                    backgroundColor:
                      filtroTipoPost === "Todas" ? "#007bff" : "#eee",
                    color: filtroTipoPost === "Todas" ? "white" : "black",
                    border: "none",
                    borderRadius: 4,
                    padding: "6px 12px",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  Todos
                </button>
                {tiposPost.map((tipo) => (
                  <button
                    key={tipo}
                    onClick={() => setFiltroTipoPost(tipo)}
                    style={{
                      backgroundColor:
                        filtroTipoPost === tipo ? "#28a745" : "#eee",
                      color: filtroTipoPost === tipo ? "white" : "black",
                      border: "none",
                      borderRadius: 4,
                      padding: "6px 12px",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    {tipo}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtro por data (tags) */}
            <div style={{ marginTop: 15 }}>
              <h4>Data</h4>
              {[
                "Todas",
                "Recentes",
                "Último mês",
                "Últimos 3 meses",
                "Mais antigos",
              ].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setFiltroDataTag(tag)}
                  style={{
                    backgroundColor: filtroDataTag === tag ? "#17a2b8" : "#eee",
                    color: filtroDataTag === tag ? "white" : "black",
                    border: "none",
                    borderRadius: 4,
                    padding: "6px 12px",
                    cursor: "pointer",
                    marginRight: 8,
                    marginBottom: 8,
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Lista dos posts filtrados */}
            <div style={{ marginTop: 20, maxHeight: 250, overflowY: "auto" }}>
              <h4>Posts filtrados ({postsFiltrados.length})</h4>
              {postsFiltrados.length === 0 && <p>Nenhum post encontrado.</p>}
              <ul style={{ paddingLeft: 20 }}>
                {postsFiltrados.map((post) => (
                  <li key={post.id} style={{ marginBottom: 10 }}>
                    <strong>{post.jogo}</strong> - {post.tipo} - {post.data}
                    <br />
                    {post.conteudo}
                  </li>
                ))}
              </ul>
            </div>

            {/* Botão para fechar modal */}
            <button
              className="btn btn-outline-dark bg-light text-dark fw-bold"
              onClick={() => setModalAberto(false)}
              style={{ marginTop: 15, padding: "8px 16px", cursor: "pointer" }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostFilter;
