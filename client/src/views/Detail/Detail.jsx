// import React from "react";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { getPokemonId } from "../../redux/actions";
// import { useSelector } from "react-redux";
// import style from "../Detail/Detail.module.css";
// import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom/cjs/react-router-dom.min";

// export default function Detail() {
//   const dispatch = useDispatch();
//   const allPokemons = useSelector((state) => state.Pokemons); //traigo todo el array con todos los pokemones

//   const { id } = useParams(); // obtengo el id pasado por params
//   const index = allPokemons.findIndex((pokemon) => pokemon.id == id); //obtengo el índice del arreglo donde está el pokemon
//   const pokemonSelected = allPokemons[index]; // ya tengo el objeto con el pokemon

//   useEffect(() => {
//     dispatch(getPokemonId(id));
//   }, [dispatch, id]);

//   return (
//     <div className={style.detail}>
//       <Link to="/home">
//         <button className={style.buttondetail}>Home</button>
//       </Link>

//       <h1 className={style.name}>{pokemonSelected.name}</h1>

//       <img
//         src={pokemonSelected.image}
//         alt={pokemonSelected.name}
//         className={style.image}
//       />
//       <h1>Attack: {pokemonSelected.attack}</h1>
//       <h1>Defense: {pokemonSelected.defense}</h1>
//       <h1>Hp: {pokemonSelected.hp}</h1>
//       <h1>Height: {pokemonSelected.height}</h1>
//       <h1>Weight: {pokemonSelected.weight}</h1>
//       <h1>Type: {pokemonSelected.type.join(", ")}</h1>
//     </div>
//   );
// }

import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemonId } from "../../redux/actions";
import { useSelector } from "react-redux";
import style from "../Detail/Detail.module.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Detail() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.Pokemons); //traigo todo el array con todos los pokemones del estado global  

  const { id } = useParams(); // obtengo el id pasado por params
  const index = allPokemons.findIndex((pokemon) => String(pokemon.id) === String(id)); //obtengo el índice del arreglo donde está el pokemon
  const pokemonSelected = allPokemons[index]; // ya tengo el objeto con el pokemon

  useEffect(() => {
    dispatch(getPokemonId(id));
  }, [dispatch, id]);

  const getTypeImage = (typeName) => {
    const formattedTypeName = typeName.toLowerCase().replace(" ", "-");
    // return require("../../components/Images")
    return require(`../../components/Images/${formattedTypeName}.jpg`);
  };

  return (
    <div className={style.detail}>
      <Link to="/home">
        <button className={style.buttondetail}>Home</button>
      </Link>

      <h1 className={style.name}>{pokemonSelected.name}</h1>

      <img
        src={pokemonSelected.image}
        alt={pokemonSelected.name}
        className={style.image}
      />
      <h1>Attack: {pokemonSelected.attack}</h1>
      <h1>Defense: {pokemonSelected.defense}</h1>
      <h1>Hp: {pokemonSelected.hp}</h1>
      <h1>Height: {pokemonSelected.height}</h1>
      <h1>Weight: {pokemonSelected.weight}</h1>
      <div className={style.typeContainer}>
        {pokemonSelected.type.map((type, index) => (
          <div key={index} className={style.type}>
            <img
              src={getTypeImage(type)}
              alt={type}
              className={style.typeImage}
            />
            <p className={style.typeName}>{type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
