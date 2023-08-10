const { Router } = require("express");
const pokemonsRoutes = require("./pokemonsRoutes");
const pokemonsTypesRoutes = require("./pokemonsTypesRoutes");
const pokemonsPostRoutes=require("./pokemonsPostRoutes")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const mainRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
mainRouter.use("/pokemons", pokemonsRoutes);
mainRouter.use("/types", pokemonsTypesRoutes);
mainRouter.use("/pokemons", pokemonsPostRoutes);


module.exports = mainRouter;
