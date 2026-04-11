import { extractPokemonId, getPokemonImage, getTypeColor } from "@/lib/utils";
import { PokemonBase } from "@/types/pokemon";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { SkeletonCard } from "./SkeletonCard";

interface PokemonCardProps {
  pokemon: PokemonBase;
  viewMode: "grid" | "list";
}

export function PokemonCard({ pokemon, viewMode }: PokemonCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const id = extractPokemonId(pokemon.url);
  const imageUrl = getPokemonImage(id);

  if (viewMode === "list") {
    return (
      <div className="relative w-full">
        {!isLoaded && (
          <div className="absolute inset-0 z-10 w-full h-full">
            <SkeletonCard viewMode="list" />
          </div>
        )}
        <div
          className={cn(
            "flex items-center gap-6 p-4 rounded-xl border border-border/50 bg-card hover:bg-accent/5 transition-all group hover:border-primary/20",
            !isLoaded && "invisible opacity-0",
          )}
        >
          <div className="h-24 w-24 relative bg-secondary rounded-xl shrink-0 overflow-hidden flex items-center justify-center p-3 shadow-inner">
            <img
              src={imageUrl}
              alt={pokemon.name}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-muted-foreground font-outfit tracking-widest border border-border/50 bg-secondary/50 px-2 py-0.5 rounded-full">
                #{id.padStart(4, "0")}
              </span>
              <div className="flex gap-1">
                {pokemon.types?.map((t) => (
                  <span
                    key={t.type.name}
                    className={cn(
                      "text-[9px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded border leading-none font-outfit",
                      getTypeColor(t.type.name),
                    )}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>
            <h3 className="capitalize font-bold text-xl mb-2 font-outfit text-foreground group-hover:text-primary transition-colors">
              {pokemon.name}
            </h3>

            <div className="flex gap-4 text-xs text-muted-foreground font-medium border-t border-border/30 pt-2">
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-widest opacity-60">
                  Height
                </span>
                <span className="text-foreground">
                  {pokemon.height ? pokemon.height / 10 : "--"}m
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-widest opacity-60">
                  Weight
                </span>
                <span className="text-foreground">
                  {pokemon.weight ? pokemon.weight / 10 : "--"}kg
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-widest opacity-60">
                  EXP
                </span>
                <span className="text-foreground">
                  {pokemon.base_experience || "--"}
                </span>
              </div>
            </div>
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
      <div
        className={cn(
          "flex flex-col h-full rounded-2xl border border-border/50 bg-card overflow-hidden hover:shadow-lg transition-all hover:scale-[1.02] group glass",
          !isLoaded && "invisible opacity-0",
        )}
      >
        <div className="h-40 w-full relative bg-secondary/30 flex items-center justify-center p-6">
          <span className="absolute top-3 right-3 px-2 py-1 text-[10px] font-bold text-foreground/80 bg-background/80 backdrop-blur-md rounded-full shadow-sm border border-black/5 dark:border-white/10 font-outfit tracking-widest z-10 leading-none">
            #{id.padStart(4, "0")}
          </span>
          <img
            src={imageUrl}
            alt={pokemon.name}
            className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
          />
        </div>
        <div className="p-4 bg-background flex-1 flex flex-col gap-2">
          <h3 className="capitalize font-semibold text-lg text-center font-outfit group-hover:text-primary transition-colors">
            {pokemon.name}
          </h3>
          <div className="flex flex-wrap justify-center gap-1">
            {pokemon.types?.map((t) => (
              <span
                key={t.type.name}
                className={cn(
                  "text-[8px] font-bold uppercase tracking-tighter px-1.5 py-0.5 rounded border leading-none font-outfit",
                  getTypeColor(t.type.name),
                )}
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
