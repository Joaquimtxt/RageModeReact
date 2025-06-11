import { API_BASE_URL } from "./config.js";

// Buscar todos os seguidores
export async function getSeguidores() {
  const response = await fetch(`${API_BASE_URL}seguidores`);
  if (!response.ok) throw new Error("Erro ao buscar seguidores");
  return response.json();
}

// Buscar um seguidor por ID
export async function getSeguidorById(id) {
  const response = await fetch(`${API_BASE_URL}seguidores/${id}`);
  if (!response.ok) throw new Error("Erro ao buscar seguidor");
  return response.json();
}

// Atualizar seguidor (apenas admin)
export async function updateSeguidor(id, seguidorData, token) {
  const response = await fetch(`${API_BASE_URL}seguidores/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(seguidorData),
  });
  if (!response.ok) throw new Error("Erro ao atualizar seguidor");
  return response;
}

// Criar novo seguidor (usuário autenticado)
export async function createSeguidor(seguidorData, token) {
  const response = await fetch(`${API_BASE_URL}seguidores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(seguidorData),
  });
  if (!response.ok) throw new Error("Erro ao criar seguidor");
  return response.json();
}

// Deletar seguidor (usuário autenticado)
export async function deleteSeguidor(id, token) {
  const response = await fetch(`${API_BASE_URL}seguidores/${id}`, {
    method: "DELETE",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!response.ok) throw new Error("Erro ao deletar seguidor");
  return response;
}