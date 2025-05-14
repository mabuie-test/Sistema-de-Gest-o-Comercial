
// routes/vendaRoutes.js
const express = require('express');
const auth = require('../middleware/authMiddleware');
const {
  listar, criar, gerarRelatorio
} = require('../controllers/vendaController');

const router = express.Router();

router.get('/', auth, listar);
router.post('/', auth, criar);
// Ex.: GET /api/vendas/relatorio?formato=csv
router.get('/relatorio', auth, gerarRelatorio);

module.exports = router;
