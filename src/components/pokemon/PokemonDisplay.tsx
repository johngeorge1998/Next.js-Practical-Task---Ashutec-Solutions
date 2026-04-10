'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPokemon, setPage } from '@/store/pokemonSlice';
import { useEffect, useMemo, useRef, useCallback } from 'react';
import { PokemonCard } from './PokemonCard';
import { SkeletonCard } from './SkeletonCard';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const ITEMS_PER_PAGE = 20;

export function PokemonDisplay() {
  const dispatch = useAppDispatch();
  const { 
    selectedType, 
    viewMode, 
    pokemonList, 
    status, 
    page, 
    hasMore, 
    searchTerm
  } = useAppSelector((state) => state.pokemon);

  const observer = useRef<IntersectionObserver | null>(null);
  const isFetchingLock = useRef(false);

  // Handle fetching lock state
  useEffect(() => {
    if (status !== 'loading') {
      isFetchingLock.current = false;
    }
  }, [status]);

  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    if (observer.current) observer.current.disconnect();
    
    if (node) {
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore && selectedType === 'all' && !isFetchingLock.current) {
          isFetchingLock.current = true;
          dispatch(setPage(page + 1));
        }
      }, {
        rootMargin: '400px'
      });
      observer.current.observe(node);
    }
  }, [hasMore, selectedType, page, dispatch]);

  useEffect(() => {
    const promise = dispatch(fetchPokemon({ type: selectedType, page, limit: ITEMS_PER_PAGE }));
    return () => promise.abort();
  }, [dispatch, selectedType, page]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredPokemon = useMemo(() => {
    if (!searchTerm) return pokemonList;
    const lowerSearch = searchTerm.toLowerCase();
    return pokemonList.filter(p => p.name.toLowerCase().includes(lowerSearch));
  }, [pokemonList, searchTerm]);

  // Ensure scroll position resets on type or search change
  useEffect(() => {
    const scrollId = setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);

    return () => clearTimeout(scrollId);
  }, [selectedType, searchTerm]);

  return (
    <div ref={scrollContainerRef} className="flex-1 overflow-y-auto w-full p-4 md:p-8 bg-background relative flex flex-col h-full scroll-smooth">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-outfit text-2xl font-bold capitalize tracking-tight">
          {selectedType} Pokémon
        </h2>
        {status !== 'loading' && (
          <span className="text-sm font-medium text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
            {filteredPokemon.length} {filteredPokemon.length === 1 ? 'Result' : 'Results'}
          </span>
        )}
      </div>

      <div className={cn(
        "flex-1 mb-8",
        viewMode === 'grid' 
          ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 content-start" 
          : "flex flex-col gap-3"
      )}>
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((p, idx) => (
            <motion.div
              key={`${p.name}-${idx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PokemonCard pokemon={p} viewMode={viewMode} />
            </motion.div>
          ))
        ) : (
          status === 'succeeded' && (
            <div className="col-span-full h-40 flex items-center justify-center text-muted-foreground animate-in fade-in">
              No Pokémon found.
            </div>
          )
        )}
        
        {status === 'loading' && page === 0 && Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
          <div key={`skeleton-init-${idx}`} className="animate-in fade-in duration-300">
            <SkeletonCard viewMode={viewMode} />
          </div>
        ))}
        
        {status === 'loading' && page > 0 && (
          <div className="col-span-full py-8 flex items-center justify-center animate-in fade-in duration-300">
            <div className="h-8 w-8 rounded-full border-4 border-muted-foreground/20 border-t-primary animate-spin" />
          </div>
        )}

        {/* Sentinel for infinite scroll */}
        {selectedType === 'all' && hasMore && (
          <div ref={lastElementRef} className="col-span-full h-1 w-full shrink-0" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}
