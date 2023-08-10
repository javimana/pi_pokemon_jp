const { Router } = require("express");
const pokemonsPostRoutes = Router();
const pokemonsPostHandler = require("../handlers/pokemonsPostHandler");
const validate = require("../middlewares/validate");

pokemonsPostRoutes.post("/", validate, pokemonsPostHandler);

module.exports = pokemonsPostRoutes;
