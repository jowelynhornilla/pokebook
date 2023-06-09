// Tailwind custom colors doesn't work with concatenated keys `bg-${pokemonTypeColor}`
// https://stackoverflow.com/questions/71647859/tailwind-css-certain-custom-colors-are-not-working
export const PokemonTypeBgColorMap: Record<string, string> = {
  bug: "bg-bug",
  dragon: "bg-dragon",
  electric: "bg-electric",
  fairy: "bg-fairy",
  fighting: "bg-fighting",
  fire: "bg-fire",
  flying: "bg-flying",
  grass: "bg-grass",
  ground: "bg-ground",
  ghost: "bg-ghost",
  ice: "bg-ice",
  normal: "bg-normal",
  poison: "bg-poison",
  psychic: "bg-psychic",
  rock: "bg-rock",
  water: "bg-water",
};

export const PokemonTypeTextColorMap: Record<string, string> = {
  bug: "text-bug",
  dragon: "text-dragon",
  electric: "text-electric",
  fairy: "text-fairy",
  fighting: "text-fighting",
  fire: "text-fire",
  flying: "text-flying",
  grass: "text-grass",
  ground: "text-ground",
  ghost: "text-ghost",
  ice: "text-ice",
  normal: "text-normal",
  poison: "text-poison",
  psychic: "text-psychic",
  rock: "text-rock",
  water: "text-water",
};
