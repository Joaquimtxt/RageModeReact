import React, { useEffect, useState } from "react";
import { getPosts, getUsers } from "../api"; 

function normalize(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const BarraPesquisa = () => {
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts);
    getUsers().then(setUsers);
  }, []);

  const searchTerm = normalize(input);

  const filteredPosts = posts.filter(
    post =>
      normalize(post.postTitulo).includes(searchTerm) ||
      normalize(post.postConteudo).includes(searchTerm)
  );

  const filteredUsers = users.filter(
    user =>
      normalize(user.nome).includes(searchTerm) ||
      normalize(user.email).includes(searchTerm)
  );

  return (
    <div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Buscar posts ou usuários"
      />
      <div>
        <h5>Posts</h5>
        {filteredPosts.map(post => (
          <div key={post.postId}>{post.postTitulo}</div>
        ))}
        <h5>Usuários</h5>
        {filteredUsers.map(user => (
          <div key={user.usuarioId}>{user.nome}</div>
        ))}
      </div>
    </div>
  );
};

export default BarraPesquisa;