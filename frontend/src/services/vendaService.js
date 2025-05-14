import axios from 'axios';
import { getToken } from './authService';

const API = axios.create({ baseURL: 'https://seu-backend-no-render.onrender.com/api/vendas' });
API.interceptors.request.use(config => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const listarVendas       = () => API.get('/');
export const criarVenda         = dados => API.post('/', dados);
export const gerarRelatorio     = formato => API.get(`/relatorio?formato=${formato}`);

