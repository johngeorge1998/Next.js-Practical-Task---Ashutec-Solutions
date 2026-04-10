export interface PokemonBase {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonBase[];
}

export interface PokemonTypeResponse {
  pokemon: { pokemon: PokemonBase; slot: number }[];
}

export interface PokemonTypeListResponse {
  count: number;
  results: PokemonBase[];
}

export interface PokemonDetails {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
    front_default: string;
  };
}
