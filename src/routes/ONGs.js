const { Router } = require("express");
const router = Router()
const { telaInicial} = require("../controllers/ongs.js");

router.get('/', telaInicial);
module.exports = router