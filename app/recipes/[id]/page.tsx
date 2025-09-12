import { fetchRecipeById } from "@/lib/data/recipes";
import React from "react";
import { RecipeClient } from "./recipeClient";
import MyContainer from "@/components/myContainer";
import Overlay from "@/components/overlay";
import { Box } from "@mui/material";
import { auth } from "../../../auth";

interface RecipeProps {
  params: Promise<{ id: string }>;
}

const Recipe: React.FC<RecipeProps> = async ({ params }) => {
  const { id } = await params;
  const recipe = await fetchRecipeById(id);
  const session = await auth();
  const isUserAuthor = session?.user?.id === recipe?.user.id;

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
          <RecipeClient recipe={recipe} isUserAuthor={isUserAuthor} />
        </MyContainer>
      </Box>
    );
};

export default Recipe;
