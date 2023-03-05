// import styles from './page.module.css'

import { useEffect, useState } from "react";

export interface TPokemonList {
  count: number;
  next: string;
  previous: null;
  results: TPokemonListDisplay[];
}

export interface TPokemonListDisplay {
  name: string;
  url: string;
}

export default function usePokemon() {
  const [pokemons, setPokemons] = useState<TPokemonList | null>();
  const [result, setResult] = useState<TPokemonListDisplay | null>();
  const [keyword, setKeyword] = useState("");

  const loadData = async () => {
    const loadPokemons = await fetch("https://pokeapi.co/api/v2/pokemon");
    // proceed when ok only
    if (!loadPokemons.ok) return;
    // set the pokemons data
    const newPokemons = (await loadPokemons.json()) as unknown as TPokemonList;
    setPokemons(newPokemons);
  };

  const searchPokemon = async (keyword: string) => {
    const kw = keyword.toLowerCase().trim();
    const loadPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${kw}`);

    if (!loadPokemon.ok) return setResult(null);
    setResult({
      name: kw,
      url: `/pokemon/${kw}`,
    });
  };

  useEffect(() => {
    loadData();
    return () => {};
  }, []);

  return { pokemons, setPokemons, keyword, setKeyword, result, searchPokemon };
}
