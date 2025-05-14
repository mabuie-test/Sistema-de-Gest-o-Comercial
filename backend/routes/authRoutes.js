// routes/authRoutes.js
const express = require('express');
const {
  registar,
  login,
  registerAdmin   // importar o novo controller
} = require('../controllers/authController');

const router = express.Router();

router.post('/register',       registar);
router.post('/login',          login);
router.post('/register-admin', registerAdmin);  // endpoint para criar admin

module.exports = router;
