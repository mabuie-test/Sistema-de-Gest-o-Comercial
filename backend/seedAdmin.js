// seedAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const Usuario = require('./models/Usuario');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✔ Ligado ao MongoDB');

    const emailAdmin    = process.env.ADMIN_EMAIL;
    const senhaAdmin    = process.env.ADMIN_PASSWORD;
    const nomeAdmin     = process.env.ADMIN_NAME || 'Administrador';

    if (!emailAdmin || !senhaAdmin) {
      console.error('❌ Defina as variáveis ADMIN_EMAIL e ADMIN_PASSWORD no .env');
      process.exit(1);
    }

    let admin = await Usuario.findOne({ email: emailAdmin });
    if (admin) {
      console.log(`ℹ️  Admin já existe: ${emailAdmin}`);
    } else {
      admin = new Usuario({
        nome: nomeAdmin,
        email: emailAdmin,
        senha: senhaAdmin,
        role: 'admin'
      });
      await admin.save();
      console.log(`✔ Admin criado: ${emailAdmin}`);
    }
  } catch (err) {
    console.error('❌ Erro no seedAdmin:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
