// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes    = require('./routes/authRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const vendaRoutes   = require('./routes/vendaRoutes');

const app = express();

// CORS configurado para aceitar solicitações de qualquer origem
app.use(cors({
  origin: '*',                      // aceita pedidos de todas as origens
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// Permite preflight para todas as rotas
app.options('*', cors());

app.use(express.json());

// Rotas
app.use('/api/auth',    authRoutes);
app.use('/api/produtos',produtoRoutes);
app.use('/api/vendas',  vendaRoutes);

// Conexão ao MongoDB e arranque
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✔ MongoDB ligado com sucesso');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`✔ Servidor a correr na porta ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => {
    console.error('✘ Erro ao ligar ao MongoDB:', err);
  });
