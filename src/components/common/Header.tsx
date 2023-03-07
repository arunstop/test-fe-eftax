"use client";

import { Box } from "@mui/system";
import { ReactNode } from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function Header({ children }: { children: ReactNode }) {
  return (
    <AppBar position={"sticky"}>
      <Toolbar sx={{ p: "0.5rem", gap: "1rem" }}>
        <Link href="/">
          <IconButton aria-label="back" size="medium">
            <Icon
              icon="mdi:arrow-left"
              style={{ fontSize: "inherit", color: "#ffffff" }}
            />
          </IconButton>
        </Link>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          style={{ textTransform: "capitalize" }}
        >
          {children}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
