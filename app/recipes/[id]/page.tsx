import { fetchRecipeById } from "@/lib/data/recipes";
import React from "react";
import { RecipeClient } from "./recipeClient";
import MyContainer from "@/ui/myContainer";
import Overlay from "@/ui/overlay";
import { Box } from "@mui/material";

interface RecipeProps {
  params: Promise<{ id: string }>;
}

const Recipe: React.FC<RecipeProps> = async ({ params }) => {
  const { id } = await params;
  const recipe = await fetchRecipeById(id);

  if (recipe)
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          backgroundImage: `url('/recipe-bg.jpg')`,
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
          <RecipeClient recipe={recipe} />
        </MyContainer>
      </Box>
    );
};

export default Recipe;
