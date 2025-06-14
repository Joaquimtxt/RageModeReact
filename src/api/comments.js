import { API_BASE_URL } from "./config.js";

const token = localStorage.getItem("Token");

// Buscar todos os comentários
export async function getComentarios() {
  const response = await fetch(`${API_BASE_URL}comentarios`);
  if (!response.ok) throw new Error("Erro ao buscar comentários");
  return response.json();
}

// Buscar um comentário por ID
export async function getComentarioById(id) {
  const response = await fetch(`${API_BASE_URL}comentarios/${id}`);
  if (!response.ok) throw new Error("Erro ao buscar comentário");
  return response.json();
}

// Criar um novo comentário (usuário autenticado)
export async function createComentario(comentarioData) {
  const response = await fetch(`${API_BASE_URL}comentarios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(comentarioData),
  });
  if (!response.ok) throw new Error("Erro ao criar comentário");
  return response.json();
}

// Editar um comentário (usuário autenticado)
export async function updateComentario(id, comentarioData) {
  const response = await fetch(`${API_BASE_URL}comentarios/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(comentarioData),
  });
  if (!response.ok) throw new Error("Erro ao editar comentário");
  return response;
}

// Deletar um comentário (usuário autenticado)
export async function deleteComentario(id) {
  const response = await fetch(`${API_BASE_URL}comentarios/${id}`, {
    method: "DELETE",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!response.ok) throw new Error("Erro ao deletar comentário");
  return response;
}