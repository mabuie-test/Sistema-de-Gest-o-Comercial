// controllers/authController.js
const Usuario = require('../models/Usuario');
const jwt     = require('jsonwebtoken');
const bcrypt  = require('bcryptjs');

exports.registar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ msg: 'Email já registado.' });

    const usuario = new Usuario({ nome, email, senha });
    await usuario.save();
    res.status(201).json({ msg: 'Conta criada com sucesso.' });
  } catch (err) {
    res.status(500).json({ msg: 'Erro no servidor.', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) 
      return res.status(400).json({ msg: 'Credenciais inválidas.' });

    const ok = await bcrypt.compare(senha, usuario.senha);
    if (!ok) 
      return res.status(400).json({ msg: 'Credenciais inválidas.' });

    const token = jwt.sign(
      { id: usuario._id, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ 
      token, 
      user: { id: usuario._id, nome: usuario.nome, email: usuario.email, role: usuario.role } 
    });
  } catch (err) {
    res.status(500).json({ msg: 'Erro no servidor.', error: err.message });
  }
};

// Novo: registar diretamente um admin
exports.registerAdmin = async (req, res) => {
  try {
    const { nome, email, senha, secret } = req.body;
    if (secret !== process.env.ADMIN_REGISTER_SECRET) {
      return res.status(403).json({ msg: 'Segredo de registo inválido.' });
    }

    const existente = await Usuario.findOne({ email });
    if (existente) {
      return res.status(400).json({ msg: 'Email já registado.' });
    }

    const admin = new Usuario({ nome, email, senha, role: 'admin' });
    await admin.save();
    res.status(201).json({ msg: `Admin ${email} criado com sucesso.` });
  } catch (err) {
    res.status(500).json({ msg: 'Erro no servidor.', error: err.message });
  }
};
