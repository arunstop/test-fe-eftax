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

export function usePokemon() {
  const [pokemons, setPokemons] = useState<TPokemonList | null>();

  const loadData = async () => {
    const loadPokemons = await fetch("https://pokeapi.co/api/v2/pokemon");
    // proceed when ok only
    if (!loadPokemons.ok) return;
    // set the pokemons data
    const newPokemons = (await loadPokemons.json()) as unknown as TPokemonList;
    setPokemons(newPokemons);
  };

  useEffect(() => {
    loadData();
    return () => {};
  }, []);

  return { pokemons, setPokemons };
}

export function usePokemonSearch() {
  const [result, setResult] = useState<{
    status: "init" | "empty" | "success";
    data: (TPokemonListDisplay & { id: number }) | null;
  }>({
    status: "init",
    data: null,
  });
  const [keyword, setKeyword] = useState("");

  const searchPokemon = async (keyword: string) => {
    const kw = keyword.toLowerCase().trim();
    if (!kw)
      return setResult({
        status: "empty",
        data: null,
      });
    const loadPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${kw}`);

    if (!loadPokemon.ok)
      return setResult({
        status: "empty",
        data: null,
      });
    const pokemon = (await loadPokemon.json()) as unknown;
    setResult({
      status: "success",
      data: {
        id: pokemon.id,
        name: kw,
        url: `/pokemon/${kw}`,
      },
    });
  };

  const clearSearch = () => {
    setResult({
      status: "init",
      data: null,
    });
    setKeyword("");
  };
  return { keyword, setKeyword, result, setResult, searchPokemon, clearSearch };
}
