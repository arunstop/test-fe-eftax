"use client";

import Image from "next/image";
import {
  Box,
  Stack,
  Button,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  TextField,
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
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Container>
          <TextField
            id="outlined-basic"
            label="Search Pokemon..."
            variant="outlined"
          />
        </Container>
        <Container>
          <ImageList
            sx={{ width: "100%", height: "100%" }}
            cols={4}
            rowHeight={240}
          >
            {!pokemons
              ? "loadings..."
              : pokemons.results.map((item, idx) => (
                  <a key={item.name} href={`/pokemon/${idx + 1}`}>
                    <ImageListItem>
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${
                          idx + 1
                        }.png`}
                        // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.name}
                        loading="lazy"
                        width={100}
                        height={100}
                        style={{ maxHeight: "100%", objectFit: "contain" }}
                      />
                      <ImageListItemBar
                        title={item.name}
                        sx={{
                          textTransform: "capitalize",
                        }}
                      />
                    </ImageListItem>
                  </a>
                ))}
          </ImageList>
        </Container>
      </Container>
    </main>
  );
}
