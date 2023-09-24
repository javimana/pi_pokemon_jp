import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Form.module.css";
import { useDispatch } from "react-redux";
import { createPokemon } from "../../redux/actions";
import axios from "axios";
import validator from "./validation";

export default function Form() {
  const dispatch = useDispatch(); 
  //---------------------------------------------------------------------------------------------------
  //Inicializo el estado pokemonData con los datos vacíos
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
  //---------------------------------------------------------------------------------------------------
  
  const [availableTypes, setAvailableTypes] = useState([]); // se inicializa availableTypes con un array vacío donde voy a guardar los tipos
  const [typeSelection, setTypeSelection] = useState("one"); // el estado typeSelection se inicializa en "one" y ese valor se lo paso 
  const [errors, setErrors] = useState({});// errors es el estado que contiene un objeto con los mensajes de errores
  const [isButtonDisabled, setButtonDisabled] = useState(true); // es el estado que habilita el boton, si es true está habilitado

  // se ejecuta la petición cuando el hook useEffect monta el componente
  // cuando cargo la pagina en types viene el array con todos los tipos ---> types=['normal', 'fighting', 'flying',...]
  // realizo la petición a la url http://localhost:3001/types que trae los tipos de la api y los guarda en la bdd

  useEffect(() => {
    axios
      .get("http://localhost:3001/types")
      .then((response) => {
        const types=response.data;
        setAvailableTypes(types); // actualizo el estado de availableTypes con todos los tipos de pokemones
        console.log(types);
      })
      .catch((error) => {
        console.error("Error fetching types:", error);
      });
  }, []);
  //---------------------------------------------------------------------------------------------------
  
  const handleTypeSelectionChange = (e) => {
    setTypeSelection(e.target.value); // e.target.value trae el valor del evento, osea "one" o "two". Tambien se usa setTypeSelection para actualizar el estado de typeSelection con estos valores
    //setPokemonData({ ...pokemonData, type: [] }); // en pokemonData se vacia el array en type 
    console.log(e.target.value);
  };

  const handleTypeChangeOne = (e) => {
    console.log(e.target.value);
    pokemonData.type = [e.target.value];
    setPokemonData(pokemonData);
    console.log(pokemonData);
  };
  
  
  const handleTypeChangeTwo = (e) => {
    console.log(e.target.value);
    if (e.target.name === "FirstType") pokemonData.type[0] = e.target.value;
    if (e.target.name === "SecondType") pokemonData.type[1] = e.target.value;
    console.log(pokemonData);
  };
  
  //---------------------------------------------------------------------------------------------------

  const handlerChange = (e) => {
  const fieldName = e.target.name; //acá viene el nombre de la propiedad. Ej: name:
  const fieldValue = e.target.value; // acá viene el valor de la propiedad. Ej: "bunca"
  console.log(pokemonData);

  // Ejecutar la validación solo si el campo tiene algún valor
  // validator es la funcion que está en validation.js
  // el trim() elimina los espacios en blanco al prinicipio y final de una string
  if (fieldValue.trim() !== "") {
    const fieldErrors = validator({...pokemonData,[fieldName]: fieldValue});
    // setErrors actualiza el estado errors que es un objeto vacio, fieldErrors es un objeto con mensajes de errores 
    // o sea que va a quedar asi: errors={name:"mensaje de error"}
    setErrors({ ...errors, [fieldName]: fieldErrors[fieldName] });
  }
    setPokemonData({ ...pokemonData, [fieldName]: fieldValue });// voy actualizando el estado pokemonData con lo que escribe el usuario

    // Verificar si todos los campos están completos
    // allFieldsCompleted trae un valor booleno, true o false, y si un solo campo esta vacio o es cero devuelve "false"
    const allFieldsCompleted = Object.values(pokemonData).every((value) => {
      if (Array.isArray(value)) return value.length > 0; //si la longitud no es cero devuelve "true"
      return value !== "" && value !== 0; // si el campo no es vacio y no es cero devuelve "true"
    });

    setButtonDisabled(!allFieldsCompleted);//cambia el estado según lo que traiga allFieldsCompleted
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos
    const formErrors = validator(pokemonData); // trae el objeto con los mensajes de los errores

    // Deshabilitar el botón después de crear el Pokémon
    setButtonDisabled(true);

    // si su longitud es cero no tiene errores
    if (Object.keys(formErrors).length === 0) {
      dispatch(createPokemon(pokemonData));
      
      window.alert("Pokemon creado con éxito");
      // window.location.reload();
      
      setTypeSelection("one")
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
            value={typeSelection} // el valor del select viene del typeSelection con "one"
            onChange={handleTypeSelectionChange} // onChange es un evento se dispara cuando cambia el select
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
              {availableTypes.map((type) => (<option key={type} value={type}> {type}</option>))}
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
          {errors.defense && (<p className={style.errorText}>{errors.defense}</p>)}
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
