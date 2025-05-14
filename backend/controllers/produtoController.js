// controllers/produtoController.js
const Produto = require('../models/Produto');

exports.listar = async (req, res) => {
  const produtos = await Produto.find().sort({ nome: 1 });
  res.json(produtos);
};

exports.obter = async (req, res) => {
  const produto = await Produto.findById(req.params.id);
  if (!produto) return res.status(404).json({ msg: 'Produto não encontrado.' });
  res.json(produto);
};

exports.criar = async (req, res) => {
  const novo = new Produto(req.body);
  const salvo = await novo.save();
  res.status(201).json(salvo);
};

exports.editar = async (req, res) => {
  const atualizado = await Produto.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!atualizado) return res.status(404).json({ msg: 'Produto não encontrado.' });
  res.json(atualizado);
};

exports.apagar = async (req, res) => {
  const excluido = await Produto.findByIdAndDelete(req.params.id);
  if (!excluido) return res.status(404).json({ msg: 'Produto não encontrado.' });
  res.json({ msg: 'Produto apagado com sucesso.' });
};

