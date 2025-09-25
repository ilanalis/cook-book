"use client";

import { recipeWithIngredientsRelations } from "@/lib/definitions/recipes";
import { Box, Pagination, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

interface RecipesListProps {
  initialRecipes: recipeWithIngredientsRelations[];
  recipesCount: number;
  pageSize: number;
}

const RecipesList: React.FC<RecipesListProps> = ({
  initialRecipes,
  recipesCount,
  pageSize,
}) => {
  const [recipes, setRecipes] = useState(initialRecipes);
  const pagesCount = Math.ceil(recipesCount / pageSize);

  const handlePaginationChange = async (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const res = await fetch(`/api/recipes?page=${value}&pageSize=${pageSize}`);
    const data = await res.json();
    setRecipes(data);
  };

  return (
    <Box display={"flex"} flexDirection={"column"}>
      {recipes.map((recipe) => {
        return (
          <Box
            key={recipe.id}
            sx={{
              borderBottom: "1px solid",
              p: { xs: "15px 4px 10px", md: "20px 15px 20px" },
            }}
          >
            <Typography
              component={Link}
              href={`/recipes/${recipe.id}`}
              variant="h2"
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                mb: { xs: 1, md: 2 },
                color: "text.primary",
                textDecoration: "none",
                transition: "color 0.2s",
                "&:hover": {
                  color: "#f99090ff",
                },
                WebkitLineClamp: 1,
                overflow: "hidden",
                fontSize: "clamp(1.2rem, 4vw, 50px)",
              }}
            >
              {recipe.title}
            </Typography>

            <Typography
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: { xs: 2, md: 3 },
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                minHeight: { xs: "2.4em", md: "3.6em" },
                marginBottom: "10px",
                fontSize: "clamp(1rem, 2vw, 20px)",
              }}
            >
              {recipe.description ? `Description: ${recipe.description}` : ""}
            </Typography>

            <Typography
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                minHeight: { xs: "2.4em", md: "3.6em" },
                marginBottom: "10px",
                fontSize: "clamp(1rem, 2vw, 20px)",
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
      <Box
        display={"flex"}
        justifyContent={"center"}
        sx={{ marginTop: "15px" }}
      >
        <Pagination
          onChange={handlePaginationChange}
          count={pagesCount}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
};

export default RecipesList;
