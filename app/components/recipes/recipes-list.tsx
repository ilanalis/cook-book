import Overlay from "@/ui/overlay";
import { Box } from "@mui/material";
import { Recipe } from "@prisma/client";
import React from "react";

interface RecipesListProps {
  recipes: Recipe[];
  recipesCount: number;
}

const RecipesList: React.FC<RecipesListProps> = ({ recipes, recipesCount }) => {
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
    </Box>
  );
};

export default RecipesList;
