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
  Pokemons: [],
  selectedPokemon: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_POKEMON_BY_NAME:
      return { ...state, Pokemons: action.payload };
      

    case GET_POKEMONS_TYPES_QUANTITY:console.log();
    let filteredPokemonsType = [];
    
    if (action.payload === "ONE") {
      filteredPokemonsType = state.Pokemons.filter(pokemon => pokemon.type.length === 1);
    } else if (action.payload === "TWO") {
      filteredPokemonsType = state.Pokemons.filter(pokemon => pokemon.type.length === 2);
    }
  
    return { ...state, filteredPokemonsType };

    case GET_POKEMONS_TYPE:
      const filteredPokemons = [...state.Pokemons].filter((pokemon) => {
        return pokemon.type.includes(action.payload); // Verificar si el tipo está presente en el arreglo type
      });

      return { ...state, Pokemons: filteredPokemons };

    case CREATE_POKEMON:
      return { ...state, Pokemons: [...state.Pokemons, action.payload] }; // Agrega el nuevo Pokémon al arreglo existente

    case GET_POKEMONS:
      return { ...state, Pokemons: action.payload };

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
      let origin;
      if (action.payload === "A") {
        origin = [...state.Pokemons].filter(
          (element) => element.created === false
        );
      } else {
        origin = [...state.Pokemons].filter(
          (element) => element.created === true
        );
      }
      return { ...state, Pokemons: origin };
    default:
      return { ...state };
  }
};

export default rootReducer;
