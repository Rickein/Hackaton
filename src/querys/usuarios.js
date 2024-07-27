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

async function consultarVoluntarioAPI(req, res) {
  try {
    const voluntario = await _consultarVoluntario(req.params.id);
    console.log(voluntario);
    res.json(voluntario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar voluntario' });
  }
}

async function _consultarVoluntario(idVoluntario) {
  try {
    const voluntario = await Usuario.findOne({
      where: { id_usuarios: idVoluntario }
    });
    return voluntario;
  } catch (error) {
    console.error("Erro ao consultar voluntário no banco de dados:", error);
    throw error;
  }
}

async function _consultarVoluntarios() {
  try {
    const voluntarios = await Usuario.findAll();
    return voluntarios;
  } catch (error) {
    console.error("Erro ao consultar voluntários no banco de dados:", error);
    throw error;
  }
}
async function alterarVoluntario(req,res){
  const dados = req.body;
  const Id = req.params.id;

  try {
    const [updatedRows] = await Usuario.update(dados, {
      where: { id_usuarios: Id }
    });

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Voluntario não encontrado.' });
    }
    const usuarioAtualizado = await Usuario.findByPk(Id);
    res.status(200).json({ message: 'alterado', usuario: usuarioAtualizado });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }

}

async function removerVoluntario(req,res){
  const { id } = req.params; 

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    await Usuario.destroy({ where: { id_usuarios: id } });

    res.status(200).json({ message: 'Usuário excluído com sucesso.' });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    res.status(500).json({ error: 'Erro ao excluir usuário.' });
  }
}


module.exports = { consultaUsuarios, consultaLogin, _inserirUsuario, consultarVoluntarioAPI,alterarVoluntario,removerVoluntario};