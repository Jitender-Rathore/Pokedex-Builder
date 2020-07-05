

import React from "react";
import { useForm,useFieldArray  } from "react-hook-form";
import { withRouter } from "react-router-dom";
import "../styles/form.css";

 function AddPokemon(props) {
    const { pokemons, setPokemons } = props;
  const { register, handleSubmit, control,errors } = useForm();
 
  const { fields, append } = useFieldArray(
    {
      control,
      name: "attributes"
    }
  );


  // on submit new pokemon is added to the list and redirected to home page
  const onSubmit = data => {
      const addPokemonList = [...pokemons,data]
      setPokemons(addPokemonList)
      props.history.push(`/`);
}


//checking for unique id
const idIsUnique = (id) => {
   pokemons.find((pokemon) => {
        if(Number(pokemon.id) === Number(id)){
            return false
        }
        return true;
      });
}

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>

<label htmlFor="id">Id</label>
      <input type="number" id="id" name="id" ref={register({ required: true,validate: idIsUnique})} />
      {errors.id && errors.id.type === "required" && <span>This is required</span>}
      {errors.id && errors.id.type === "validate" && <span>id should be unique</span>}
      <label htmlFor="englishName">English Name</label>
      <input type="text" id="englishName" name="name.english" ref={register({ required: true, maxLength: 30 })} />
      <label htmlFor="japaneseName">Japanese Name</label>
      <input type="text" id="japaneseName" name="name.japanese" ref={register({ required: true, maxLength: 30 })} />
      <label htmlFor="chineseName">Chinese Name</label>
      <input type="text" id="chineseName" name="name.chinese" ref={register({ required: true, maxLength: 30 })} />

      <label htmlFor="Attack">Attack</label>
      <input type="number" id="Attack" name="base.Attack" ref={register({ required: true, maxLength: 100 })} />
     
      <label htmlFor="Defense">Defense</label>
      <input type="number" id="Defense" name="base.Defense" ref={register({ required: true, maxLength: 100 })} />
      
      <label htmlFor="Sp. Attack">Special Attack</label>
      <input type="number" id="Sp. Attack" name="base.Sp Attack" ref={register({ required: true, maxLength: 100 })} />
      
      <label htmlFor="Sp. Defense">Special Defense</label>
      <input type="number" id="Sp. Defense" name="base.Sp Defense" ref={register({ required: true, maxLength: 100 })} />
      
      <label htmlFor="speed">Speed</label>
      <input type="number" id="speed" name="base.speed" ref={register({ required: true, maxLength: 100 })} />
      
      <label htmlFor="HP">HP</label>
      <input type="number" id="HP" name="base.HP" ref={register({ required: true, maxLength: 100 })} />
     
      <label htmlFor="type">Pokemon Type</label>
      <input type="text" id="type" name="type" ref={register({ required: true, maxLength: 100 })} />

      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <input
                name={`attributes[${index}].key`} 
                ref={register()}
              />
             <input
                name={`attributes[${index}].value`} 
                ref={register()}
              />
              
            </li>
          );
        })}
      </ul>
      <section>

          {/*button for adding extra attributes  */}
        <button
          type="button"
          onClick={() => {
            append({ key: "", value: "" });
          }}
        >
          Add Attributes
        </button>
        </section>
     
     
      <input type="submit" />
    </form>
  );
}

export default withRouter(AddPokemon);