const { Router } = require("express");
const router = Router()
const { telaInicial} = require("../controllers/voluntariado.js");

router.get('/', telaInicial);
module.exports = router