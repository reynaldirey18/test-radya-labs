import { getPokemonDetail, getPokemonList } from "./services";
import { useQuery } from "@tanstack/react-query";
import { IListPokemon } from "./types";

export const useGetPokemonList = ({ limit, offset }: IListPokemon) =>
  useQuery({
    queryKey: ["pokemon-list", limit, offset],
    queryFn: async () => {
      const res = await getPokemonList({ limit, offset });

      if (res && res.data) {
        return res.data;
      } else {
        throw new Error("Failed to fetch Pokemon list");
      }
    },
  });

export const useGetPokemonDetail = (name: string) =>
  useQuery({
    queryKey: ["pokemon-source", name],
    queryFn: async () => {
      const res = await getPokemonDetail(name);

      if (res && res.data) {
        return res.data;
      }
    },
  });
