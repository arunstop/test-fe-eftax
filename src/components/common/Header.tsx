"use client";

import { Box } from "@mui/system";
import { ReactNode } from "react";

export default function Header({ children }: { children: ReactNode }) {
  return <Box>{children}</Box>;
}
