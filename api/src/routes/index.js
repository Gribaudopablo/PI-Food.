const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipe = require('./routesRecipe')
const type = require('./routesType')
require('dotenv').config();

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', recipe);
router.use('/',type)



module.exports = router;
