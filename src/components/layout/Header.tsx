"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Search, LayoutGrid, List } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearchTerm, setViewMode } from "@/store/pokemonSlice";
import { useEffect, useState } from "react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();
  const { searchTerm, viewMode } = useAppSelector((state) => state.pokemon);

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem("pokemonViewMode") as
      | "grid"
      | "list";
    if (savedMode === "grid" || savedMode === "list") {
      dispatch(setViewMode(savedMode));
    }
  }, [dispatch]);

  const handleViewModeToggle = (mode: "grid" | "list") => {
    dispatch(setViewMode(mode));
    localStorage.setItem("pokemonViewMode", mode);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-1">
          <img src="/pokeball.svg" alt="PokéDex" className="w-7 h-7" />
          <span className="font-outfit font-bold text-xl tracking-tight hidden md:inline-block pl-1">
            PokéDex
          </span>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4 md:gap-6 ml-4">
          <div className="relative flex-1 max-w-xs md:max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-muted-foreground opacity-50" />
            </div>
            <input
              suppressHydrationWarning
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              className="h-10 w-full rounded-full border border-input bg-background/50 pl-10 pr-4 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="flex items-center shrink-0 space-x-1 border border-border/50 rounded-full p-1 bg-secondary/20 scale-90 sm:scale-100">
            <button
              suppressHydrationWarning
              onClick={() => handleViewModeToggle("grid")}
              className={`rounded-full p-1.5 transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              suppressHydrationWarning
              onClick={() => handleViewModeToggle("list")}
              className={`rounded-full p-1.5 transition-colors cursor-pointer ${
                viewMode === "list"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors overflow-hidden scale-90 sm:scale-100"
          >
            {mounted ? (
              <>
                <Sun
                  className={`absolute h-4 w-4 transition-all duration-300 ${theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"}`}
                />
                <Moon
                  className={`absolute h-4 w-4 transition-all duration-300 ${theme === "dark" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}
                />
              </>
            ) : (
              <div className="h-4 w-4 animate-pulse bg-muted rounded-full" />
            )}
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>
      </div>
    </header>
  );
}
