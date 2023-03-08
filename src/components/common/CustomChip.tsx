import { Chip, Typography, Box } from "@mui/material";
import { ReactNode } from "react";

export default function CustomChip({
  label,
  suffix,
}: {
  label: string;
  suffix?: ReactNode;
}) {
  return (
    <Chip
      label={label}
      onDelete={suffix ? () => {} : undefined}
      style={{ textTransform: "capitalize" }}
      deleteIcon={suffix ? <Box sx={{ pr: 1 }}>{suffix}</Box> : undefined}
    />
  );
}
