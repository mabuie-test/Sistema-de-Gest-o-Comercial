// routes/produtoRoutes.js
const express = require('express');
const auth = require('../middleware/authMiddleware');
const {
  listar, obter, criar, editar, apagar
} = require('../controllers/produtoController');

const router = express.Router();

router.get('/', auth, listar);
router.get('/:id', auth, obter);
router.post('/', auth, criar);
router.put('/:id', auth, editar);
router.delete('/:id', auth, apagar);

module.exports = router;

