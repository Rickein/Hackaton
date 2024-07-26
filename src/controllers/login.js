// const { consultaTipoUsuarios } = require("../querys/tipo_suario");
// const { consultaUsuarios } = require("../querys/usuarios");

async function telaInicial(req, res) {
    res.render('login');
}

module.exports = {
    telaInicial
}