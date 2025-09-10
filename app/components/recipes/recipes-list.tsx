import { recipeWithIngredientsRelations } from "@/lib/definitions/recipes";
import MyContainer from "@/ui/myContainer";
import Overlay from "@/ui/overlay";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

interface RecipesListProps {
  recipes: recipeWithIngredientsRelations[];
  recipesCount: number;
  isLoggedIn: boolean;
}

const RecipesList: React.FC<RecipesListProps> = ({
  recipes,
  recipesCount,
  isLoggedIn,
}) => {
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
          Recipes
        </Typography>
        {isLoggedIn && (
          <Box display={"flex"} justifyContent={"end"}>
            <Button
              component={Link}
              variant="contained"
              size="large"
              sx={{ fontSize: "20px" }}
              href="/recipes/new"
            >
              Create new recipe
            </Button>
          </Box>
        )}

        <Box display={"flex"} flexDirection={"column"}>
          {recipes.map((recipe) => {
            return (
              <Box
                key={recipe.id}
                sx={{
                  borderBottom: "1px solid",
                  p: "20px 15px 20px",
                }}
              >
                <Typography variant="h2" sx={{ marginBottom: 2 }}>
                  {recipe.title}
                </Typography>

                <Typography
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "3.6em",
                    marginBottom: "10px",
                  }}
                >
                  {recipe.description
                    ? `Description: ${recipe.description}`
                    : ""}
                </Typography>

                <Typography
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "3.6em",
                    marginBottom: "10px",
                  }}
                >
                  Ingredients:{" "}
                  {recipe.recipeIngredients
                    .map((recIng) => recIng.ingredient.name)
                    .join(", ")}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </MyContainer>
    </Box>
  );
};

export default RecipesList;
