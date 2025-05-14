// controllers/vendaController.js
const Venda = require('../models/Venda');
const Produto = require('../models/Produto');
const { gerarRelatorioJSON, gerarRelatorioCSV } = require('../utils/relatorios');

exports.listar = async (req, res) => {
  const vendas = await Venda.find()
    .populate('items.produto', 'nome preco')
    .populate('user', 'nome email')
    .sort({ dataVenda: -1 });
  res.json(vendas);
};

exports.criar = async (req, res) => {
  const { items, user } = req.body;

  // Calcular total e validar existências
  let total = 0;
  for (let item of items) {
    const prod = await Produto.findById(item.produto);
    if (!prod) return res.status(400).json({ msg: `Produto ${item.produto} não existe.` });
    if (prod.quantidade < item.quantidade) 
      return res.status(400).json({ msg: `Stock insuficiente para ${prod.nome}.` });

    prod.quantidade -= item.quantidade;
    await prod.save();

    total += item.quantidade * prod.preco;
    item.precoUnit = prod.preco;
  }

  const venda = new Venda({ items, total, user });
  const salva = await venda.save();
  res.status(201).json(salva);
};

exports.gerarRelatorio = async (req, res) => {
  const vendas = await Venda.find().populate('items.produto', 'nome preco');

  const formato = req.query.formato || 'json';
  if (formato === 'csv') {
    const csv = gerarRelatorioCSV(vendas);
    res.header('Content-Type', 'text/csv');
    res.attachment('relatorio_vendas.csv').send(csv);
  } else {
    const json = gerarRelatorioJSON(vendas);
    res.json(json);
  }
};

