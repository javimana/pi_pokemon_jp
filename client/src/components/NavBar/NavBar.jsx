import { Link } from "react-router-dom/cjs/react-router-dom";
import style from "../NavBar/NavBar.module.css";
import { deleteAllPokemons, orderPokemons, getOrigin, getPokemonsType, searchByName, getPokemonsQuantity} from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function NavBar({ setLoadPokemons }) {
  // const [clearAll, setClearAll]=useState(false)
  const [searchName,setSearchName]=useState("")
  const dispatch = useDispatch();

  // 1- hacemos clic en el botón "Pokemons" y se ejecuta el función handlePokemonsClick que cambia el estado setLoadPokemons en true
  // setLoadPokemons se pasa por props desde "home" donde está inicializado el estado, porque ahi se use el useEffect
  // 2- en "home" se usa useEffect para renderizar las tarjetas de los pokemones que vienen del objeto que tiene todos los pokemones
  
  const handlePokemonsClick=()=>{
    setLoadPokemons(true)
  }


  const handleClearAllClick=()=>{
    dispatch(deleteAllPokemons())
  }

  const handlerOrder=(event)=>{
    dispatch(orderPokemons(event.target.value))
  }

  const handlerOrigin=(event)=>{
    dispatch(getOrigin(event.target.value))
  }


  const handlerTypes=(event)=>{
    dispatch(getPokemonsType(event.target.value))
  }

//--------------------------------------------------------------
// input y botón de búsqueda por nombre
  const handleSearchChange=(event)=>{
  setSearchName(event.target.value)
  }

  const handleSearchSubmit = () => {
    console.log(searchName);
    dispatch(searchByName(searchName));
  }
  //--------------------------------------------------------------

  const handlerQuantity=(event)=>{
    dispatch(getPokemonsQuantity(event.target.value))
  }


  return (
    <div className={style.NavBar}>
      <Link to="/home">
        <button className={style.button} onClick={handlePokemonsClick}>Pokemons</button>
      </Link>
      <Link to="/home">
        <button className={style.button} onClick={handleClearAllClick}>Clear All</button>
      </Link>

      <Link to="/create">
        <button className={style.button} >Create</button>
      </Link>

      <Link to="/about">
        <button className={style.button}>About</button>
      </Link>

      <Link to="/">
        <button className={style.button}>Landing</button>
      </Link>

      <div className={style.opciones} >
        <select onChange={handlerOrder}>
          <option value="A">Upward</option>
          <option value="D">Falling</option>
        </select>
      </div>

      <div className={style.opciones} >
        <select onChange={handlerOrigin}>
          <option value="ALL">All</option>
          <option value="A">API</option>
          <option value="B">Database</option>
        </select>
      </div>

      <div className={style.opciones} >
        <select onChange={handlerTypes}>
          <option value="ALL">All</option>
          <option value="normal">normal</option>
          <option value="fighting">fighting</option>
          <option value="flying">flying</option>
          <option value="poison">poison</option>
          <option value="ground">ground</option>
          <option value="rock">rock</option>
          <option value="bug">bug</option>
          <option value="ghost">ghost</option>
          <option value="steel">steel</option>
          <option value="fire">fire</option>
          <option value="water">water</option>
          <option value="grass">grass</option>
          <option value="electric">electric</option>
          <option value="psychic">psychic</option>
          <option value="ice">ice</option>
          <option value="dragon">dragon</option>
          <option value="dark">dark</option>
          <option value="fairy">fairy</option>
          <option value="unknown">unknown</option>
          <option value="shadow">shadow</option>
        </select>
      </div>

      <div className={style.opciones} >
        <select onChange={handlerQuantity}>
          <option value="ALL">All</option>
          <option value="ONE">one type</option>
          <option value="TWO">two types</option>
        </select>
      </div>

      
      <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={handleSearchChange}
          className={style.input}
        />

      <button className={style.searchButton} type="button" onClick={handleSearchSubmit}>
          Search
       </button>     



    </div>
  );
}
