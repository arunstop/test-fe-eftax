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
  Grid,
  Pagination,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { usePokemon, usePokemonSearch } from "./hooks/pokemon-hook";

export default function Home() {
  const { pokemons, pagination, changePage } = usePokemon();
  const { keyword, result, setResult, setKeyword, searchPokemon, clearSearch } =
    usePokemonSearch();

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
            value={keyword}
            onChange={(ev) => setKeyword(ev.target.value)}
          />
          <Button type="submit" variant="contained">
            Search
          </Button>
        </Container>
        <Container>
          <Grid container spacing={2} my={"0px !important"}>
            {result.status !== "init" ? (
              <>
                {result.status === "empty" && (
                  <Grid item xs={12}>
                    Not found..
                  </Grid>
                )}
                {result.status === "success" && !!result.data && (
                  <Grid item xs={6} sm={4} md={3} lg={2}>
                    <a href={`/pokemon/${result.data.name}`}>
                      <ImageListItem>
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${result.data.id}.png`}
                          // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                          alt={result.data.name}
                          loading="lazy"
                          width={100}
                          height={100}
                          style={{ maxHeight: "100%", objectFit: "contain" }}
                        />
                        <ImageListItemBar
                          title={result.data.name}
                          sx={{
                            textTransform: "capitalize",
                          }}
                        />
                      </ImageListItem>
                    </a>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button onClick={() => clearSearch()} variant="contained">
                    Reset
                  </Button>
                </Grid>
              </>
            ) : (
              <>
                {!pokemons ? (
                  <Grid item xs={12}>
                    Loading pokemon...
                  </Grid>
                ) : (
                  <>
                    {pokemons.results.map((item, idx) => (
                      <Grid key={item.name} item xs={6} sm={4} md={3} lg={2}>
                        <a href={`/pokemon/${item.name}`}>
                          <ImageListItem>
                            <img
                              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${
                                idx + pagination.offset + 1
                              }.png`}
                              // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                              alt={item.name}
                              loading="lazy"
                              width={100}
                              height={100}
                              style={{
                                maxHeight: "100%",
                                objectFit: "contain",
                              }}
                            />
                            <ImageListItemBar
                              title={item.name}
                              sx={{
                                textTransform: "capitalize",
                              }}
                            />
                          </ImageListItem>
                        </a>
                      </Grid>
                    ))}
                    {JSON.stringify(pagination)}
                    {!!pagination.total && (
                      <Grid
                        item
                        xs={12}
                        sx={{ display: "grid", placeItems: "center" }}
                      >
                        <Pagination
                          count={Math.ceil(pagination.total / pagination.limit)}
                          defaultPage={Math.ceil(0 / 20 + 1)}
                          onChange={changePage}
                        />
                      </Grid>
                    )}
                  </>
                )}
              </>
            )}
          </Grid>
        </Container>
      </Container>
    </main>
  );
}
