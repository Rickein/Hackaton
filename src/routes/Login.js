const { Router } = require("express");
const router = Router()
const { telaInicial} = require("../controllers/login");

router.get('/', telaInicial);
module.exports = router