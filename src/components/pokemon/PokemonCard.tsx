import { extractPokemonId, getPokemonImage } from '@/lib/utils';
import { PokemonBase } from '@/types/pokemon';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { SkeletonCard } from './SkeletonCard';

interface PokemonCardProps {
  pokemon: PokemonBase;
  viewMode: 'grid' | 'list';
}

export function PokemonCard({ pokemon, viewMode }: PokemonCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const id = extractPokemonId(pokemon.url);
  const imageUrl = getPokemonImage(id);

  if (viewMode === 'list') {
    return (
      <div className="relative w-full">
        {!isLoaded && (
          <div className="absolute inset-0 z-10 w-full h-full">
            <SkeletonCard viewMode="list" />
          </div>
        )}
        <div className={cn(
          "flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card hover:bg-accent/5 transition-colors group",
          !isLoaded && "invisible opacity-0"
        )}>
          <div className="h-16 w-16 relative bg-secondary rounded-lg shrink-0 overflow-hidden flex items-center justify-center p-2">
            <img
              src={imageUrl}
              alt={pokemon.name}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
            />
          </div>
          <div className="flex flex-col flex-1">
            <span className="inline-flex max-w-fit px-2 py-0.5 text-[10px] font-bold text-foreground/70 bg-black/5 dark:bg-white/10 rounded-full mb-1.5 font-outfit tracking-widest border border-border/50 shadow-sm leading-none">
              #{id.padStart(4, '0')}
            </span>
            <h3 className="capitalize font-semibold text-lg">{pokemon.name}</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 z-10 w-full h-full">
          <SkeletonCard viewMode="grid" />
        </div>
      )}
      <div className={cn(
        "flex flex-col h-full rounded-2xl border border-border/50 bg-card overflow-hidden hover:shadow-lg transition-all hover:scale-[1.02] group glass",
        !isLoaded && "invisible opacity-0"
      )}>
        <div className="h-40 w-full relative bg-secondary/30 flex items-center justify-center p-6">
          <span className="absolute top-3 right-3 px-2 py-1 text-[10px] font-bold text-foreground/80 bg-background/80 backdrop-blur-md rounded-full shadow-sm border border-black/5 dark:border-white/10 font-outfit tracking-widest z-10 leading-none">
            #{id.padStart(4, '0')}
          </span>
          <img
            src={imageUrl}
            alt={pokemon.name}
            className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
          />
        </div>
        <div className="p-4 bg-background flex-1">
          <h3 className="capitalize font-semibold text-lg text-center font-outfit">{pokemon.name}</h3>
        </div>
      </div>
    </div>
  );
}

