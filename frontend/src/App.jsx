import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

import Login from './pages/Login';
import Produtos from './pages/Produtos';
import NovoProduto from './pages/NovoProduto';
import EditarProduto from './pages/EditarProduto';
import Vendas from './pages/Vendas';
import NovaVenda from './pages/NovaVenda';
import Relatorios from './pages/Relatorios';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/novo" element={<NovoProduto />} />
          <Route path="/produtos/editar/:id" element={<EditarProduto />} />

          <Route path="/vendas" element={<Vendas />} />
          <Route path="/vendas/nova" element={<NovaVenda />} />

          <Route path="/relatorios" element={<Relatorios />} />
        </Route>

        <Route path="*" element={<Navigate to="/produtos" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

