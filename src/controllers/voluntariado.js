async function telaInicial(req, res) {
    // const usuario = req.cookies.usuario;
    // if (!usuario) {
    //     return res.render('login'); 
    // }
    const usuario = "Rick"
    res.render('voluntariado', { Usuario: usuario });
}

module.exports = {
    telaInicial
}