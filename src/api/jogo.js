import { API_BASE_URL } from "./config.js";

// Buscar um jogo por ID
export async function getJogoById(id) {
  const response = await fetch(`${API_BASE_URL}jogos/${id}`);
  if (!response.ok) throw new Error("Erro ao buscar jogo");
  return response.json();
}

// Atualizar um jogo (apenas admin)
export async function updateJogo(id, jogoData, token) {
  const response = await fetch(`${API_BASE_URL}jogos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(jogoData),
  });
  if (!response.ok) throw new Error("Erro ao atualizar jogo");
  return response;
}

// Criar novo jogo (apenas admin)
export async function createJogo(jogoData, token) {
  const response = await fetch(`${API_BASE_URL}jogos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(jogoData),
  });
  if (!response.ok) throw new Error("Erro ao criar jogo");
  return response.json();
}

// Deletar jogo (apenas admin)
export async function deleteJogo(id) {
  const token = localStorage.getItem("token"); // Supondo que o token esteja armazenado no localStorage
  const response = await fetch(`${API_BASE_URL}jogos/${id}`, {
    method: "DELETE",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!response.ok) throw new Error("Erro ao deletar jogo");
  return response;
}

// Upload de imagem do jogo (apenas admin)
export async function uploadGamePicture(jogoId, file, token) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("JogoId", jogoId);

  const response = await fetch(`${API_BASE_URL}jogos/UploadGamePicture`, {
    method: "POST",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  });
  if (!response.ok) throw new Error("Erro ao enviar imagem do jogo");
  return response.json();
}

// Buscar imagem do jogo em Base64
export async function getGamePicture(jogoId) {
  const response = await fetch(`${API_BASE_URL}Jogos/GetGamePicture?jogoId=${jogoId}`);
  if (!response.ok) throw new Error("Erro ao buscar imagem do jogo");
  return response.json(); 
}