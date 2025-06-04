import { API_BASE_URL } from "./config.js";

// Buscar todos os jogos
export async function getGames() {
  const response = await fetch(`${API_BASE_URL}jogos`);
  if (!response.ok) throw new Error("Erro ao buscar jogos");
  return response.json();
}

// Buscar personagens de um jogo pelo nome do jogo
export async function getPersonagensByJogo(jogoNome) {
  const response = await fetch(`${API_BASE_URL}personagens?jogoNome=${encodeURIComponent(jogoNome)}`);
  if (!response.ok) throw new Error("Erro ao buscar personagens");
  return response.json();
}

// Buscar todos os personagens
export async function getAllPersonagens() {
  const response = await fetch(`${API_BASE_URL}personagens`);
  if (!response.ok) throw new Error("Erro ao buscar personagens");
  return response.json();
}