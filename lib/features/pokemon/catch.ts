import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PokemonState {
  pokemons: string[];
}

const initialState: PokemonState = {
  pokemons: [],
};

export const pokemonSlice = createSlice({
  name: "catchPokemon",
  initialState,
  reducers: {
    addPokemon: (state, action: PayloadAction<string>) => {
      state.pokemons.push(action.payload);
    },
    removePokemon: (state, action: PayloadAction<number>) => {
      state.pokemons.splice(action.payload, 1);
    },
  },
});

export const { addPokemon, removePokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;
