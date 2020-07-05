import React, { useEffect, useState } from "react";
import Pokedex from "./pages/Pokedex";
import Pokemon from "./pages/Pokemon";
import Header from "./components/Header";
import NoMatch from "./components/NoMatch";
import UpdatePokemon from "./pages/UpdatePokemon";
import AddPokemon from "./pages/AddPokemon";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import pokedexData from "./services/pokedex.json";
import "./styles/main.css";

/*Main App Component having route to four pages -> Home , Pokemon with id 
add pokemon and update pokemon 
Data is rendered from pokedex.json after components are mounted and pokemons state 
is updated , renders pokedex component*/ 

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    setPokemons(pokedexData);
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <Pokedex pokemons={pokemons} setPokemons={setPokemons} {...props} />
          )}
        />
        <Route
          exact
          path="/pokemon/:pokemonId"
          render={(props) => (
            <Pokemon pokemons={pokemons} setPokemons={setPokemons} {...props} />
          )}
        />
        <Route
          exact
          path="/pokemon/:pokemonId/update"
          render={(props) => (
            <UpdatePokemon
              pokemons={pokemons}
              setPokemons={setPokemons}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/add"
          render={(props) => (
            <AddPokemon
              pokemons={pokemons}
              setPokemons={setPokemons}
              {...props}
            />
          )}
        />
        <Route component={NoMatch} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
