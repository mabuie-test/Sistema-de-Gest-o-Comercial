import React, { useEffect, useState } from 'react';
import { listarProdutos } from '../services/produtoService';
import { criarVenda }     from '../services/vendaService';
import { useNavigate }    from 'react-router-dom';

function NovaVenda() {
  const [produtos, setProdutos] = useState([]);
  const [items, setItems]       = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const res = await listarProdutos();
        setProdutos(res.data);
      } catch (err) {
        console.error('Erro ao listar produtos:', err);
      }
    }
    fetchProdutos();
  }, []);

  const addItem = produto => {
    setItems(prev => [...prev, { produto: produto._id, quantidade: 1 }]);
  };

  const updateQty = (idx, qty) => {
    setItems(prev => {
      const tmp = [...prev];
      tmp[idx].quantidade = qty;
      return tmp;
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Somente items; o backend infere o user do token
      await criarVenda({ items });
      nav('/vendas');
    } catch (err) {
      console.error('Erro ao registar venda:', err.response?.data || err);
      alert('Falha ao registar venda: ' + (err.response?.data?.msg || err.message));
    }
  };

  return (
    <div>
      <h2>Nova Venda</h2>

      <div>
        <h3>Produtos Disponíveis</h3>
        <ul>
          {produtos.map(p => (
            <li key={p._id}>
              {p.nome} ({p.quantidade} em stock){' '}
              <button type="button" onClick={() => addItem(p)}>Adicionar</button>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <h3>Itens na Venda</h3>
        {items.map((item, idx) => (
          <div key={idx}>
            <select
              value={item.produto}
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
              type="number"
              min="1"
              value={item.quantidade}
              onChange={e => updateQty(idx, Number(e.target.value))}
              required
            />
          </div>
        ))}

        <button type="submit">Registar Venda</button>
      </form>
    </div>
  );
}

export default NovaVenda;
