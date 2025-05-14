// src/services/authService.js
import axios from 'axios';

// A baseURL agora vem de process.env.REACT_APP_API_URL
// e aponta para o endpoint /api/auth do seu backend.
const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/auth`
});

export const login = async (email, senha) => {
  const res = await API.post('/login', { email, senha });
  // Guarda o token JWT para as próximas requisições
  localStorage.setItem('token', res.data.token);
  return res.data;
};

export const getToken = () => localStorage.getItem('token');
export const logout   = () => localStorage.removeItem('token');
