import React from "react";
import { Link } from "react-router-dom";
import PokeCardsCreator from "../components/PokeCardsCreator";
import pokemonBall from "../images/pokemon_ball.png";

function Pokedex(props) {

const { pokemons, setPokemons } = props;

//state set for search ,searchresults , searchLoader , setlanguage 
const [searchTerm, setSearchTerm] = React.useState("");
const [searchResults, setSearchResults] = React.useState([]);
const [searchLoader, setSearchLoader] = React.useState(false);
const [language, setLanguage] = React.useState("english");


//handle change for search pokemons
const handleSearchChange = (event) => {
  setSearchTerm(event.target.value);
};

//handle change on language selection and setting the value
const handleLangChange = (event) => {
  setLanguage(event.target.value);
};

/*
setting the search loader to true and search the pokemons
  acc to user search input and  if the search term is  empty 
  set the results to pokemon list passed as props and then set
  the searchloader to false
*/
React.useEffect(() => {
  setSearchLoader(true);
  const timeoutID = setTimeout(function () {
    const results = searchTerm
      ? pokemons.filter((pokemon) =>
          pokemon.name.english.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : pokemons;
    setSearchResults(results);
    setSearchLoader(false);
  }, 200);

  return () => clearTimeout(timeoutID);
}, [searchTerm, pokemons]);


/* 
    remove particular pokemon and updating the setpokemons
    Takes id of the pokemon as an input , remove it from the list 
    and return the new list of pokemons
*/
function removePokemon(id) {
  const newPokemons = pokemons.filter((pokemon) => {
    return pokemon.id !== id;
  });
  setPokemons(newPokemons);
}


return (
  <>
    <div className="header lang">

        {/*Language Change Options*/ }
      <select value={language} onChange={handleLangChange}>
        <option value="english">English</option>
        <option value="japanese">Japanese</option>
        <option value="chinese">Chinese</option>
      </select>
        
        {/*Add Button Link*/ }
      <Link to="/add">
        <div className="addPokemonWrapper">
          <div className="addPokeImage">
            <img className="pokeballImage" alt="pokeBall" src={pokemonBall} />
            <h3> Add Pokemon </h3>
          </div>
        </div>
      </Link>

    </div>

    {/*Search Bar*/ }
    <div className="searchBoxWrapper">
      <div className={`searchBox ${searchLoader ? "loading" : ""}`}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    </div>

    {/*PokemonCardCreation by mapping searchresults*/ }
    <div className="App">
      {searchResults.map((pokemon) => {
        return (
          <PokeCardsCreator
            pokemon={pokemon}
            language={language}
            removePokemon={removePokemon}
            key={pokemon.id}
          />
        );
      })}
    </div>

  </>
);

}

export default Pokedex;
