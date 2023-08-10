import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import style from "./Form.module.css";
import { useState } from "react";
import { createPokemon } from "../../redux/actions";
import { useDispatch } from "react-redux";



export default function Form() {
  const dispatch = useDispatch();

  const [pokemonData, setPokemonData] = useState({
    name: "",
    type: [],
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
  });

  const handleChange = (e) => {

    
    if (e.target.name === "type") {
      const typeArray = e.target.value.split(",").map((type) => type.trim());
      setPokemonData({ ...pokemonData, [e.target.name]: typeArray });
    } else {
      setPokemonData({ ...pokemonData, [e.target.name]: e.target.value });
    }


  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.type);
    dispatch(createPokemon(pokemonData));
    // Reset the form after submission
    setPokemonData({
      name: "",
      type: [],
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      height: 0,
      weight: 0,
    });
  };

  return (
    <div>
      <Link to="/home">
        <button className={style.form}>Home</button>
      </Link>

      <form onSubmit={handleSubmit} className={style.centeredForm}>
        <div className={style.formGroup}>
          <label>Name</label>
          <input
            type="text"
            value={pokemonData.name}
            name="name"
            onChange={handleChange}
            className={style.formInput}
          />
        </div>

        <div className={style.formGroup}>
          <label>Type (separate with commas)</label>
          <input
            type="text"
            value={pokemonData.type}
            name="type"
            onChange={handleChange}
            className={style.formInput}
          />
        </div>

        <div className={style.formGroup}>
          <label>HP</label>
          <input
            type="number"
            value={pokemonData.hp}
            name="hp"
            onChange={handleChange}
            className={style.formInput}
            inputMode="numeric"
          />
        </div>

        <div className={style.formGroup}>
          <label>Attack</label>
          <input
            type="number"
            value={pokemonData.attack}
            name="attack"
            onChange={handleChange}
            className={style.formInput}
          />
        </div>

        <div className={style.formGroup}>
          <label>Defense</label>
          <input
            type="number"
            value={pokemonData.defense}
            name="defense"
            onChange={handleChange}
            className={style.formInput}
          />
        </div>

        <div className={style.formGroup}>
          <label>Speed</label>
          <input
            type="number"
            value={pokemonData.speed}
            name="speed"
            onChange={handleChange}
            className={style.formInput}
          />
        </div>

        <div className={style.formGroup}>
          <label>Height</label>
          <input
            type="number"
            value={pokemonData.height}
            name="height"
            step="0.1"
            onChange={handleChange}
            className={style.formInput}
          />
        </div>

        <div className={style.formGroup}>
          <label>Weight</label>
          <input
            type="number"
            value={pokemonData.weight}
            name="weight"
            step="0.1"
            onChange={handleChange}
            className={style.formInput}
          />
        </div>

        <div className={style.formGroup}>

          <button  className={style.formSubmit}>
            Create Pokemon
          </button>

        </div>


      </form>
    </div>
  );
}
