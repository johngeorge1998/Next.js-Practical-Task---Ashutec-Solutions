'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTypes, setSelectedType } from '@/store/pokemonSlice';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

export function TypeSidebar() {
  const dispatch = useAppDispatch();
  const { types, selectedType, typesStatus } = useAppSelector((state) => state.pokemon);

  useEffect(() => {
    if (types.length === 0 && typesStatus === 'idle') {
      dispatch(fetchTypes());
    }
  }, [dispatch, types.length, typesStatus]);

  const handleSelectType = (type: string) => {
    if (selectedType === type) return;
    dispatch(setSelectedType(type));
  };

  return (
    <aside className="w-full md:w-64 border-r border-border/40 bg-background/50 backdrop-blur-sm h-full flex flex-col">
      <div className="p-4 md:p-6 overflow-y-auto scrollbar-hide flex-1">
        <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4 font-outfit">
          Pokémon Types
        </h2>
        <ul className="space-y-1.5 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
          <li>
            <button
              suppressHydrationWarning
              onClick={() => handleSelectType('all')}
              className={cn(
                'w-full text-left px-4 py-2 rounded-lg text-sm cursor-pointer font-medium transition-all whitespace-nowrap md:whitespace-normal',
                selectedType === 'all'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-foreground/70 hover:bg-secondary hover:text-foreground'
              )}
            >
              All Pokémon
            </button>
          </li>
          
          {types.map((type) => (
            <li key={type.name}>
              <button
                suppressHydrationWarning
                onClick={() => handleSelectType(type.name)}
                className={cn(
                  'w-full text-left px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all capitalize whitespace-nowrap md:whitespace-normal',
                  selectedType === type.name
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-foreground/70 hover:bg-secondary hover:text-foreground'
                )}
              >
                {type.name}
              </button>
            </li>
          ))}
          
          {typesStatus === 'loading' && types.length === 0 && (
             <div className="space-y-2 mt-2 w-full">
               {Array.from({ length: 12 }).map((_, i) => (
                 <div key={i} className="h-9 bg-secondary/50 rounded-lg animate-pulse w-full" />
               ))}
             </div>
          )}
        </ul>
      </div>
    </aside>
  );
}

