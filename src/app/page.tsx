"use client";

import Image from "next/image";
import {
  Box,
  Stack,
  Button,
  IconButton,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  TextField,
  Grid,
  Pagination,
  FormControl,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { usePokemon, usePokemonSearch } from "./hooks/pokemon-hook";
import PokemonDisplay from "@/components/usecases/pokemon/PokemonDisplay";
import { Icon } from "@iconify/react";

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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                sx={{
                  textAlign: { xs: "center", md: "left" },
                  fontSize: {
                    xs: "1.5rem",
                    sm: "2rem",
                    md: "2.5rem",
                    lg: "3rem",
                    xl: "4rem",
                  },
                }}
              >
                Pokemon Test EFTAX{" "}
                <Icon icon="gg:pokemon" style={{ verticalAlign: "text-top" }} />{" "}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  name="keyword"
                  label="Search Pokemon..."
                  variant="outlined"
                  value={keyword}
                  onChange={(ev) => setKeyword(ev.target.value)}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                <Button type="submit" variant="contained">
                  Search
                </Button>
              </FormControl>
              {!!(result.status !== "init") && (
                <FormControl
                  fullWidth
                  sx={{ display: { xs: "flex", md: "none" }, mt: "1rem" }}
                >
                  <Button
                    type="button"
                    variant="contained"
                    color="error"
                    onClick={() => clearSearch()}
                  >
                    Clear
                  </Button>
                </FormControl>
              )}
              <Box display="flex" sx={{ gap: "1rem" }}>
                <IconButton
                  type="submit"
                  sx={{ display: { xs: "none", md: "flex" } }}
                  size="large"
                  color="primary"
                >
                  <Icon icon="mdi:search" />
                </IconButton>
                {!!(result.status !== "init") && (
                  <IconButton
                    type="button"
                    sx={{ display: { xs: "none", md: "flex" } }}
                    size="large"
                    color="error"
                    onClick={() => clearSearch()}
                  >
                    <Icon icon="mdi:close-thick" />
                  </IconButton>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Grid container spacing={2} my={"0px !important"}>
            {result.status === "init" ? (
              <>
                {!pokemons ? (
                  <Grid item xs={12}>
                    <Alert severity="primary" icon={false}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "2rem",
                        }}
                      >
                        <CircularProgress color="primary" />
                        <Box>Loading pokemons...</Box>
                      </Box>
                    </Alert>
                  </Grid>
                ) : (
                  <>
                    {pokemons.results.map((item, idx) => (
                      <PokemonDisplay
                        key={item.name}
                        name={item.name}
                        imgUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${
                          idx + pagination.offset + 1
                        }.png`}
                      />
                    ))}
                    {!!pagination.total && (
                      <Grid
                        item
                        xs={12}
                        sx={{ display: "grid", placeItems: "center" }}
                      >
                        <Pagination
                          count={Math.ceil(pagination.total / pagination.limit)}
                          defaultPage={9}
                          page={
                            Math.ceil(pagination.offset / pagination.limit) + 1
                          }
                          color="primary"
                          onChange={changePage}
                        />
                      </Grid>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {result.status === "empty" && (
                  <Grid item xs={12}>
                    <Alert severity="warning">
                      Could not found any pokemon named `{keyword}`
                    </Alert>
                  </Grid>
                )}
                {result.status === "success" && !!result.data && (
                  <PokemonDisplay
                    name={result.data.name}
                    imgUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${result.data.id}.png`}
                  />
                )}
              </>
            )}
          </Grid>
        </Container>
      </Container>
    </main>
  );
}
