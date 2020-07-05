import React from "react";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import "../styles/form.css";

const UpdatePokemon = (props) => {

  const { pokemons, setPokemons } = props;
  const pokemon = pokemons.find((pokemon) => {
    return Number(pokemon.id) === Number(props.match.params.pokemonId);
  });

  
  //useform method to assign default values coming from props
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      name: {
        english: pokemon.name.english,
        japanese: pokemon.name.japanese,
        chinese: pokemon.name.chinese,
      },
      id: pokemon.id,
      base: { Attack: pokemon.base.Attack, Defense: pokemon.base.Defense },

      type: (pokemon.type.length>1)?(pokemon.type[0] + " , " + pokemon.type[1]):pokemon.type[0],
    },
  });

  /*on submit of form , data is assigned to the respective
   pokemon , new pokemon array is updated and state is changed
    and user redirected to update pokemon item page
  */
  const onSubmit = (data) => {
    const updatePokemonArray = [...pokemons];

    updatePokemonArray.map((pokemon) => {
      if (Number(pokemon.id) === Number(props.match.params.pokemonId)) {
        pokemon.name.english = data.name.english;
        pokemon.name.japanese = data.name.japanese;
        pokemon.name.chinese = data.name.chinese;
        pokemon.id = Number(data.id);
        if (data.type.includes(",")) {
          pokemon.type[0] = data.type.split(",")[0];

          pokemon.type[1] = data.type.split(",")[1];
        } else {
          pokemon.type = [data.type];
        }
        pokemon.base.Attack = data.base.Attack;
        pokemon.base.Defense = data.base.Defense;
        
      }
      return pokemon;
    });

    setPokemons(updatePokemonArray);

    props.history.push(`/pokemon/${props.match.params.pokemonId}`);
  };


  //form validation for checking whether enterd id is unique
  const idIsUnique = (id) => {
    pokemons.find((pokemon) => {
      if (Number(pokemon.id) === Number(id)) {
        return false;
      }
      return true
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="englishName">English Name</label>
      <input
        type="text"
        id="englishName"
        name="name.english"
        ref={register({ required: true, maxLength: 30 })}
      />
      <label htmlFor="japaneseName">Japanese Name</label>
      <input
        type="text"
        id="japaneseName"
        name="name.japanese"
        ref={register({ required: true, maxLength: 30 })}
      />
      <label htmlFor="chineseName">Chinese Name</label>
      <input
        type="text"
        id="chineseName"
        name="name.chinese"
        ref={register({ required: true, maxLength: 30 })}
      />
      <label htmlFor="id">Pokemon Id</label>
      <input
        type="number"
        id="id"
        name="id"
        ref={register({ required: true, validate: idIsUnique })}
      />
      {errors.id && errors.id.type === "required" && (
        <span>This is required</span>
      )}
      {errors.id && errors.id.type === "validate" && (
        <span>id should be unique</span>
      )}
      <label htmlFor="Attack">Attack</label>
      <input
        type="number"
        id="Attack"
        name="base.Attack"
        ref={register({ required: true, maxLength: 100 })}
      />

      <label htmlFor="Defense">Defense</label>
      <input
        type="number"
        id="Defense"
        name="base.Defense"
        ref={register({ required: true, maxLength: 100 })}
      />

      <label htmlFor="type">Pokemon Type</label>
      <input
        type="text"
        id="type"
        name="type"
        ref={register({ required: true, maxLength: 100 })}
      />
      <input type="submit" />
    </form>
  );
};

export default withRouter(UpdatePokemon);
