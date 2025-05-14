// middleware/adminMiddleware.js
module.exports = (req, res, next) => {
  if (req.usuarioRole !== 'admin') {
    return res.status(403).json({ msg: 'Acesso negado: requer perfil de administrador.' });
  }
  next();
};
