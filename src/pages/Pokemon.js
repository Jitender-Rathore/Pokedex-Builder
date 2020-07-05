import React from "react";
import { Link } from "react-router-dom";
import pokemonBall from "../images/pokemon_ball.png";
import { FaShieldAlt, FaFire } from "react-icons/fa";

function Pokemon(props) {

  const { pokemons } = props;

  const pokemon = pokemons.find((pokemon) => {
    return Number(pokemon.id) === Number(props.match.params.pokemonId);
  });

  //return error if the pokemon value is empty else create pokecard and show respective attributes
  return pokemon ? (

    <div className="pokemonStats">
        {/*setting image and background of pokemon*/ }
      <div className="p-card psychic">
        <div className="character-area">
          <img
            className="character"
            alt="pokemonBall"
            src={
              pokemon.id <= 807
                ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
                : pokemonBall
            }
          />
        </div>
        
        {/*setting stats for showing type, name ,attack and defense */ }
        <div className="details">
          <h3>
            {pokemon.type[0]} {pokemon.type[1]}
          </h3>
          <h1>{pokemon.name.english}</h1>
        </div>
        <div className="base">Base</div>
        <ul className="stats">
          <li>
            <span>Attack</span>
            <span>
              <FaFire style={{ paddingLeft: "14px" }}></FaFire>
            </span>
            <h2>{pokemon.base.Attack}</h2>
          </li>
          <li>
            <span>Defence</span>
            <span>
              <FaShieldAlt style={{ paddingLeft: "14px" }}></FaShieldAlt>
            </span>
            <h2>{pokemon.base.Defense}</h2>
          </li>
        </ul>
      </div>

        
        {/*Link to update pokemon */}
      <Link to={`/pokemon/${pokemon.id}/update`}>
        <div className="updatePokeImage">
          <img className="pokeballImageUpdate" alt="" src={pokemonBall} />
          <h3> Update </h3>
        </div>
      </Link>
    </div>
  ) : (
    <div>Error</div>
  );
}

export default Pokemon;
