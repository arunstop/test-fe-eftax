"use client";

import Image from "next/image";
import {
  Box,
  Button,
  Container,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { useEffect, useState } from "react";
// import styles from './page.module.css'

export interface TPokemonSearchResult {
  count: number;
  next: string;
  previous: null;
  results: { name: string; url: string }[];
}

export default function Home() {
  const [pokemons, setPokemons] = useState<TPokemonSearchResult | null>();
  const loadData = async () => {
    const loadPokemons = await fetch("https://pokeapi.co/api/v2/pokemon");
    // proceed when ok only
    if (!loadPokemons.ok) return;
    // set the pokemons data
    // setPokemons((await pokemons.json()) as unknown as number);
    const newPokemons =
      (await loadPokemons.json()) as unknown as TPokemonSearchResult;
    setPokemons(newPokemons);
  };

  useEffect(() => {
    loadData();
    return () => {};
  });

  return (
    <main>
      <Container maxWidth="lg" sx={{ height: "100vh", display: "flex" }}>
        <Box sx={{ bgcolor: "#cfe8fc", width: "100%", display: "flex" }}>
          <ImageList
            sx={{ width: "100%", height: "100%" }}
            cols={3}
            rowHeight={164}
          >
            {!pokemons
              ? "loadings..."
              : pokemons.results.map((item, idx) => (
                  <ImageListItem key={item.img}>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${
                        idx + 1
                      }.png`}
                      // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.name}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
          </ImageList>
        </Box>
      </Container>
    </main>
  );
}
