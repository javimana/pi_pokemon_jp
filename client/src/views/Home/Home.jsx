import React from "react";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import NavBar from "../../components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemons } from "../../redux/actions";
import style from "./Home.module.css";

export default function Home() {
  // cuando se monta, que haga el dispatch
  // useEffects()     useDispatch
  const [loadPokemons, setLoadPokemons] = useState(false); // inicializo el estado en false

  const dispatch = useDispatch();

  useEffect(() => {
    if (loadPokemons) dispatch(getPokemons()); // si el estado está en true ejecuta la funcion getPokemons() que trae todos los pokemones
    setLoadPokemons(false); //una vez que se ejecuta la función getPokemons con el dispatch se vuelve a poner el estado en false porque sino va a quedar en true y siempre se va a renderizar, va a quedar eun un bucle infinito si no cambia a false
  }, [dispatch, loadPokemons]); // acá va a ejecutar el dispatch si loadPokemons cambia de valor


  return (
    <div className={style.home}>
      {/* Pasa setLoadPokemons como prop */}
      <NavBar setLoadPokemons={setLoadPokemons} />
      <CardsContainer />
    </div>
  );
}
