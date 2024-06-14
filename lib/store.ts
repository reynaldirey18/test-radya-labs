import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./features/pokemon/catch";
import storage from "redux-persist/lib/storage";

export const makeStore = () => {
  return configureStore({
    reducer: {
      catchPokemon: pokemonReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
