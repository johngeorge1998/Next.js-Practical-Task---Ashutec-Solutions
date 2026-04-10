import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractPokemonId(url: string): string {
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1];
}

export function getPokemonImage(id: string | number): string {
  const baseUrl = process.env.NEXT_PUBLIC_POKEMON_IMAGE_BASE_URL || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';
  return `${baseUrl}/${id}.png`;
}
