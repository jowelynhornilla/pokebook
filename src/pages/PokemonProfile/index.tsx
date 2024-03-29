import cn from "classnames";
import { Bar, Loader } from "components";
import { Badge } from "components/Badge";
import {
  PokemonTypeBgColorMap,
  PokemonTypeTextColorMap,
} from "constants/index";
import { usePromise } from "hooks/usePromise";
import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import PokemonService from "services/pokemon";
import { Pokemon } from "types/pokemon";

export const dataElementNames = {
  container: "container",
  name: "name",
  type: "type",
  image: "image",
  stats: "stats",
  stat: "stat",
  loader: "loader",
};

export const PokemonProfile = () => {
  const { name } = useParams();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const pokemonApi = usePromise<string, Pokemon>({
    promiseFunction: async (name) => {
      const response = await PokemonService.get({
        name,
      });
      return response.data;
    },
  });

  useEffect(() => {
    pokemonApi.call(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const pokemonDetails = useMemo(() => pokemonApi.value, [pokemonApi.value]);

  const pokemonTypeColor = useMemo(() => {
    const type = pokemonDetails?.types?.[0]?.type?.name;

    return {
      bg: type != null ? `${PokemonTypeBgColorMap[type]}` : "",
      text: type != null ? `${PokemonTypeTextColorMap[type]}` : "",
    };
  }, [pokemonDetails]);

  const handlePreviousPage = () => {
    navigate({
      pathname: "/",
      search: `?${searchParams}`,
    });
  };

  return (
    <div
      className="h-full flex flex-col md:flex-row p-10 ml-auto mr-auto overflow-y-auto"
      data-testid={dataElementNames.container}
    >
      {pokemonApi.pending && (
        <Loader dataElementName={dataElementNames.loader} />
      )}
      {pokemonApi.fulfilled && (
        <>
          {" "}
          <div className="flex flex-col grow">
            <div
              className="group cursor-pointer float-left mb-5"
              onClick={handlePreviousPage}
            >
              <div className="group-hover:animate-bounce-x flex items-center gap-2 text-md font-bold text-slate-600">
                <img
                  src="/chevron-up.svg"
                  className="w-5 -rotate-90"
                  alt="Previous page"
                />
                Previous
              </div>
            </div>
            <div className="space-y-5">
              <div
                className={cn(
                  "capitalize text-4xl md:text-6xl font-bold text-slate-600 truncate",
                  pokemonTypeColor.text
                )}
                data-testid={dataElementNames.name}
              >
                {pokemonDetails?.name}
              </div>
              <div>
                <div className="flex gap-2">
                  {pokemonDetails?.types?.map((type, index) => (
                    <Badge
                      key={`${index}-${type.slot}`}
                      className={cn(
                        "capitalize text-white text-sm",
                        PokemonTypeBgColorMap[type.type.name]
                      )}
                      dataElementName={dataElementNames.type}
                    >
                      {type.type.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex bg-transparent items-center justify-center grow">
              <img
                className={cn("h-2/3 md:p-5", {
                  "animate-spin h-1/4": pokemonApi.pending,
                })}
                src={
                  pokemonApi.fulfilled
                    ? `${pokemonDetails?.sprites?.other?.dream_world?.front_default}`
                    : "/pokeball.svg"
                }
                alt={pokemonDetails?.name}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "/pokeball.svg";
                }}
                data-testid={dataElementNames.image}
              />
            </div>
          </div>
          <div className="bg-white space-y-5 md:w-7/12 md:h-full flex flex-col md:justify-center h-full items-center px-5">
            <div
              className="space-y-5 w-full md:w-2/3"
              data-testid={dataElementNames.stats}
            >
              {pokemonDetails?.stats?.map((stat, index) => (
                <React.Fragment key={`${index}-${stat.stat.name}`}>
                  <div className="capitalize text-xl font-bold">
                    {stat.stat.name}
                  </div>
                  <Bar
                    className={cn(pokemonTypeColor.bg)}
                    value={stat.base_stat}
                    dataElementName={dataElementNames.stat}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
