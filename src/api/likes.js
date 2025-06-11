import { API_BASE_URL } from "./config.js";

// Buscar todos os likes
export async function getLikes() {
  const response = await fetch(`${API_BASE_URL}likes`);
  if (!response.ok) throw new Error("Erro ao buscar likes");
  return response.json();
}

// Buscar um like por ID
export async function getLikeById(id) {
  const response = await fetch(`${API_BASE_URL}likes/${id}`);
  if (!response.ok) throw new Error("Erro ao buscar like");
  return response.json();
}

// Atualizar um like (apenas admin)
export async function updateLike(id, likeData, token) {
  const response = await fetch(`${API_BASE_URL}likes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(likeData),
  });
  if (!response.ok) throw new Error("Erro ao atualizar like");
  return response;
}

// Criar um novo like (usuário autenticado)
export async function createLike(likeData, token) {
  const response = await fetch(`${API_BASE_URL}likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(likeData),
  });
  if (!response.ok) throw new Error("Erro ao criar like");
  return response.json();
}

// Deletar um like (usuário autenticado)
export async function deleteLike(id, token) {
  const response = await fetch(`${API_BASE_URL}likes/${id}`, {
    method: "DELETE",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!response.ok) throw new Error("Erro ao deletar like");
  return response;
}