const {consultaLogin,_inserirUsuario} = require("../querys/usuarios");

async function autenticarLogin(req, res) {
    const dados = req.body;
    try {
        const resultado = await consultaLogin(dados);
        if (resultado.autenticado) {
            req.session.login = resultado.usuario.nome_completo_usuarios;
            res.cookie('usuario', req.session.login, { maxAge: 4600000 });
            res.cookie('usuarioTipo', resultado.usuario.id_tipo_usuario, { maxAge: 3600000});

            res.status(200).json({ message: "Valido", usuario: resultado.usuario });
        } else {
            res.status(200).json({ message: "Invalido" });
        }
    } catch (error) {
        console.error("Erro ao autenticar login:", error);
        res.status(500).json({ error: "Erro ao autenticar usuário." });
    }
}

async function inserirUsuario(req,res){
    const dados = req.body
    try{
        const resultado = await _inserirUsuario(dados);
        res.status(201).json({ resultado: "criado", usuario: resultado });
    } catch (error) {
        console.error("Erro ao inserir usuário:", error);
        res.status(500).json({ error: "Erro ao criar usuário." });
    }
}

async function deslogar(req, res) {
    res.cookie('usuario', null, { maxAge: 0 });
    res.cookie('usuarioTipo', null, { maxAge: 0 });
    res.status(200).json({ resultado: 'Deslogado' });
}

module.exports = {
    autenticarLogin,inserirUsuario,deslogar
}