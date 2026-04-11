import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PokemonBase } from "@/types/pokemon";

interface PokemonState {
  types: PokemonBase[];
  selectedType: string;
  pokemonList: PokemonBase[];
  status: "idle" | "loading" | "succeeded" | "failed";
  typesStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  viewMode: "grid" | "list";
  searchTerm: string;
  page: number;
  hasMore: boolean;
  totalCount: number;
}

const initialState: PokemonState = {
  types: [],
  selectedType: "all",
  pokemonList: [],
  status: "idle",
  typesStatus: "idle",
  error: null,
  viewMode: "grid",
  searchTerm: "",
  page: 0,
  hasMore: true,
  totalCount: 0,
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_POKEMON_API_BASE_URL || "https://pokeapi.co/api/v2";

export const fetchTypes = createAsyncThunk(
  "pokemon/fetchTypes",
  async (_, { signal }) => {
    const response = await fetch(`${API_BASE_URL}/type`, { signal });
    if (!response.ok) throw new Error("Failed to fetch types");
    const data = await response.json();
    return data.results as PokemonBase[];
  },
);

interface FetchPokemonArgs {
  type: string;
  page: number;
  limit?: number;
}

export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchPokemon",
  async ({ type, page, limit = 20 }: FetchPokemonArgs, { signal }) => {
    const fetchFullDetails = async (url: string) => {
      const res = await fetch(url, { signal });
      if (!res.ok) return null;
      return res.json();
    };

    if (type === "all") {
      const offset = page * limit;
      const response = await fetch(
        `${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
        { signal },
      );
      if (!response.ok) throw new Error("Failed to fetch pokemon");
      const data = await response.json();

      const detailedResults = await Promise.all(
        data.results.map(async (p: PokemonBase) => {
          const details = await fetchFullDetails(p.url);
          return { ...p, ...details };
        }),
      );

      return {
        results: detailedResults,
        count: data.count,
        isAllContent: true,
      };
    } else {
      const response = await fetch(`${API_BASE_URL}/type/${type}`, { signal });
      if (!response.ok) throw new Error("Failed to fetch pokemon by type");
      const data = await response.json();
      const mapped = data.pokemon.map((p: any) => p.pokemon);

      const detailedResults = await Promise.all(
        mapped.map(async (p: PokemonBase) => {
          const details = await fetchFullDetails(p.url);
          return { ...p, ...details };
        }),
      );

      return {
        results: detailedResults,
        count: detailedResults.length,
        isAllContent: false,
      };
    }
  },
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setSelectedType: (state, action: PayloadAction<string>) => {
      state.selectedType = action.payload;
      state.page = 0;
      state.pokemonList = [];
      state.status = "idle";
      state.searchTerm = "";
    },
    setViewMode: (state, action: PayloadAction<"grid" | "list">) => {
      state.viewMode = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTypes.pending, (state) => {
        state.typesStatus = "loading";
      })
      .addCase(fetchTypes.fulfilled, (state, action) => {
        state.typesStatus = "succeeded";
        state.types = action.payload.filter(
          (t) => !["unknown", "shadow"].includes(t.name),
        );
      })
      .addCase(fetchPokemon.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.totalCount = action.payload.count;

        if (action.payload.isAllContent) {
          if (action.meta.arg.page === 0) {
            state.pokemonList = action.payload.results;
          } else {
            // Filter out potential duplicates across pages
            const existingNames = new Set(state.pokemonList.map((p) => p.name));
            const newResults = action.payload.results.filter(
              (p: any) => !existingNames.has(p.name),
            );
            state.pokemonList = [...state.pokemonList, ...newResults];
          }
          state.hasMore = state.pokemonList.length < action.payload.count;
        } else {
          state.pokemonList = action.payload.results;
          state.hasMore = false;
        }
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        if (action.error.name !== "AbortError") {
          state.status = "failed";
          state.error = action.error.message || "Error fetching pokemon";
        }
      });
  },
});

export const { setSelectedType, setViewMode, setSearchTerm, setPage } =
  pokemonSlice.actions;
export default pokemonSlice.reducer;
