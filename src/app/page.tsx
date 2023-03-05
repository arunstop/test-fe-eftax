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
import { FormEvent, useEffect, useState } from "react";
import usePokemon from "./hooks/pokemon-hook";

export default function Home() {
  const { pokemons, searchPokemon, result, keyword, setKeyword } = usePokemon();

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const keyword = (ev.target as HTMLFormElement).keyword.value as string;
    console.log(keyword);
    searchPokemon(keyword);
  };

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
        <Container component={"form"} onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            name="keyword"
            label="Search Pokemon..."
            variant="outlined"
            defaultValue={keyword}
            onChange={(ev) => setKeyword(ev.target.value)}
          />
        </Container>
        <Container>
          <ImageList
            sx={{ width: "100%", height: "100%" }}
            cols={4}
            rowHeight={240}
          >
            {!!result && keyword ? (
              <div>123</div>
            ) : (
              <>
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
              </>
            )}
          </ImageList>
        </Container>
      </Container>
    </main>
  );
}
