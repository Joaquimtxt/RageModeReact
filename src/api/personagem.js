import { API_BASE_URL } from "./config.js";

// Buscar um personagem por ID
export async function getPersonagemById(id) {
  const response = await fetch(`${API_BASE_URL}Personagens/${id}`);
  if (!response.ok) throw new Error("Erro ao buscar personagem");
  return response.json();
}

// Atualizar personagem (apenas admin)
export async function updatePersonagem(id, personagemData, token) {
  const response = await fetch(`${API_BASE_URL}Personagens/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(personagemData),
  });
  if (!response.ok) throw new Error("Erro ao atualizar personagem");
  return response;
}

// Criar novo personagem (apenas admin)
export async function createPersonagem(personagemData, token) {
  const response = await fetch(`${API_BASE_URL}Personagens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(personagemData),
  });
  if (!response.ok) throw new Error("Erro ao criar personagem");
  return response.json();
}

// Deletar personagem (apenas admin)
export async function deletePersonagem(id) {
  const token = localStorage.getItem("token"); // Supondo que o token esteja armazenado no localStorage
  const response = await fetch(`${API_BASE_URL}Personagens/${id}`, {
    method: "DELETE",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!response.ok) throw new Error("Erro ao deletar personagem");
  return response;
}

// Upload de imagem do personagem (apenas admin)
export async function uploadCharacterPicture(personagemId, file, token) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("PersonagemId", personagemId);

  const response = await fetch(`${API_BASE_URL}Personagens/UploadCharacterPicture`, {
    method: "POST",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  });
  if (!response.ok) throw new Error("Erro ao enviar imagem do personagem");
  return response.json();
}

// Buscar imagem do personagem em Base64
export async function getCharacterPicture(personagemId) {
  const response = await fetch(`${API_BASE_URL}Personagens/GetCharacterPicture?PersonagemId=${personagemId}`);
  if (!response.ok) throw new Error("Erro ao buscar imagem do personagem");
  return response.json();
}