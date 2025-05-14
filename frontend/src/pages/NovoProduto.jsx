import React, { useState } from 'react';
import { criarProduto } from '../services/produtoService';
import { useNavigate } from 'react-router-dom';

function NovoProduto() {
  const [form, setForm] = useState({
    nome: '',
    preco: '',
    quantidade: '',
    categoria: ''
  });
  const nav = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Prepara payload com tipos corretos
    const payload = {
      nome: form.nome,
      preco: parseFloat(form.preco),
      quantidade: parseInt(form.quantidade, 10),
      categoria: form.categoria || undefined
    };

    try {
      await criarProduto(payload);
      nav('/produtos');
    } catch (err) {
      console.error('Erro ao criar produto:', err.response?.data || err);
      alert('Falha ao criar produto: ' + (err.response?.data?.msg || err.message));
    }
  };

  return (
    <div>
      <h2>Novo Produto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Preço (MZN):</label>
          <input
            name="preco"
            type="number"
            step="0.01"
            value={form.preco}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Quantidade:</label>
          <input
            name="quantidade"
            type="number"
            value={form.quantidade}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Categoria:</label>
          <input
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Criar</button>
      </form>
    </div>
  );
}

export default NovoProduto;
