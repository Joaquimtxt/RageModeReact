import { API_BASE_URL } from "./config.js";

// Buscar todos os usuários
export async function getUsuarios() {
  const response = await fetch(`${API_BASE_URL}usuarios`);
  if (!response.ok) throw new Error("Erro ao buscar usuários");
  return response.json();
}

// Buscar um usuário por ID (descomentado se você ativar o endpoint no backend)
// export async function getUsuarioById(id) {
//   const response = await fetch(`${API_BASE_URL}usuarios/${id}`);
//   if (!response.ok) throw new Error("Erro ao buscar usuário");
//   return response.json();
// }

// Atualizar usuário (usuário autenticado ou admin)
export async function updateUsuario(id, usuarioData, token) {
  const response = await fetch(`${API_BASE_URL}usuarios/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(usuarioData),
  });
  if (!response.ok) throw new Error("Erro ao atualizar usuário");
  return response;
}

// Buscar contagem de seguidores de um usuário
export async function getFollowerCount(userId) {
  const response = await fetch(`${API_BASE_URL}usuarios/${userId}/followers/count`);
  if (!response.ok) throw new Error("Erro ao buscar contagem de seguidores");
  return response.json();
}

// Registrar novo usuário
export async function registerUser(registerData) {
  const response = await fetch(`${API_BASE_URL}usuarios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });
  if (!response.ok) throw new Error("Erro ao registrar usuário");
  return response.json();
}

// Seguir usuário (usuário autenticado)
export async function followUser(userId, token) {
  const response = await fetch(`${API_BASE_URL}usuarios/${userId}/follow`, {
    method: "POST",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!response.ok) throw new Error("Erro ao seguir usuário");
  return response;
}

// Deixar de seguir usuário (usuário autenticado)
export async function unfollowUser(userId, token) {
  const response = await fetch(`${API_BASE_URL}usuarios/${userId}/unfollow`, {
    method: "DELETE",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!response.ok) throw new Error("Erro ao deixar de seguir usuário");
  return response;
}

// Deletar usuário (usuário autenticado ou admin)
export async function deleteUsuario(id, token) {
  const response = await fetch(`${API_BASE_URL}usuarios/${id}`, {
    method: "DELETE",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!response.ok) throw new Error("Erro ao deletar usuário");
  return response;
}

// Adicionar role a um usuário (admin)
export async function addRoleToUser(userId, role, token) {
  const response = await fetch(`${API_BASE_URL}usuarios/${userId}/addrole`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(role),
  });
  if (!response.ok) throw new Error("Erro ao adicionar role ao usuário");
  return response;
}