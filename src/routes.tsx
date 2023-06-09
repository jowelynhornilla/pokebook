import { PokemonCards, PokemonProfile } from "pages";
import { RouteObject } from "react-router-dom";

export const ROUTES: RouteObject[] = [
  {
    path: "/",
    element: <PokemonCards />,
  },
  {
    path: "/:name",
    element: <PokemonProfile />,
  },
];
