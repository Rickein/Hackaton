const { Router } = require("express");
const router = Router()
const { autenticarLogin,inserirUsuario,deslogar } = require("../controllers/api");
const {consultarVoluntarioAPI,alterarVoluntario,removerVoluntario} = require("../querys/usuarios");

router.post('/login', autenticarLogin);
router.post('/InserirUsuario',inserirUsuario);
router.post('/Logout',deslogar);

router.get('/Voluntarios/:id',consultarVoluntarioAPI);
router.patch('/Voluntarios/:id',alterarVoluntario);
router.delete('/Voluntarios/:id',removerVoluntario);
module.exports = router
