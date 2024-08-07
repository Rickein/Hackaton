const { consultaUsuarios } = require("../querys/usuarios");
async function telaInicial(req, res) {
    const usuario = req.cookies.usuario;
    if (usuario == null) {
        return res.redirect('Login');
    }
    voluntarios = await consultaUsuarios();
    res.render('voluntarios', { Usuario: usuario, Voluntarios:voluntarios });
}

module.exports = {
    telaInicial
}