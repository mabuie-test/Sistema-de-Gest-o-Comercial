import axios from 'axios';
import { getToken } from './authService';

const API = axios.create({
  // Substitua pela URL real do seu backend
  baseURL: 'https://sisgescom.onrender.com/api/produtos'
});

API.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const listarProdutos = ()      => API.get('/');
export const obterProduto   = id    => API.get(`/${id}`);
export const criarProduto   = dados => API.post('/', dados);
export const editarProduto  = (id, dados) => API.put(`/${id}`, dados);
export const apagarProduto  = id    => API.delete(`/${id}`);
