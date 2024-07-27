const { Area_Atuacao } = require('../models');
const { Estado } = require('../models');
const { Ong } = require('../models');


async function consultaOngs() {
  try {
    const ongs = await Ong.findAll();
    const ongsValores = ongs.map(ongs => ongs.dataValues);
    console.log(ongsValores)
    return ongsValores;
  } catch (error) {
    console.error("Erro ao consultar usuários:", error);
    throw error;
  }
}

async function consultaAreasAtuacao() {
  try {
    const areas = await Area_Atuacao.findAll({
      attributes: ['id_Area_atuacao', 'atuacao']
    });
    return areas.map(area => area.dataValues);
  } catch (error) {
    console.error('Erro ao consultar áreas de atuação:', error);
    throw error;
  }
}

async function consultaEstados() {
  try {
    const estados = await Estado.findAll({
      attributes: ['id_estado', 'nome_estado', 'sigla_estado']
    });
    return estados.map(estado => estado.dataValues);
  } catch (error) {
    console.error('Erro ao consultar estados:', error);
    throw error;
  }
}

async function inserirOng(req, res) {
  const dados = req.body
  try {
    const resultado = await _inserirOng(dados);
    res.status(201).json({ resultado: "criado", usuario: resultado });
  } catch (error) {
    console.error("Erro ao inserir Ong:", error);
    res.status(500).json({ error: "Erro ao criar usuário." });
  }
}

async function _inserirOng(dados) {
  try {
    const novaOng = await Ong.create(dados);
    return novaOng;
  } catch (error) {
    console.error("Erro ao inserir ONG no banco de dados:", error);
    throw error;
  }
}

async function consultarOngAPI(req,res){
  try {
    const ong = await _consultarOng(req.params.id);
    console.log(ong);
    res.json(ong);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ong' });
  }
}

async function _consultarOng(idOng) {
  try {
    const voluntario = await Ong.findOne({
      where: { id_ong: idOng }
    });
    return voluntario;
  } catch (error) {
    console.error("Erro ao consultar ong no banco de dados:", error);
    throw error;
  }
}

async function consultarEstadoAPI(req,res){
  try {
    const estado = await _consultarEstado(req.params.id);
    res.json(estado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar estado' });
  }
}

async function _consultarEstado(sigla) {
  try {
    const voluntario = await Estado.findOne({
      where: { sigla_estado: sigla }
    });
    return voluntario;
  } catch (error) {
    console.error("Erro ao consultar estado no banco de dados:", error);
    throw error;
  }
}
async function consultarAreaAtuacaoAPI(req,res){
  try {
    const estado = await _consultarAreaAtuacao(req.params.id);
    res.json(estado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar estado' });
  }
}

async function _consultarAreaAtuacao(id) {
  try {
    const area = await Area_Atuacao.findOne({
      where: {id_Area_atuacao : id }
    });
    return area;
  } catch (error) {
    console.error("Erro ao consultar estado no banco de dados:", error);
    throw error;
  }
}

module.exports = {
  consultaAreasAtuacao, consultaEstados, inserirOng,consultarOngAPI,consultaOngs,consultarAreaAtuacaoAPI,consultarEstadoAPI
};

