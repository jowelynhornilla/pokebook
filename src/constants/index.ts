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
