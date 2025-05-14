// models/Venda.js
const mongoose = require('mongoose');

const itemVendaSchema = new mongoose.Schema({
  produto:   { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
  quantidade:{ type: Number, required: true },
  precoUnit: { type: Number, required: true },
});

const vendaSchema = new mongoose.Schema({
  items:      [itemVendaSchema],
  total:      { type: Number, required: true },
  dataVenda:  { type: Date, default: Date.now },
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Venda', vendaSchema);

