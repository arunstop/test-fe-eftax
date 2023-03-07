"use client";
import { TPokemon } from "@/types/pokemon";
import { Box, Grid } from "@mui/material";
export default function PokemonDetailPage({ pokemon }: { pokemon: TPokemon }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h1>{pokemon.name}</h1>
      </Grid>
      <Grid item xs={12}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemon.id}.png`}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <Grid item xs={12}>
          {pokemon.height}
        </Grid>
        <Grid item xs={12}>
          {pokemon.weight}
        </Grid>
        {pokemon.stats.map((e) => (
          <Grid key={e.stat.name} item xs={12}>
            {e.stat.name} = {e.base_stat}
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <Box sx={{}}>xs=6 md=4</Box>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <Box sx={{}}>xs=6 md=4</Box>
      </Grid>
    </Grid>
  );
}
