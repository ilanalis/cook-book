"use client";

import NewRecipeForm from "@/components/new-recipe/new-recipe-form";
import MyContainer from "@/components/myContainer";
import Overlay from "@/components/overlay";
import { Box, Typography } from "@mui/material";

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
      <MyContainer>
        <Typography textAlign={"center"} variant="h1">
          Create new recipe
        </Typography>
        <NewRecipeForm />
      </MyContainer>
    </Box>
  );
};

export default NewRecipe;
