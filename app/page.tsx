"use client";

import MuiLink from "@mui/material/Link";
import { Box, Link, Typography } from "@mui/material";
import Overlay from "./components/overlay";
import MyContainer from "./components/myContainer";

export default function Home() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url('/main-screen-bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        boxSizing: "border-box",
        p: "84px 15px 20px",
        backgroundAttachment: "fixed",
        overflowX: "hidden",
      }}
    >
      <Overlay />
      <MyContainer>
        <Typography variant="h1" sx={{ fontSize: 70, textAlign: "center" }}>
          CookBook — Recipes That Inspire
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end", // выравниваем по нижнему краю
            p: 2,
            borderRadius: 2,
            // height: 150, // высота блока
          }}
        >
          <Typography sx={{ maxWidth: 500, fontSize: 30 }}>
            Welcome to CookBook — your personal guide in the world of cooking!
            Discover new recipes and enjoy cooking every day.
          </Typography>

          <MuiLink
            // variant="contained"
            href="/recipes"
            sx={{
              textDecoration: "none",
              px: 2,
              py: 1,
              borderRadius: 1,
              backgroundColor: "white",
              color: "black",
            }}
          >
            Explore Recipes
          </MuiLink>
        </Box>
      </MyContainer>
    </Box>
  );
}
