import { TypeSidebar } from "@/components/layout/TypeSidebar";
import { PokemonDisplay } from "@/components/pokemon/PokemonDisplay";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row w-full h-full overflow-hidden">
      <TypeSidebar />
      <PokemonDisplay />
    </div>
  );
}
