import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemonId } from "../../redux/actions";
import { useSelector } from "react-redux";
import style from "../Detail/Detail.module.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Detail(props) {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.Pokemons); //traigo todo el array con todos los pokemones

  const { id } = useParams(); // obtengo el id pasado por params
  const index = allPokemons.findIndex((pokemon) => pokemon.id == id); //obtengo el índice del arreglo donde está el pokemon
  const pokemonSelected = allPokemons[index]; // ya tengo el objeto con el pokemon

  useEffect(() => {
    dispatch(getPokemonId(id));
  }, [dispatch, id]);

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
      <h1>Type: {pokemonSelected.type.join(", ")}</h1>
    </div>
  );
}
