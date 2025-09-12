"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Header: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  const isLoggedIn = status === "authenticated";
  return (
    <AppBar
      position="absolute"
      color="transparent"
      style={{
        background: "transparent",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          color: "white",
          fontSize: "18px",
          "& .MuiButton-root": { fontSize: "18px", color: "white" },
          "& .MuiTypography-root": {
            fontSize: "20px",
            fontWeight: "bold",
            color: "white",
          },
          pt: 4,
          pb: 4,
        }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link
            href="/"
            passHref
            style={{ textDecoration: "none", color: "inherit" }}
          >
            CookBook
          </Link>
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {isLoggedIn ? (
            <Link
              href="/dashboard/profile"
              color="inherit"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Profile
            </Link>
          ) : (
            <Link
              href="/auth"
              color="inherit"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Log in
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
