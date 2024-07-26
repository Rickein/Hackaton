const { Router } = require("express");
const router = Router()
const { telaInicial } = require("../controllers/voluntarios.js");

router.get('/', telaInicial);
module.exports = router