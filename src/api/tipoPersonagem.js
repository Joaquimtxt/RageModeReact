import { API_BASE_URL } from "./config.js";

// Buscar todos os tipos de personagem
export async function getTiposPersonagem() {        
  const response = await fetch(`${API_BASE_URL}TipoPersonagens`);
  if (!response.ok) throw new Error("Erro ao buscar tipos de personagem");
  return response.json();
}

// Buscar um tipo de personagem por ID
export async function getTipoPersonagemById(id) {
  const response = await fetch(`${API_BASE_URL}TipoPersonagens/${id}`);
  if (!response.ok) throw new Error("Erro ao buscar tipo de personagem");
  return response.json();
}

// Atualizar tipo de personagem (apenas admin)
export async function updateTipoPersonagem(id, tipoData, token) {
  const response = await fetch(`${API_BASE_URL}TipoPersonagens/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(tipoData),
  });
  if (!response.ok) throw new Error("Erro ao atualizar tipo de personagem");
  return response;
}

// Criar novo tipo de personagem (usuário autenticado/admin)
export async function createTipoPersonagem(tipoData, token) {
  const response = await fetch(`${API_BASE_URL}TipoPersonagens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(tipoData),
  });
  if (!response.ok) throw new Error("Erro ao criar tipo de personagem");
  return response.json();
}

// Deletar tipo de personagem (usuário autenticado/admin)
export async function deleteTipoPersonagem(id, token) {
  const response = await fetch(`${API_BASE_URL}TipoPersonagens/${id}`, {
    method: "DELETE",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!response.ok) throw new Error("Erro ao deletar tipo de personagem");
  return response;
}