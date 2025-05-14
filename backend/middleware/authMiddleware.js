// middleware/authMiddleware.js
const jwt     = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ msg: 'Autenticação falhou: token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    // Verifica e extrai o payload
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    // Busca o utilizador na base de dados
    const user = await Usuario.findById(id);
    if (!user) {
      return res.status(401).json({ msg: 'Utilizador não encontrado.' });
    }

    // Define no request o id e o perfil (role)
    req.usuarioId   = user._id;
    req.usuarioRole = user.role;

    next();
  } catch (err) {
    return res.status(403).json({ msg: 'Token inválido ou expirado.' });
  }
};
