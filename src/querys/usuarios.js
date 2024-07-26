const { Usuario } = require('../models');
const bcrypt = require('bcrypt')

async function consultaUsuarios() {
  try {
    const usuarios = await Usuario.findAll();
    const usuariosValores = usuarios.map(usuario => usuario.dataValues);
    return usuariosValores;
  } catch (error) {
    console.error("Erro ao consultar usuários:", error);
    throw error;
  }
}

async function consultaLogin(dados) {
  const { usu_email, usu_senha } = dados;

  try {
    const usuario = await Usuario.findOne({ where: { email_usuarios: usu_email } });

    if (!usuario) {
      return { autenticado: false };
    }

    const senhaValida = await bcrypt.compare(usu_senha, usuario.senha_usuarios);

    if (senhaValida) {
      return { autenticado: true, usuario: usuario.dataValues };
    } else {
      return { autenticado: false };
    }
  } catch (error) {
    console.error("Erro ao consultar login:", error);
    return { autenticado: false };
  }
}

async function _inserirUsuario(dados) {
  const saltRounds = 10;
  const senhaHash = await bcrypt.hash(dados.usu_senha, saltRounds);

  try {
    const usuario = await Usuario.create({
      nome_completo_usuarios: dados.usu_nome,
      email_usuarios: dados.usu_email,
      senha_usuarios: senhaHash,
      id_tipo_usuario: dados.usu_tipo,
      nivel_usuarios: 1
    });

    return usuario;
  } catch (error) {
    console.error("Erro ao inserir usuário no banco de dados:", error);
    throw error;
  }
}

module.exports = { consultaUsuarios, consultaLogin, _inserirUsuario };