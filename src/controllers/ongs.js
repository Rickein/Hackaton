const { consultaAreasAtuacao,consultaEstados,consultaOngs } = require("../querys/ongs");

async function telaInicial(req, res) {
    const usuario = req.cookies.usuario;
    if (usuario == null) {
        return res.redirect('Login');
    }
    
    const areasAtuacao = await consultaAreasAtuacao();
    const estados = await consultaEstados();
    const ongs = await consultaOngs();
    res.render('ongs', { Usuario: usuario, AreasAtuacao: areasAtuacao, Estados:estados,Ongs:ongs });
}

module.exports = {
    telaInicial
}