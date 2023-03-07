// import styles from './page.module.css'

import { useCallback, useEffect, useState } from "react";

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

export interface TPagination {
  total: number;
  offset: number;
  limit: number;
}
const PAGINATION_INIT = {
  total: 0,
  offset: 0,
  limit: 20,
};
export function usePokemon() {
  const [pokemons, setPokemons] = useState<TPokemonList | null>();
  const [pagination, setPagination] = useState(PAGINATION_INIT);

  const loadData = useCallback(
    async ({ limit, offset }: Omit<TPagination, "total">) => {
      const url = new URL(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit${limit}`
      );
      const loadPokemons = await fetch(url);
      // proceed when ok only
      if (!loadPokemons.ok) return;
      // set the pokemons data
      const newPokemons =
        (await loadPokemons.json()) as unknown as TPokemonList;
      setPokemons(newPokemons);
      // console.log({
      //   total: newPokemons.count,
      //   limit: Number.parseInt(url.searchParams.get("limit") || "0") || limit,
      //   offset: Number.parseInt(url.searchParams.get("offset") || "0") || offset,
      // });
      setPagination({
        total: newPokemons.count,
        limit: Number.parseInt(url.searchParams.get("limit") || "0") || limit,
        offset:
          Number.parseInt(url.searchParams.get("offset") || "0") || offset,
      });
    },
    []
  );

  const changePage = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setPagination((curr) => {
        const newOffset = (value - 1) * curr.limit;
        loadData({ limit: curr.limit, offset: newOffset });
        return {
          ...curr,
          offset: newOffset,
        };
      });
    },
    [loadData]
  );

  // init
  useEffect(() => {
    console.log("init");
    loadData({ limit: pagination.limit, offset: pagination.offset });
    return () => {};
  }, []);

  // onChange

  return { pokemons, setPokemons, pagination, changePage };
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

  const searchPokemon = useCallback(async (keyword: string) => {
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
    const pokemon = (await loadPokemon.json()) as unknown as any;
    setResult({
      status: "success",
      data: {
        id: pokemon.id,
        name: kw,
        url: `/pokemon/${kw}`,
      },
    });
  }, []);

  const clearSearch = () => {
    setResult({
      status: "init",
      data: null,
    });
    setKeyword("");
  };
  return { keyword, setKeyword, result, setResult, searchPokemon, clearSearch };
}
