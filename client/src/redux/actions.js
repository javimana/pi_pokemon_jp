import axios from "axios";
import {
  GET_POKEMONS,
  GET_POKEMON_ID,
  CLEAR_ALL,
  ORDER_POKEMONS,
  GET_ORIGIN,
  CREATE_POKEMON,
  GET_POKEMONS_TYPE,
  SEARCH_POKEMON_BY_NAME,
  GET_POKEMONS_TYPES_QUANTITY,
  ORDER_POKEMONS_ATTACK,
} from "./types";

export const getPokemonsQuantity = (value) => {
  return (dispatch) => {
    dispatch({ type: GET_POKEMONS_TYPES_QUANTITY, payload: value });
  };
};

export const searchByName = (name) => {
  return async (dispatch) => {
    const url = `http://localhost:3001/pokemons?name=${name}`;

    try {
      const response = await axios.get(url);
      const pokemons = response.data;
      if (pokemons === "No se encontró el pokemon") {
        window.alert("No se encontró el Pokémon.");
      } else {
        dispatch({ type: SEARCH_POKEMON_BY_NAME, payload: pokemons });
      }
    } catch (error) {
      window.alert("Pokémon not found or an error occurred.");
    }
  };
};

export const createPokemon = (newPokemon) => {
  return async (dispatch) => {
    const response = await axios.post(
      "http://localhost:3001/pokemons",
      newPokemon
    );
    dispatch({
      type: CREATE_POKEMON,
      payload: response.data,
    });
  };
};

export const getPokemons = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/pokemons");
    const pokemons = apiData.data;
    dispatch({ type: GET_POKEMONS, payload: pokemons });
  };
};

export const getPokemonId = (id) => {
  return async function (dispatch) {
    const apiData = await axios.get(`http://localhost:3001/pokemons/${id}`);
    const pokemon = apiData.data;
    dispatch({ type: GET_POKEMON_ID, payload: pokemon });
  };
};

export const deleteAllPokemons = () => {
  return (dispatch) => {
    const ArrayVacio = [];
    dispatch({ type: CLEAR_ALL, payload: ArrayVacio });
  };
};

export const orderPokemons = (order) => {
  return (dispatch) => {
    dispatch({ type: ORDER_POKEMONS, payload: order });
  };
};

export const orderPokemonsAttack = (attack)=>{
  return (dispatch)=>{
    dispatch({type:ORDER_POKEMONS_ATTACK, payload:attack})
  }
}

export const getOrigin = (value) => {
  return (dispatch) => {
    dispatch({ type: GET_ORIGIN, payload: value });
  };
};

export const getPokemonsType = (value) => {
  return (dispatch) => {
    dispatch({ type: GET_POKEMONS_TYPE, payload: value });
  };
};
