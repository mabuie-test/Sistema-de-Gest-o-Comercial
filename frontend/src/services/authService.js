
import axios from 'axios';
const API = axios.create({ baseURL: 'https://seu-backend-no-render.onrender.com/api/auth' });

export const login = async (email, senha) => {
  const res = await API.post('/login', { email, senha });
  localStorage.setItem('token', res.data.token);
  return res.data;
};

export const getToken = () => localStorage.getItem('token');
export const logout = () => localStorage.removeItem('token');
