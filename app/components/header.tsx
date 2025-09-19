"use client";

import React from "react";
import { AppBar, Box, Toolbar } from "@mui/material";
import Link from "next/link";
import MuiLink from "@mui/material/Link";
import { useSession } from "next-auth/react";

const Header: React.FC = () => {
  const { status } = useSession();

  const isLoggedIn = status === "authenticated";
  return (
    <AppBar
      position="absolute"
      color="transparent"
      style={{
        background:
          "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0,0,0,0))",
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
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <MuiLink href="/" style={{ fontSize: 35 }}>
          CookBook
        </MuiLink>
        <MuiLink href="/recipes/" style={{ fontSize: 35 }}>
          Recipes
        </MuiLink>
        <Box sx={{ display: "flex", gap: 2 }}>
          {isLoggedIn ? (
            <MuiLink
              href="/dashboard/profile"
              color="inherit"
              style={{ fontSize: 35 }}
            >
              Profile
            </MuiLink>
          ) : (
            <MuiLink href="/auth" color="inherit" style={{ fontSize: 35 }}>
              Log in
            </MuiLink>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
