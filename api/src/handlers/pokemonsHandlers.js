const { getPokemonById, searchPokemonByName, getFortyPokemons} = require("../controllers/pokemonsController");
const Pokemons = require("../models/Pokemons");
const axios = require("axios");
//---------------------------------------------------------------------------------------------------------------
// función async que devuelve pokemones por conincidencia por nombre o 40 pokemones
// para buscar por nombre utiliza searchPokemonByName
// para traer los 40 pokemones utliza getFortyPokemons
const getPokemonsHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const results = name ? await searchPokemonByName(name) : await getFortyPokemons();
    const found = results.length === 0 ? "No se encontró el pokemon" : results;
    res.status(200).json(found);
    
  } catch (error) {
    res.status(400).json({error:error.message})
  }

  
};

//---------------------------------------------------------------------------------------------------------------
// Tengo que poder darme cuenta de que tipo de ID estoy hablando
// puede que llegue acá un ID que no existe


//---------------------------------------------------------------------------------------------------------------
// función async que devuelve el pokemon por idPokemon
const getIdPokemonHandler = async (req, res) => {
  const { idPokemon } = req.params;
  const source = isNaN(idPokemon) ? "bdd" : "api";
  try {
    const pokemon = await getPokemonById(idPokemon, source);
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//---------------------------------------------------------------------------------------------------------------


module.exports = {
  getPokemonsHandler,
  getIdPokemonHandler,
};
