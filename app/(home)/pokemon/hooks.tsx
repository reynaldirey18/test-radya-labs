import { getPokemonList } from "./services";
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
