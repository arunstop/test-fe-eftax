import { Chip, Typography } from "@mui/material";

export default function CustomChip({
  label,
  suffix,
}: {
  label: string;
  suffix?: string;
}) {
  return (
    <Chip
      label={label}
      onDelete={() => {}}
      deleteIcon={
        !suffix ? undefined : (
          <Typography
            sx={{
              color: (theme) => theme.palette.primary.main + " !important",
            }}
          >
            suffix
          </Typography>
        )
      }
    />
  );
}
