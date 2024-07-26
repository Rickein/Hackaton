const { Tipo_usuario } = require('../models');

async function consultaTipoUsuarios() {
  try {
    const tipos = await Tipo_usuario.findAll();
    const tiposValores = tipos.map(tipo => tipo.dataValues)
    console.log(tiposValores)
    return tipos;
  } catch (error) {
    console.error("Erro ao consultar tipos de usuários:", error);
    throw error;
  }
}

module.exports = { consultaTipoUsuarios };