"use client";

import Link from "next/link";
import { Box, CssBaseline } from "@mui/material";

export default function Home() {
  return (
    <Box id="__next">
      <CssBaseline />
      <Link href="dashboard/profile">profile</Link>
    </Box>
  );
}
