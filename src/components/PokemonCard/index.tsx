import { FC, useEffect, useMemo } from "react";
import { PokemonCardProps } from "./PokemonCard.types";
import { usePromise } from "hooks/usePromise";
import PokemonService from "services/pokemon";
import { Pokemon } from "types/pokemon";
import { PokemonTypeBgColorMap } from "constants/index";
import { Badge } from "components/Badge";
import cn from "classnames";

export const PokemonCard: FC<PokemonCardProps> = ({ name, onClick, dataElementName }) => {
  const pokemonApi = usePromise<string, Pokemon>({
    promiseFunction: async (name) => {
      const response = await PokemonService.get({
        name,
      });
      return response.data;
    },
  });

  const pokemonDetails = useMemo(() => pokemonApi.value, [pokemonApi.value]);

  const pokemonTypeBgColor = useMemo(
    () =>
      pokemonDetails?.types?.[0]?.type?.name != null
        ? `${PokemonTypeBgColorMap[pokemonDetails?.types?.[0]?.type?.name]}`
        : "",
    [pokemonDetails]
  );

  const handleClick = () => {
    if (onClick) {
      onClick(name);
    }
  };

  useEffect(() => {
    pokemonApi.call(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <div
      className={cn(
        `w-full h-96 max-w-xs rounded-lg overflow-hidden shadow-md group hover:-translate-y-2 hover:shadow-lg cursor-pointer transition ease-in-out`,
        pokemonTypeBgColor
      )}
      data-testid={dataElementName}
      onClick={handleClick}
    >
      <div className=" h-full flex flex-col">
        <div className="h-12 flex bg-transparent items-center justify-center grow bg-avatar-radial from-white from-60% to-transparent to-40%">
          <img
            className={cn("h-1/2 group-hover:-translate-y-2 group-hover:scale-125 transition ease-in-out", {
              "animate-spin h-1/4": pokemonApi.pending,
            })}
            src={
              pokemonApi.fulfilled
                ? `${pokemonDetails?.sprites?.other?.dream_world.front_default}`
                : "/pokeball.svg"
            }
            alt={pokemonDetails?.name}
            onError={({ currentTarget }) => {
              console.log("err");
              currentTarget.onerror = null;
              currentTarget.src = "/pokeball.svg";
            }}
          />
        </div>
        <div className="h-1/3 bg-white p-5 space-y-5">
          <div className="capitalize text-center text-xl font-bold text-slate-600 truncate">
            {pokemonDetails?.name}
          </div>
          <div className="flex gap-2">
            {pokemonDetails?.types?.map((type, index) => (
              <Badge
                key={`${index}-${type.slot}`}
                className={cn(
                  "capitalize text-white",
                  PokemonTypeBgColorMap[type.type.name]
                )}
              >
                {type.type.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
