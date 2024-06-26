import axios from "axios";
import { IListPokemon } from "./types";

export async function getPokemonList({ limit, offset }: IListPokemon) {
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/pokemon`, {
      params: {
        limit,
        offset,
      },
    })
    .then((res) => res);
}

export async function getPokemonDetail(name: string) {
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/pokemon/${name}`)
    .then((res) => res);
}
