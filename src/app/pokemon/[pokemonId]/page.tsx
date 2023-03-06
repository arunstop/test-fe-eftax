import { useRouter } from "next/navigation";

export default function PagePokemonId({ params }) {
  const { pokemonId } = params;

  return <div>{pokemonId}</div>;
}
