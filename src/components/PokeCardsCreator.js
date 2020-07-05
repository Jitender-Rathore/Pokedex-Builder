import React from "react";
import { Link } from "react-router-dom";
import pokemonBall from "../images/pokemon_ball.png";

function PokemonLists({ pokemon, language, removePokemon }) {
 
    //colors set for matching the pokemon background according to its type
  const colors = {
    Fire: "#FDDFDF",
    Grass: "#DEFDE0",
    Electric: "#FCF7DE",
    Water: "#DEF3FD",
    Ground: "#f4e7da",
    Rock: "#d5d5d4",
    Fairy: "#fceaff",
    Poison: "#98d7a5",
    Bug: "#f8d5a3",
    Dragon: "#97b3e6",
    Psychic: "#eaeda1",
    Flying: "#F5F5F5",
    Fighting: "#E6E0D4",
    Normal: "#F5F5F5",
    Steel: "#F1F3F1",
    Ghost: "#FCFCFC",
    Ice: "#D0FAF6",
    Dark: "#436637",
  };

  const type = pokemon.type[0];

  return (
    <Link to={`pokemon/${pokemon.id}`}>

        {/*Pokemon delete options given if id >151  */}
      <div className="pokeball" style={{ backgroundColor: colors[type] }}>
        {pokemon.id > 151 && (
          <button
            className="close-btn"
            aria-label="Delete the pokemon by clicking here"
            onClick={(e) => {
              e.preventDefault();
              removePokemon(pokemon.id);
            }}
          ></button>
        )}

        {/* image container for pokemon , calling pokeapi to render image
        according to type , for pokemon having greater id than 807 default pokemonball
        image is provided */}
        <div className="img-container">
          <img
            className="pokeballCard"
            alt={pokemon.name.language}
            src={
              pokemon.id <= 807
                ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
                : pokemonBall
            }
          />
        </div>

            {/*pokemon name based on language */}
        <div className="info">
          <h3 className="name">{pokemon.name[language]}</h3>
        </div>
      </div>
    </Link>
  );
}

export default PokemonLists;
