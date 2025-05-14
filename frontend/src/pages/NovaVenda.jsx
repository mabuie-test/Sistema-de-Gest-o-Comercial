import React, { useEffect, useState } from 'react';
import { listarProdutos } from '../services/produtoService';
import { criarVenda } from '../services/vendaService';
import { useNavigate } from 'react-router-dom';

function NovaVenda() {
  const [produtos, setProdutos] = useState([]);
  const [items, setItems] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    async function fetch() {
      const res = await listarProdutos();
      setProdutos(res.data);
    }
    fetch();
  }, []);

  const addItem = produto => {
    setItems([...items, { produto: produto._id, quantidade: 1 }]);
  };

  const updateQty = (idx, qty) => {
    const tmp = [...items];
    tmp[idx].quantidade = qty;
    setItems(tmp);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await criarVenda({ items, user: null });
    nav('/vendas');
  };

  return (
    <div>
      <h2>Nova Venda</h2>
      <div>
        <h3>Produtos Disponíveis</h3>
        <ul>
          {produtos.map(p => (
            <li key={p._id}>
              {p.nome} ({p.quantidade} em stock) 
              <button onClick={() => addItem(p)}>+</button>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Itens na Venda</h3>
        {items.map((i, idx) => (
          <div key={idx}>
            <select
              value={i.produto}
              onChange={e => {
                const novo = [...items];
                novo[idx].produto = e.target.value;
                setItems(novo);
              }}
            >
              {produtos.map(p => (
                <option key={p._id} value={p._id}>{p.nome}</option>
              ))}
            </select>
            <input
              type="number" min="1"
              value={i.quantidade}
              onChange={e => updateQty(idx, Number(e.target.value))}
            />
          </div>
        ))}
        <button type="submit">Registar Venda</button>
      </form>
    </div>
  );
}

export default NovaVenda;

