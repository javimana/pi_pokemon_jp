const { Router } = require("express");
const pokemonsRoutes = Router();
const {
  getPokemonsHandler,
  getIdPokemonHandler,
} = require("../handlers/pokemonsHandlers");

pokemonsRoutes.get("/", getPokemonsHandler);
pokemonsRoutes.get("/:idPokemon", getIdPokemonHandler);

module.exports = pokemonsRoutes;
