import { Loader, PokemonCard } from "components";
import { Pagination } from "components/Pagination/Pagination";
import { usePromise } from "hooks/usePromise";
import { useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import PokemonService from "services/pokemon";
import { ListParams, ListResponse } from "services/types/pokemon.types";

const DEFAULT_SIZE = 10;

const PAGE_SIZES = [5, 10, 25, 50];

export const PokemonCards = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [page, setPage] = useState<number>(
    Math.max(Number(searchParams.get("page")), 1)
  );
  const [pageSize, setPageSize] = useState<number>(
    Math.max(Number(searchParams.get("pageSize")), DEFAULT_SIZE)
  );

  const pokemonApi = usePromise<ListParams, ListResponse>({
    promiseFunction: async (params) => {
      const response = await PokemonService.list(params);
      return response.data;
    },
  });

  useEffect(() => {
    pokemonApi.call({
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  useEffect(() => {
    if (pokemonApi.fulfilled && !pokemonApi.value?.results?.length) {
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonApi.fulfilled]);

  return (
    <div className="grid grid-rows-1 h-full pt-5 bg-slate-100">
      {pokemonApi.pending && <Loader />}
      {pokemonApi.fulfilled && (
        <>
          <div className=" flex flex-wrap justify-center gap-5 grow overflow-y-auto">
            {pokemonApi?.value?.results.map((pokemon, index) => (
              <PokemonCard
                key={`${index}-${pokemon.name}`}
                name={pokemon.name}
                onClick={(name) => {
                  navigate({
                    pathname: `/${name}`,
                    search: `?${createSearchParams([
                      ["page", `${page}`],
                      ["pageSize", `${pageSize}`],
                    ])}`,
                  });
                }}
              />
            ))}
          </div>
          <div className="py-5 relative bg-white">
            <Pagination
              onPageChange={(page) => setPage(page || 1)}
              totalCount={pokemonApi.value?.count}
              currentPage={page}
              pageSize={pageSize}
            />
            <div className="w-fit ml-auto mr-auto mt-5 text-center md:mt-0 md:absolute right-10 top-4 flex items-center gap-2">
              <label
                htmlFor="pageSize"
                className="text-sm font-bold text-slate-500"
              >
                Page Size
              </label>
              <select
                id="pageSize"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fire focus:border-fire block p-2.5 py-1"
                onChange={(event) => setPageSize(Number(event.target.value))}
                defaultValue={pageSize}
              >
                {PAGE_SIZES.map((size, index) => (
                  <option key={`${index}-${size}`} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
