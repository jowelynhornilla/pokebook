import { PokemonCard } from "components";
import { usePromise } from "hooks/usePromise";
import { useEffect } from "react";
import PokemonService from "services/pokemon";

export const PokemonCards = () => {
  const pokemonApi = usePromise({
    promiseFunction: async () => {
      const response = await PokemonService.list();
      return response.data;
    },
  });

  useEffect(() => {
    pokemonApi.call();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="flex flex-wrap justify-center gap-5"></div>;
};
