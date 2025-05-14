import React, { useEffect, useState } from 'react';
import { listarProdutos, apagarProduto } from '../services/produtoService';
import { Link } from 'react-router-dom';

function Produtos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function fetch() {
      const res = await listarProdutos();
      setProdutos(res.data);
    }
    fetch();
  }, []);

  const handleDelete = async id => {
    await apagarProduto(id);
    setProdutos(produtos.filter(p => p._id !== id));
  };

  return (
    <div>
      <h2>Produtos</h2>
      <Link to="/produtos/novo">+ Novo Produto</Link>
      <ul>
        {produtos.map(p => (
          <li key={p._id}>
            {p.nome} — MZN {p.preco} ({p.quantidade})
            {' '}
            <Link to={`/produtos/editar/${p._id}`}>Editar</Link>
            {' '}
            <button onClick={() => handleDelete(p._id)}>Apagar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Produtos;

