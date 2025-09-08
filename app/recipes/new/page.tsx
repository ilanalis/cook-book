"use client";

import NewRecipeForm from "@/components/new-recipe/new-recipe-form";
import Overlay from "@/ui/overlay";
import { Container, Box, Typography } from "@mui/material";

const NewRecipe = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url('/new-recipe-background.jpg')`,
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
      <Container
        sx={{
          mx: "auto",
          borderRadius: 3,
          backgroundColor: "rgba(63, 55, 55, 0.6)",
          color: "#fff",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
          p: "30px",
        }}
      >
        <Typography textAlign={"center"} variant="h1">
          Create new recipe
        </Typography>
        <NewRecipeForm />
      </Container>
    </Box>
  );
};

export default NewRecipe;
