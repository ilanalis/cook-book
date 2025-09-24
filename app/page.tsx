import { Box, Button, Typography } from "@mui/material";
import Overlay from "./components/overlay";
import MyContainer from "./components/myContainer";
import Link from "next/link";

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
            alignItems: "flex-end",
            p: 2,
            borderRadius: 2,
          }}
        >
          <Typography sx={{ maxWidth: 600, fontSize: 30 }}>
            Welcome to CookBook — your personal guide in the world of cooking!
            Discover new recipes and enjoy cooking every day.
          </Typography>

          <Button
            variant="contained"
            component={Link}
            href="/recipes"
            sx={{
              textAlign: "center",
              textDecoration: "none",
              px: 7,
              py: 2,
              borderRadius: 3,
              fontSize: 20,
            }}
          >
            Explore Recipes
          </Button>
        </Box>
      </MyContainer>
    </Box>
  );
}
