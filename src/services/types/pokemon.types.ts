import { Pokemon } from "types/pokemon";
import { PaginatedResponse } from "types/response";

export interface GetParams {
  name?: string | null;
}
export type GetResponse = Pokemon;

export type ListResponse = PaginatedResponse<{ name: string; url: string }[]>;
