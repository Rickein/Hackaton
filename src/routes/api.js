const { Router } = require("express");
const router = Router()
const { autenticarLogin,inserirUsuario,deslogar } = require("../controllers/api");

router.post('/login', autenticarLogin);
router.post('/InserirUsuario',inserirUsuario);
router.post('/Logout',deslogar);
module.exports = router