//requerimos el modelo Pokemons
const { Op } = require("sequelize");
const { Pokemons, Type } = require("../db");
const axios = require("axios");
//-----------------------------------------------------------------------------------------------------------------------------
const siluetas = [
  "https://w7.pngwing.com/pngs/735/676/png-transparent-pikachu-silhouette.png",
  "https://w7.pngwing.com/pngs/483/907/png-transparent-pokemon-black-white-silhouette-pokemon-go-ash-ketchum-silhouette-horse-mammal-animals.png",
  "https://e7.pngegg.com/pngimages/589/55/png-clipart-pokemon-x-and-y-pancham-pokemon-universe-evolution-sombra-mammal-cat-like-mammal.png",
  "https://e7.pngegg.com/pngimages/287/413/png-clipart-pokemon-sun-and-moon-silhouette-pikachu-pokemon-go-silhouette-mammal-animals.png",
  "https://e7.pngegg.com/pngimages/908/442/png-clipart-dratini-pokemon-go-silhouette-dragonite-pokemon-go-cdr-cat-like-mammal.png",
  "https://e7.pngegg.com/pngimages/794/778/png-clipart-pokemon-quest-pokemon-sun-and-moon-pokemon-go-hitmonchan-hitmonchan-hand-monochrome.png",
  "https://e7.pngegg.com/pngimages/376/859/png-clipart-pokemon-pikachu-silhouette-drawing-pikachu-child-hand.png",
  "https://e7.pngegg.com/pngimages/237/219/png-clipart-pokemon-go-vulpix-umbreon-silhouette-pixel-art-pokemon-pikachu-carnivoran-hand.png",
  "https://www.pngfind.com/pngs/m/537-5379851_pokemon-silhouette-at-getdrawings-pokemon-silhouette-hd-png.png",
  "https://img1.pnghut.com/12/19/11/3k7KxbCQH9/silhouette-monochrome-photography-leaf-fictional-character-sharpedo.jpg",
];

//-----------------------------------------------------------------------------------------------------------------------------
// creamos la función async que crea un pokemon
const createPokemon = async (
  name,
  type,
  hp,
  attack,
  defense,
  speed,
  height,
  weight
) => {
  function getRandomInteger() {
    //funcion que retorna un numero del 0 al 9
    return Math.floor(Math.random() * 10);
  }
  console.log(getRandomInteger());
  const imageUrl = siluetas[getRandomInteger()]; //guarda una url de una imagen


  const existingPokemon = await Pokemons.findOne({
    where: {
      name: { [Op.iLike]: name } // Op.iLike es para búsqueda 
    }
  });
  
  console.log(existingPokemon);
  
  if (existingPokemon) {
    throw new Error("¡Ya existe un Pokémon con ese nombre!");
  }
  

  //el método Pokemons.create me devuelve una promesa por eso le hago await
  const newPokemon = await Pokemons.create({
    name,
    image: imageUrl,
    type,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
  });
  return newPokemon;
};
//-----------------------------------------------------------------------------------------------------------------------------
// función async que me devuelve la info de un pokemon por id evaluando si el parámetro source que me indica si lo
// tiene que buscar en la api o en la bdd
const getPokemonById = async (idPokemon, source) => {
  if (source === "api") {
    all = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`))
      .data;
    // console.log(all);
    const { id, name, sprites, types, stats, height, weight } = all;
    pokemon = {
      id: id,
      name: name,
      image: sprites.other.home.front_default,
      type: types.map((e) => e.type.name),
      hp: stats[0].base_stat,
      attack: stats[1].base_stat,
      defense: stats[2].base_stat,
      speed: stats[5].base_stat,
      height: height,
      weight: weight,
    };
  } else pokemon = await Pokemons.findByPk(idPokemon);
  return pokemon;
};
//-----------------------------------------------------------------------------------------------------------------------------
// función async que me trae los 40 pokemones junto con los que están en la base de datos
const getFortyPokemons = async () => {
  const databasePokemons = await Pokemons.findAll();

  // const all = (await axios.get("https://pokeapi.co/api/v2/pokemon?limit=41&offset=0")).data;//arreglo con los names y las url

  // const allUrls = all.results.map((result) => result.url);//mapeo all.url donde están todas las url de los 40 pokemones

  let allUrls = [];

  // Usar un bucle for para generar las URLs y agregarlas al array
  for (let i = 1; i <= 40; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    allUrls.push(url);
  }

  const allPromises = allUrls.map(getPokemonByIdUrl); //con el map ejecuto la función para cada url y allPromises será un array de promesas
  const allPokemons = await Promise.all(allPromises); // uso Promise.all para devolver todas las promesas resueltas en el arreglo allPokemons
  return [...allPokemons, ...databasePokemons];
};
//-----------------------------------------------------------------------------------------------------------------------------
// función async que me devuelve la info un pokemon pasándole por parámetro una url de la api
const getPokemonByIdUrl = async (url) => {
  all = (await axios.get(url)).data;
  const { id, name, sprites, types, stats, height, weight } = all;
  pokemon = {
    id: id,
    name: name,
    image: sprites.other.home.front_default,
    type: types.map((el) => el.type.name),
    hp: stats[0].base_stat,
    attack: stats[1].base_stat,
    defense: stats[2].base_stat,
    speed: stats[5].base_stat,
    height: height,
    weight: weight,
    created: false,
  };
  return pokemon;
};
//-----------------------------------------------------------------------------------------------------------------------------
// función async que busca por coincidencia de letra el nombre en la api y en la bdd
const searchPokemonByName = async (name) => {
  const databasePokemons = await Pokemons.findAll({
    where: {
      name: { [Op.iLike]: `%${name}%` },
    },
  });

  // const all = (await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40&offset=0")).data;//arreglo con los names y las url
  // const allUrls = all.results.map((result) => result.url);//mapeo all.url donde están todas las url de los n pokemones

  let allUrls = [];

  // Usar un for for para generar las URLs y agregarlas al array
  for (let i = 1; i <= 40; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    allUrls.push(url);
  }

  const allPromises = allUrls.map(getPokemonByIdUrl); //con el map ejecuto la función para cada url y allPromises será un array de promesas
  const allPokemons = await Promise.all(allPromises); // uso Promise.all para devolver todas las promesas resueltas en el arreglo allPokemons
  const filteredPokemons = allPokemons.filter((pokemon) =>
    pokemon.name.toLocaleLowerCase().includes(name.toLowerCase())
  ); //bsucamos en el arreglo name
  return [...databasePokemons, ...filteredPokemons];
};
//-----------------------------------------------------------------------------------------------------------------------------
//función async que crea todos los typos de pokemones que vienen de la api en la bdd, especificamente en la tabla Type
const getAllTypes = async () => {
  const allArray = (await axios.get("https://pokeapi.co/api/v2/type")).data;
  const allTypesArray = allArray.results.map((e) => e.name);
  console.log(allTypesArray);
  // const createdTypes = await Type.bulkCreate(allTypesArray.map(name=>({name})));
  // return createdTypes;
  return allTypesArray;
};
//-----------------------------------------------------------------------------------------------------------------------------

module.exports = {
  createPokemon,
  getPokemonById,
  searchPokemonByName,
  getFortyPokemons,
  getAllTypes,
};
// los metodos de los modelos siempre me dan promesas
// la ejecucion de una función async me da una promesa
// async await está basado en promesas
