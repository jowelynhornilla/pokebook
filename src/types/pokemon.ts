export interface Pokemon {
  abilities?: AbilitiesEntity[] | null;
  base_experience: number;
  id: number;
  is_default: boolean;
  name: string;
  order: number;
  species: Species;
  sprites: Sprites;
  stats?: Status[] | null;
  types?: Type[] | null;
  weight: number;
}

export interface AbilitiesEntity {
  ability: Species;
  is_hidden: boolean;
  slot: number;
}

export interface Species {
  name: string;
  url: string;
}

export interface Sprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  other: Other;
}
export interface Other {
  dream_world: DreamWorld;
  home: Home;
  "official-artwork": OfficialArtwork;
}
export interface DreamWorld {
  front_default: string;
  front_female?: null;
}
export interface Home {
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}
export interface OfficialArtwork {
  front_default: string;
  front_shiny: string;
}

export interface Status {
  base_stat: number;
  effort: number;
  stat: Species;
}
export interface Type {
  slot: number;
  type: Species;
}
