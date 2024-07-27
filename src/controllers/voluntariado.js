async function telaInicial(req, res) {
    const usuario = req.cookies.usuario;
    if (usuario == null) {
        return res.redirect('Login');
    }
    res.render('voluntariado', { Usuario: usuario });
}

module.exports = {
    telaInicial
}