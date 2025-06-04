import { API_BASE_URL } from "./config.js";

// Buscar todos os posts
export async function getPosts() {
  const response = await fetch(`${API_BASE_URL}posts`);
  if (!response.ok) throw new Error("Erro ao buscar posts");
  return response.json();
}

// Buscar um post por ID
export async function getPostById(id) {
  const response = await fetch(`${API_BASE_URL}posts/${id}`);
  if (!response.ok) throw new Error("Erro ao buscar post");
  return response.json();
}

// Criar um novo post
export async function createPost(postData) {
  const response = await fetch(`${API_BASE_URL}posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });
  if (!response.ok) throw new Error("Erro ao criar post");
  return response.json();
}