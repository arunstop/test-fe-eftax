import PokemonDetailPage from "@/components/pages/pokemon/PokemonDetailPage";
import { TPokemon } from "@/types/pokemon";

export default async function PagePokemonId({
  params,
}: {
  params: { pokemonId: string };
}) {
  const { pokemonId } = params;
  const loadPokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  );
  if (!loadPokemon.ok) return <div>not found.</div>;
  const pokemon = (await loadPokemon.json()) as unknown as TPokemon;

  return <PokemonDetailPage pokemon={pokemon} />;
}
