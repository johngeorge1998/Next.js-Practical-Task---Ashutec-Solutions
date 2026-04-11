# Pokémon Explorer Task

This is a responsive Pokémon explorer application built with Next.js and Tailwind CSS. It allows users to browse through Pokémon by type, search for specific ones, and toggle between grid and list views.

The project was built as a response to a technical task requirement, focusing on clean state management with Redux (RTK) and efficient data fetching from the PokéAPI.

## Key Features

- **Dynamic Navigation**: Browse Pokémon by type using the sidebar, which is populated directly from the API.
- **Grid/List Toggles**: A simple toggle in the header permits switching between card and list layouts.
- **Infinite Scrolling**: The "All" tab uses infinite scroll for pagination to keep the experience smooth.
- **Optimized Fetching**: All API calls are linked to an AbortController. If you switch tabs quickly, ongoing requests are cancelled to avoid memory leaks and unnecessary network lag.
- **Search**: Built-in search bar to filter Pokémon by name in real-time.
- **Responsive Design**: Works on mobile, tablet, and desktop screens.
- **Theme Support**: Includes light and dark mode support.

## Project Stack

- **Framework**: Next.js (App Router)
- **State**: Redux Toolkit (RTK)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

You'll need Node.js and a package manager like `pnpm` or `npm`.

### Installation

1. **Clone or download** the source code.

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the keys provided in the email:

   ```env
   NEXT_PUBLIC_POKEMON_API_BASE_URL=...
   NEXT_PUBLIC_POKEMON_IMAGE_BASE_URL=...
   ```

4. **Start the dev server**:

   ```bash
   pnpm run dev
   ```

5. **Visit** `http://localhost:3000`.

### Building for Production

To create a production build:

```bash
pnpm run build
pnpm run start
```

## Task Checklist (Requirements Covered)

- [x] Used React function components only.
- [x] Fetched types from the `/type` endpoint.
- [x] Included "All" tab with pagination (Infinite Scroll).
- [x] Implemented type-based filtering.
- [x] Grid and List view switching.
- [x] Aborted ongoing API calls on tab switch.
- [x] Full TypeScript support.
- [x] Fully responsive design.
- [x] Integrated Redux Toolkit.

---

_Pokémon data provided by [PokéAPI](https://pokeapi.co/)._
