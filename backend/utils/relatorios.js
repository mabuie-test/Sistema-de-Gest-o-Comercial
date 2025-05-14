// utils/relatorios.js
const { Parser } = require('json2csv');

exports.gerarRelatorioJSON = (vendas) => {
  return vendas.map(v => ({
    id: v._id,
    dataVenda: v.dataVenda,
    total: v.total,
    itens: v.items.map(i => ({
      produto: i.produto.nome,
      quantidade: i.quantidade,
      precoUnit: i.precoUnit
    }))
  }));
};

exports.gerarRelatorioCSV = (vendas) => {
  const dados = exports.gerarRelatorioJSON(vendas).map(v => ({
    id: v.id,
    dataVenda: v.dataVenda.toISOString(),
    total: v.total,
    itens: v.itens.map(i => `${i.produto}(${i.quantidade}x${i.precoUnit})`).join('; ')
  }));
  const parser = new Parser({ fields: ['id','dataVenda','total','itens'] });
  return parser.parse(dados);
};

