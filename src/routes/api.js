const { Router } = require("express");
const router = Router()
const { autenticarLogin,inserirUsuario,deslogar } = require("../controllers/api");
const {consultarVoluntarioAPI,alterarVoluntario,removerVoluntario} = require("../querys/usuarios");
const {inserirOng,consultarOngAPI,consultarEstadoAPI,consultarAreaAtuacaoAPI} = require("../querys/ongs");
router.post('/login', autenticarLogin);
router.post('/InserirUsuario',inserirUsuario);
router.post('/Logout',deslogar);

router.get('/Voluntarios/:id',consultarVoluntarioAPI);
router.patch('/Voluntarios/:id',alterarVoluntario);
router.delete('/Voluntarios/:id',removerVoluntario);

router.get('/estado/:id',consultarEstadoAPI);
router.get('/areaAtuacao/:id',consultarAreaAtuacaoAPI);

router.get('/Ongs/:id',consultarOngAPI);
router.post('/Ongs/InserirOrganizacao',inserirOng);
module.exports = router
