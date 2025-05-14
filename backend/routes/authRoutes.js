// routes/authRoutes.js
const express = require('express');
const { registar, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registar);
router.post('/login', login);

module.exports = router;

