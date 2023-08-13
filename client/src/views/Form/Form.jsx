import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Form.module.css";
import { useDispatch } from "react-redux";
import { createPokemon } from "../../redux/actions";
import axios from "axios";
import validator from "./validation";

export default function Form() {
  const dispatch = useDispatch();

  const [pokemonData, setPokemonData] = useState({
    name: "",
    type: [],
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
  });

  const [availableTypes, setAvailableTypes] = useState([]);
  const [typeSelection, setTypeSelection] = useState("one");
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then((response) => {
        const types = response.data.results.map((type) => type.name);
        setAvailableTypes(types);
      })
      .catch((error) => {
        console.error("Error fetching types:", error);
      });
  }, []);

  const handleTypeSelectionChange = (e) => {
    setTypeSelection(e.target.value);
    setPokemonData({ ...pokemonData, type: [] });
    console.log(pokemonData);
  };

  const handleTypeChangeOne = (e) => {
    console.log(e.target.value);
    pokemonData.type = [e.target.value];
    setPokemonData(pokemonData);
    console.log(pokemonData);
  };

  const handlerChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    // Ejecutar la validación solo si el campo tiene algún valor
    if (fieldValue.trim() !== "") {
      const fieldErrors = validator({
        ...pokemonData,
        [fieldName]: fieldValue,
      });
      setErrors({ ...errors, [fieldName]: fieldErrors[fieldName] });
    }

    setPokemonData({ ...pokemonData, [fieldName]: fieldValue });

    // Verificar si todos los campos están completos
    const allFieldsCompleted = Object.values(pokemonData).every((value) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== "" && value !== 0;
    });

    setButtonDisabled(!allFieldsCompleted);
  };

  const handleTypeChangeTwo = (e) => {
    console.log(e.target.value);
    if (e.target.name === "FirstType") pokemonData.type[0] = e.target.value;
    if (e.target.name === "SecondType") pokemonData.type[1] = e.target.value;
    console.log(pokemonData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos
    const formErrors = validator(pokemonData);

    // Deshabilitar el botón después de crear el Pokémon
    setButtonDisabled(true);

    if (Object.keys(formErrors).length === 0) {
      dispatch(createPokemon(pokemonData));

      window.location.reload();

      setPokemonData({
        name: "",
        type: [],
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
      });
    } else {
      alert("Por favor, complete los campos requeridos correctamente.");
    }
    window.alert("Pokemon creado con éxito");
  };

  return (
    <div>
      {/* ---------------------------------------------------------------------------------- */}
      <div className={style.Container}>
        <Link to="/home">
          <button className={style.buttonForm}>Home</button>
        </Link>
      </div>
      {/* ---------------------------------------------------------------------------------- */}
      <p className={style.title}>Formulario de Creación de un Pokemon</p>
      {/* ---------------------------------------------------------------------------------- */}
      <form onSubmit={handleSubmit} className={style.centeredForm}>
        <div className={style.formGroup}>
          <label className={style.label}>Name</label>
          <input
            type="text"
            name="name"
            onChange={handlerChange}
            className={style.formInput}
          />
        </div>
        {/* ---------------------------------------------------------------------------------- */}
        {/* ---------------------------------------------------------------------------------- */}
        <div className={style.formGroup}>
          <label className={style.label}>Number of Types</label>
          <select
            value={typeSelection}
            onChange={handleTypeSelectionChange}
            className={style.formInput}
          >
            <option value="one">One Type</option>
            <option value="two">Two Types</option>
          </select>
        </div>
        {/* ---------------------------------------------------------------------------------- */}
        {typeSelection === "one" && (
          <div className={style.formGroup}>
            <label className={style.label}>One Type</label>
            <select onChange={handleTypeChangeOne} className={style.formInput}>
              <option>Selecciona un tipo</option>
              {availableTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* ---------------------------------------------------------------------------------- */}
        {typeSelection === "two" && (
          <div className={style.formGroup}>
            <label className={style.label}>First Type</label>
            <select
              name="FirstType"
              multiple={false}
              onChange={handleTypeChangeTwo}
              className={style.formInput}
            >
              <option disabled>Selecciona un tipo</option>
              {availableTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {/* ---------------------------------------------------------------------------------- */}
            <label className={style.label}>Second Type</label>
            <select
              name="SecondType"
              multiple={false}
              onChange={handleTypeChangeTwo}
              className={style.formInput}
            >
              <option disabled>Selecciona un tipo</option>
              {availableTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* ---------------------------------------------------------------------------------- */}
        {/* ---------------------------------------------------------------------------------- */}
        <div className={style.formGroup}>
          <label className={style.label}>HP</label>
          <input
            type="number"
            value={pokemonData.hp}
            name="hp"
            onChange={handlerChange}
            className={style.formInput}
            inputMode="numeric"
          />
        </div>
        {/* ---------------------------------------------------------------------------------- */}
        <div className={style.formGroup}>
          <label className={style.label}>Attack</label>
          <input
            type="number"
            value={pokemonData.attack}
            name="attack"
            onChange={handlerChange}
            className={style.formInput}
          />
        </div>
        {/* ---------------------------------------------------------------------------------- */}
        <div className={style.formGroup}>
          <label className={style.label}>Defense</label>
          <input
            type="number"
            value={pokemonData.defense}
            name="defense"
            onChange={handlerChange}
            className={style.formInput}
          />
        </div>
        {/* ---------------------------------------------------------------------------------- */}
        <div className={style.formGroup}>
          <label className={style.label}>Speed</label>
          <input
            type="number"
            value={pokemonData.speed}
            name="speed"
            onChange={handlerChange}
            className={style.formInput}
          />
        </div>
        {/* ---------------------------------------------------------------------------------- */}
        <div className={style.formGroup}>
          <label className={style.label}>Height</label>
          <input
            type="number"
            value={pokemonData.height}
            name="height"
            step="0.1"
            onChange={handlerChange}
            className={style.formInput}
          />
        </div>
        {/* ---------------------------------------------------------------------------------- */}
        <div className={style.formGroup}>
          <label className={style.label}>Weight</label>
          <input
            type="number"
            value={pokemonData.weight}
            name="weight"
            step="0.1"
            onChange={handlerChange}
            className={style.formInput}
          />
        </div>
        {/* ---------------------------------------------------------------------------------- */}
        <div className={style.errorMessages}>
          {errors.name && <p className={style.errorText}>{errors.name}</p>}
          {errors.type && <p className={style.errorText}>{errors.type}</p>}
          {errors.hp && <p className={style.errorText}>{errors.hp}</p>}
          {errors.attack && <p className={style.errorText}>{errors.attack}</p>}
          {errors.defense && (
            <p className={style.errorText}>{errors.defense}</p>
          )}
          {errors.speed && <p className={style.errorText}>{errors.speed}</p>}
          {errors.height && <p className={style.errorText}>{errors.height}</p>}
          {errors.weight && <p className={style.errorText}>{errors.weight}</p>}
        </div>
        {/* ---------------------------------------------------------------------------------- */}
        <div className={style.buttonSubmit}>
          <button
            type="submit"
            className={`${style.formSubmit} ${style.customFormSubmit}`}
            disabled={isButtonDisabled}
          >
            Create Pokemon
          </button>
        </div>
        {/* ---------------------------------------------------------------------------------- */}
      </form>
    </div>
  );
}
