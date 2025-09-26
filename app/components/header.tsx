"use client";

import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
} from "@mui/material";
import MuiLink from "@mui/material/Link";
import { useSession } from "next-auth/react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const pages = [
  { page: "Main page", link: "/" },
  { page: "Recipes", link: "/recipes" },
];

const Header: React.FC = () => {
  const { status } = useSession();
  const [open, setOpen] = useState<boolean>(false);

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
          p: {
            xs: "20px 8px",
            sm: "24px 16px",
          },
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
          }}
        >
          <IconButton
            onClick={() => setOpen(true)}
            aria-label="menu"
            size="large"
            color="inherit"
            sx={{
              p: 0,
              width: 50,
              height: 50,
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.5)",
              },
            }}
          >
            <MenuIcon
              fontSize="large"
              sx={{
                display: "block",
              }}
            />
          </IconButton>

          <Drawer
            anchor="left"
            open={open}
            onClose={() => setOpen(false)}
            slotProps={{
              paper: {
                sx: {
                  width: { xs: "100%", md: 400 },
                  backgroundColor: "#333333",
                  p: {
                    xs: "20px 8px",
                    sm: "24px 16px",
                  },
                  paddingTop: 3,
                  fontSize: 30,
                  gap: 3,
                },
              },
            }}
          >
            <Box>
              <IconButton
                onClick={() => setOpen(false)}
                size="large"
                sx={{
                  width: 50,
                  height: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.5)",
                  },
                }}
              >
                <CloseIcon fontSize="large" />
              </IconButton>
            </Box>

            {pages.map((item) => (
              <MuiLink key={item.page} href={item.link}>
                {item.page}
              </MuiLink>
            ))}
            {isLoggedIn ? (
              <MuiLink href="/dashboard/profile" color="inherit">
                Profile
              </MuiLink>
            ) : (
              <MuiLink href="/auth" color="inherit">
                Log in
              </MuiLink>
            )}
          </Drawer>
        </Box>
        <Box
          sx={{
            width: "100%",

            display: { xs: "none", md: "flex" },
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
