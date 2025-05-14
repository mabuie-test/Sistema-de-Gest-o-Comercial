import React, { useEffect, useState } from 'react';
import { listarVendas } from '../services/vendaService';
import { Link } from 'react-router-dom';

function Vendas() {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    async function fetch() {
      const res = await listarVendas();
      setVendas(res.data);
    }
    fetch();
  }, []);

  return (
    <div>
      <h2>Vendas</h2>
      <Link to="/vendas/nova">+ Nova Venda</Link>
      <ul>
        {vendas.map(v => (
          <li key={v._id}>
            {new Date(v.dataVenda).toLocaleString()} — Total: MZN {v.total.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Vendas;

