import { TPokemonListDisplay } from "@/types/pokemon";
import { Grid, ImageListItem, ImageListItemBar } from "@mui/material";

export default function PokemonDisplay({
  name,
  id,
  imgUrl,
}: {
  id?:string;
  name: string;
  imgUrl: string;
}) {
  return (
    <Grid item xs={6} sm={4} md={3} lg={2}>
      <a href={`/pokemon/${id||name}`}>
        <ImageListItem>
          <img
            src={imgUrl}
            // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={name}
            loading="lazy"
            width={100}
            height={100}
            style={{ maxHeight: "100%", objectFit: "contain" }}
          />
          <ImageListItemBar
            title={name}
            sx={{
              textTransform: "capitalize",
            }}
          />
        </ImageListItem>
      </a>
    </Grid>
  );
}
