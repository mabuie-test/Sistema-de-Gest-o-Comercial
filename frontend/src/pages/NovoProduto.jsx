import React, { useState } from 'react';
import { criarProduto } from '../services/produtoService';
import { useNavigate } from 'react-router-dom';

function NovoProduto() {
  const [form, setForm] = useState({ nome: '', preco: 0, quantidade: 0, categoria: '' });
  const nav = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await criarProduto(form);
    nav('/produtos');
  };

  return (
    <div>
      <h2>Novo Produto</h2>
      <form onSubmit={handleSubmit}>
        <div><label>Nome:</label><input name="nome" onChange={handleChange} required/></div>
        <div><label>Preço:</label><input name="preco" type="number" onChange={handleChange} required/></div>
        <div><label>Quantidade:</label><input name="quantidade" type="number" onChange={handleChange} required/></div>
        <div><label>Categoria:</label><input name="categoria" onChange={handleChange}/></div>
        <button type="submit">Criar</button>
      </form>
    </div>
  );
}

export default NovoProduto;

