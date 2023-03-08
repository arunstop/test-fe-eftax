"use client";
import { TPokemon } from "@/types/pokemon";
import {
  Box,
  Grid,
  Container,
  Chip,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import CustomChip from "@/components/common/CustomChip";
import Header from "@/components/common/Header";
import PokemonDisplay from "@/components/usecases/pokemon/PokemonDisplay";

export default function PokemonDetailPage({ pokemon }: { pokemon: TPokemon }) {
  return (
    <Box display={"grid"}>
      <Header>{pokemon.name}</Header>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ placeItems: "center", display: "grid" }}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemon.id}.png`}
              alt={pokemon.name}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <Icon icon="mdi:format-align-left" style={{ fontSize: "2rem" }} />
              <h2>Stats</h2>
            </Grid>
            <Box sx={{ gap: "4px", display: "flex", flexWrap: "wrap" }}>
              {pokemon.types.map((e) => (
                <Grid
                  key={e.type.name}
                  item
                  xs={12}
                  style={{ textTransform: "capitalize" }}
                >
                  {e.type.name}
                </Grid>
              ))}
              <CustomChip
                label="Height"
                suffix={
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: (theme) =>
                        theme.palette.primary.main + " !important",
                    }}
                  >
                    {pokemon.height}
                  </Typography>
                }
              />
              <CustomChip
                label="Base Experience"
                suffix={
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: (theme) =>
                        theme.palette.primary.main + " !important",
                    }}
                  >
                    {pokemon.base_experience}
                  </Typography>
                }
              />
              {pokemon.stats.map((e) => (
                <CustomChip
                  key={e.stat.name}
                  label={e.stat.name.replaceAll("-", " ")}
                  suffix={
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: (theme) =>
                          theme.palette.primary.main + " !important",
                      }}
                    >
                      {e.base_stat}
                    </Typography>
                  }
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <Icon icon="mdi:star-four-points" style={{ fontSize: "2rem" }} />
              <h2>Abilities</h2>
            </Grid>
            <Box sx={{ gap: "4px", display: "flex", flexWrap: "wrap" }}>
              {pokemon.abilities.map((e) => (
                <CustomChip
                  key={e.ability.name}
                  label={e.ability.name.replaceAll("-", " ")}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <Icon icon="mdi:run" style={{ fontSize: "2rem" }} />
              <h2>Moves</h2>
            </Grid>
            <Box sx={{ gap: "4px", display: "flex", flexWrap: "wrap" }}>
              {pokemon.moves.map((e) => (
                <CustomChip
                  key={e.move.name}
                  label={e.move.name.replaceAll("-", " ")}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <PokemonDisplay
                id={pokemon.id - 1 + ""}
                name="Previous"
                imgUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${
                  pokemon.id - 1
                }.png`}
              />
              <PokemonDisplay
                id={pokemon.id + 1 + ""}
                name="Next"
                imgUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${
                  pokemon.id + 1
                }.png`}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
