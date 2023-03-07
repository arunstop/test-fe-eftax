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
import Link from "next/link";
export default function PokemonDetailPage({ pokemon }: { pokemon: TPokemon }) {
  return (
    <Box display={"grid"}>
      <AppBar position={"sticky"}>
        <Toolbar sx={{ p: "0.5rem", gap: "1rem" }}>
          <Link href="/">
            <IconButton aria-label="back" size="medium">
              <Icon icon="mdi:arrow-left" style={{ fontSize: "inherit" }} />
            </IconButton>
          </Link>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ textTransform: "capitalize" }}
          >
            {pokemon.name}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ placeItems: "center", display: "grid" }}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemon.id}.png`}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Grid item xs={12}>
              <h2>Stats</h2>
            </Grid>
            <Box sx={{ gap: "4px", display: "flex", flexWrap: "wrap" }}>
              <Chip
                label="Height"
                onDelete={() => {}}
                deleteIcon={
                  <Typography
                    sx={{
                      color: (theme) =>
                        theme.palette.primary.main + " !important",
                    }}
                  >
                    {pokemon.height}
                  </Typography>
                }
              />
              <Chip
                label="Weight"
                onDelete={() => {}}
                deleteIcon={
                  <Typography
                    sx={{
                      color: (theme) =>
                        theme.palette.primary.main + " !important",
                    }}
                  >
                    {pokemon.weight}
                  </Typography>
                }
              />
              <Chip
                label="Base Experience"
                onDelete={() => {}}
                deleteIcon={
                  <Typography
                    sx={{
                      color: (theme) =>
                        theme.palette.primary.main + " !important",
                    }}
                  >
                    {pokemon.base_experience}
                  </Typography>
                }
              />
              {pokemon.stats.map((e) => (
                <Chip
                  key={e.stat.name}
                  style={{ textTransform: "capitalize" }}
                  label={e.stat.name.replaceAll("-", " ")}
                  onDelete={() => {}}
                  deleteIcon={
                    <Typography
                      sx={{
                        color: (theme) =>
                          theme.palette.primary.main + " !important",
                      }}
                    >
                      {e.base_stat}
                    </Typography>
                  }
                />
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
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Grid item xs={12}>
              <h2>Abilites</h2>
            </Grid>
            <Box sx={{ gap: "4px", display: "flex", flexWrap: "wrap" }}>
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
            <Box sx={{ gap: "4px", display: "flex", flexWrap: "wrap" }}>
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
