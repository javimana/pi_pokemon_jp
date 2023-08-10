
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
} from "./types";

const initialState = {
  allPokemons: [],
  Pokemons: [],
  selectedPokemon: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_POKEMON_BY_NAME:
      return { ...state, Pokemons: action.payload };

    case GET_POKEMONS_TYPES_QUANTITY:
      let filteredPokemonsType = [];

      if (action.payload === "ONE") {
        filteredPokemonsType = state.allPokemons.filter(
          (pokemon) => pokemon.type.length === 1
        );
      } else if (action.payload === "TWO") {
        filteredPokemonsType = state.allPokemons.filter(
          (pokemon) => pokemon.type.length === 2
        );
      }
      return {...state, Pokemons: action.payload === "ALL" ? [...state.allPokemons]: filteredPokemonsType }

      // return { ...state, Pokemons: filteredPokemonsType };

      case GET_POKEMONS_TYPE:
        const filteredPokemonsByType = state.allPokemons.filter((pokemon) => {
          return pokemon.type.includes(action.payload);
        });

        return {...state, Pokemons: action.payload === "ALL" ? [...state.allPokemons]: filteredPokemonsByType }
      
    case CREATE_POKEMON:
      return { ...state, Pokemons: [...state.Pokemons, action.payload] };

    case GET_POKEMONS:
      return { ...state, allPokemons: action.payload, Pokemons: action.payload };

    case GET_POKEMON_ID:
      return { ...state, selectedPokemon: action.payload };

    case CLEAR_ALL:
      return { ...state, Pokemons: action.payload };

    case ORDER_POKEMONS:
      const sortedPokemons = [...state.Pokemons].sort((a, b) => {
        if (action.payload === "A") {
          return a.name.localeCompare(b.name);
        } else if (action.payload === "D") {
          return b.name.localeCompare(a.name);
        }
        return 0;
      });
      return { ...state, Pokemons: sortedPokemons };

    case GET_ORIGIN:
      let origin=[];
      if (action.payload === "A") {
        origin = state.allPokemons.filter(
          (element) => element.created === false
        );
      } else {
        origin = state.allPokemons.filter(
          (element) => element.created === true
        );
      }
      return {...state, Pokemons: action.payload === "ALL" ? [...state.allPokemons]: origin }

    default:
      return { ...state };
  }
};

export default rootReducer;
