import { PokemonCards } from "pages";
import { RouteObject } from "react-router-dom";

export const ROUTES: RouteObject[] = [
  {
    path: "/",
    element: <PokemonCards />,
  },
];
