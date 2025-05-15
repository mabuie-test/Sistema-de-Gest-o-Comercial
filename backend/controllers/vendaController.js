// controllers/vendaController.js
const Venda   = require('../models/Venda');
const Produto = require('../models/Produto');
const { gerarRelatorioJSON, gerarRelatorioCSV } = require('../utils/relatorios');

exports.listar = async (req, res) => {
  try {
    const vendas = await Venda.find()
      .populate('items.produto', 'nome preco')
      .populate('user', 'nome email')
      .sort({ dataVenda: -1 });
    res.json(vendas);
  } catch (err) {
    console.error('Erro ao listar vendas:', err);
    res.status(500).json({ msg: 'Erro ao listar vendas.', error: err.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const { items } = req.body;
    const userId    = req.usuarioId;  // definido pelo authMiddleware

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ msg: 'A venda deve ter ao menos um item.' });
    }

    let total = 0;
    for (let item of items) {
      const prod = await Produto.findById(item.produto);
      if (!prod) {
        return res.status(400).json({ msg: `Produto ${item.produto} não existe.` });
      }
      if (prod.quantidade < item.quantidade) {
        return res.status(400).json({ msg: `Stock insuficiente para ${prod.nome}.` });
      }

      prod.quantidade -= item.quantidade;
      await prod.save();

      total += item.quantidade * prod.preco;
      item.precoUnit = prod.preco;
    }

    const venda = new Venda({ items, total, user: userId });
    const salva = await venda.save();
    res.status(201).json(salva);

  } catch (err) {
    console.error('Erro ao criar venda:', err);
    res.status(500).json({ msg: 'Erro ao registar venda.', error: err.message });
  }
};

exports.gerarRelatorio = async (req, res) => {
  try {
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
  } catch (err) {
    console.error('Erro ao gerar relatório:', err);
    res.status(500).json({ msg: 'Erro ao gerar relatório.', error: err.message });
  }
};
