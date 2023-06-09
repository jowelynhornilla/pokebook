import { PokemonCard } from "components";
import { usePromise } from "hooks/usePromise";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PokemonService from "services/pokemon";

export const PokemonCards = () => {
  const navigate = useNavigate();

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

  return (
    <div className="mt-5 flex flex-wrap justify-center gap-5">
      {pokemonApi.fulfilled &&
        pokemonApi?.value?.results.map((pokemon, index) => (
          <PokemonCard
            key={`${index}-${pokemon.name}`}
            name={pokemon.name}
            onClick={(name) => navigate(`/${name}`)}
          />
        ))}
    </div>
  );
};
