import axios from "axios";
import { POKEAPI_URL } from "config";
import { GetParams } from "./pokemon.types";

const get = (params?: GetParams) => {
  const { name = "" } = params || {};
  return axios.get(`${POKEAPI_URL}/pokemon/${name}`);
};

const PokemonService = {
  get,
};

export default PokemonService;
