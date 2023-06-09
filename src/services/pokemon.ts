import axios from "axios";
import { POKEAPI_URL } from "config";
import { GetParams, GetResponse, ListResponse } from "./types/pokemon.types";

const list = () => {
  return axios.get<ListResponse>(`${POKEAPI_URL}/pokemon`);
};

const get = (params: GetParams) => {
  const { name } = params;
  return axios.get<GetResponse>(`${POKEAPI_URL}/pokemon/${name}`);
};

const PokemonService = {
  list,
  get,
};

export default PokemonService;
