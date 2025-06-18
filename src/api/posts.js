import { API_BASE_URL } from "./config.js";

const token = localStorage.getItem("Token");
// Buscar todos os posts
export async function getPosts() {
  const response = await fetch(`${API_BASE_URL}Posts`);
  if (!response.ok) throw new Error("Erro ao buscar posts");
  return response.json();
}

// Buscar um post por ID
export async function getPostById(id) {
  const response = await fetch(`${API_BASE_URL}posts/${id}`);
  if (!response.ok) throw new Error("Erro ao buscar post");
  return response.json();
}


// Buscar posts por usuário
export async function getPostsByUsuario(usuarioId) {
  const response = await fetch(`${API_BASE_URL}posts/PostPorUsuarioId?usuarioId=${usuarioId}`);
  if (!response.ok) throw new Error("Erro ao buscar posts do usuário");
  return response.json();
}

// Criar um novo post
export async function createPost(postData) {
  const response = await fetch(`${API_BASE_URL}posts`, {
    method: "POST",
    headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}` },
    body: JSON.stringify(postData),
  });
  if (!response.ok) throw new Error("Erro ao criar post");
  return response.json();
}

// Editar um post
export async function updatePost(id, postData, token) {
  const response = await fetch(`${API_BASE_URL}posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(postData),
  });
  if (!response.ok) throw new Error("Erro ao editar post");
  return response;
}

// Deletar um post
export async function deletePost(id, token) {
  const response = await fetch(`${API_BASE_URL}posts/${id}`, {
    method: "DELETE",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!response.ok) throw new Error("Erro ao deletar post");
  return response;
}

// Curtir/descurtir um post
export async function likePost(postId, like, token) {
  const response = await fetch(`${API_BASE_URL}posts/${postId}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(like),
  });
  if (!response.ok) throw new Error("Erro ao curtir/descurtir post");
  return response;
}

// Remover like de um post
export async function unlikePost(postId, token) {
  const response = await fetch(`${API_BASE_URL}posts/${postId}/like`, {
    method: "DELETE",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!response.ok) throw new Error("Erro ao remover like do post");
  return response;
}

// Adicionar comentário a um post
export async function addComment(postId, comentario, token) {
  const response = await fetch(`${API_BASE_URL}posts/${postId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(comentario),
  });
  if (!response.ok) throw new Error("Erro ao comentar no post");
  return response.json();
}

// Buscar comentários de um post
export async function getPostComments(postId) {
  const response = await fetch(`${API_BASE_URL}posts/${postId}/comments`);
  if (!response.ok) throw new Error("Erro ao buscar comentários do post");
  return response.json();
}

// Seguir usuário do post
export async function followUserFromPost(postId) {
  const token = localStorage.getItem("Token")
  const response = await fetch(`${API_BASE_URL}posts/${postId}/follow`, {
    method: "POST",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!response.ok) throw new Error("Erro ao seguir usuário do post");
  return response;
}

// Upload de imagem para o post
export async function uploadPostImage(postId, file, token) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}posts/${postId}/upload-image`, {
    method: "POST",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  });
  if (!response.ok) throw new Error("Erro ao enviar imagem do post");
  return response.json();
}