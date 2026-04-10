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

export const typeColors: Record<string, string> = {
  fire: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  water: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  grass: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  electric: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  bug: 'bg-lime-500/10 text-lime-500 border-lime-500/20',
  poison: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  normal: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
  fairy: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
  ground: 'bg-amber-700/10 text-amber-700 border-amber-700/20',
  psychic: 'bg-fuchsia-500/10 text-fuchsia-500 border-fuchsia-500/20',
  fighting: 'bg-red-700/10 text-red-700 border-red-700/20',
  rock: 'bg-stone-500/10 text-stone-500 border-stone-500/20',
  ghost: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
  ice: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
  dragon: 'bg-violet-600/10 text-violet-600 border-violet-600/20',
  steel: 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20',
  flying: 'bg-sky-400/10 text-sky-500 border-sky-400/20',
  dark: 'bg-neutral-800/10 text-neutral-800 dark:text-neutral-400 border-neutral-800/20',
};

export function getTypeColor(type: string): string {
  return typeColors[type] || 'bg-secondary text-secondary-foreground border-border';
}
