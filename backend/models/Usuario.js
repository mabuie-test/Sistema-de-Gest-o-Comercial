// models/Usuario.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  nome:   { type: String, required: true },
  email:  { type: String, required: true, unique: true },
  senha:  { type: String, required: true },
  role:   { type: String, enum: ['user','admin'], default: 'user' }
}, { timestamps: true });

// Hash da senha antes de gravar
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) return next();
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

module.exports = mongoose.model('Usuario', usuarioSchema);
