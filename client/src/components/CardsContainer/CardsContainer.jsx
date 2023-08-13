
import React, { useState } from "react";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { useSelector } from "react-redux";

const CardsContainer = () => {
  const pokemonsPerPage = 12;
  const pokemons = useSelector((state) => state.Pokemons);
  // const allpokemons = useSelector((state) => state.allPokemons);

  const totalPages = Math.ceil(pokemons.length / pokemonsPerPage); // Total de páginas

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const paginationButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? style.activePage : ""}
        >
          {i}
        </button>
      );
    }
    return paginationButtons;
  };

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  return (
    <div>
      <div className={style.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {renderPaginationButtons()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <div className={style.cardscontainer}>
        {currentPokemons.map((pokemon) => (
          <Card
            key={pokemon.id}
            name={pokemon.name}
            id={pokemon.id}
            type0={pokemon.type[0]}
            type1={pokemon.type[1]}
            image={pokemon.image}
          />
        ))}
      </div>

      
    </div>
  );
};

export default CardsContainer;
