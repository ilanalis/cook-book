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
        <Typography
          variant="h1"
          sx={{ fontSize: "clamp(2rem, 5vw, 70px)", textAlign: "center" }}
        >
          CookBook — Recipes That Inspire
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: {
              sm: "flex-end",
            },
            p: 2,
            borderRadius: 2,
            flexDirection: {
              xs: "column",
              md: "row",
            },
            gap: {
              xs: 2,
              sm: 3,
              md: 2,
            },
          }}
        >
          <Typography
            sx={{
              paddingTop: {
                xs: 1,
                sm: 3,
                md: 2,
              },
              maxWidth: { md: 500, lg: 600 },
              fontSize: "clamp(1rem, 4vw, 30px)",
            }}
          >
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
              px: { xs: 2, md: 7 },
              py: { xs: 1, md: 2 },
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
