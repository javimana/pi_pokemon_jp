const { Router } = require("express");
const pokemonsTypesRoutes = Router();
const pokemonsTypesHandler=require("../handlers/pokemonsTypesHandler")

pokemonsTypesRoutes.get("/", pokemonsTypesHandler);

module.exports = pokemonsTypesRoutes;
