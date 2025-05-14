import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getToken } from '../services/authService';

function Navbar() {
  const navigate = useNavigate();
  const token = getToken();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/produtos">Produtos</Link> |{' '}
      <Link to="/vendas">Vendas</Link> |{' '}
      <Link to="/relatorios">Relatórios</Link> |{' '}
      {token
        ? <button onClick={handleLogout}>Logout</button>
        : <Link to="/login">Login</Link>
      }
    </nav>
  );
}

export default Navbar;

