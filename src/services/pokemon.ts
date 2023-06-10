import axios from "axios";
import { POKEAPI_URL } from "constants/config";
import {
  GetParams,
  GetResponse,
  ListParams,
  ListResponse,
} from "./pokemon.types";

const list = (params?: ListParams | null) => {
  return axios.get<ListResponse>(`${POKEAPI_URL}/pokemon`, {
    params,
  });
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
