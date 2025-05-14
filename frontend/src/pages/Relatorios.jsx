import React from 'react';
import { gerarRelatorio } from '../services/vendaService';

function Relatorios() {
  const download = async formato => {
    const res = await gerarRelatorio(formato);
    const blob = new Blob([res.data], { type: res.headers['content-type'] });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_vendas.${formato}`;
    a.click();
  };

  return (
    <div>
      <h2>Relatórios de Vendas</h2>
      <button onClick={() => download('json')}>Exportar JSON</button>
      <button onClick={() => download('csv')}>Exportar CSV</button>
    </div>
  );
}

export default Relatorios;

