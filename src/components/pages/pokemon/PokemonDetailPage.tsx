"use client";
import { TPokemon } from "@/types/pokemon";
import { Box, Grid, Container, Chip, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
export default function PokemonDetailPage({ pokemon }: { pokemon: TPokemon }) {
  return (
    <Box display={"grid"}>
      <Box display={"flex"} bgcolor="#89df12">
        <IconButton aria-label="delete" size="small">
          <ArrowBack fontSize="inherit" />
        </IconButton>
        <h1 style={{ textTransform: "capitalize" }}>{pokemon.name}</h1>
      </Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemon.id}.png`}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Grid item xs={12}>
              <h2>Stats</h2>
            </Grid>
            <Grid item xs={12}>
              Height = {pokemon.height}
            </Grid>
            <Grid item xs={12}>
              Weight = {pokemon.weight}
            </Grid>
            <Grid item xs={12}>
              Base Experience = {pokemon.base_experience}
            </Grid>
            {pokemon.stats.map((e) => (
              <Grid
                key={e.stat.name}
                item
                xs={12}
                style={{ textTransform: "capitalize" }}
              >
                {e.stat.name.replaceAll("-", " ")} = {e.base_stat}
              </Grid>
            ))}
            {pokemon.types.map((e) => (
              <Grid
                key={e.type.name}
                item
                xs={12}
                style={{ textTransform: "capitalize" }}
                spacing={2}
              >
                {e.type.name}
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Grid item xs={12}>
              <h2>Abilites</h2>
            </Grid>
            <Box sx={{ gap: "2px", display: "flex", flexWrap: "wrap" }}>
              {pokemon.abilities.map((e) => (
                <Chip
                  key={e.ability.name}
                  style={{ textTransform: "capitalize" }}
                  label={e.ability.name.replaceAll("-", " ")}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Grid item xs={12}>
              <h2>Moves</h2>
            </Grid>
            <Box sx={{ gap: "2px", display: "flex", flexWrap: "wrap" }}>
              {pokemon.moves.map((e) => (
                <Chip
                  key={e.move.name}
                  style={{ textTransform: "capitalize" }}
                  label={e.move.name.replaceAll("-", " ")}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <h2>Photos</h2>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
