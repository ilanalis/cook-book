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
              p: "20px 15px 20px",
            }}
          >
            <Typography
              component={Link}
              href={`/recipes/${recipe.id}`}
              variant="h2"
              sx={{
                mb: 2,
                color: "text.primary",
                textDecoration: "none",
                transition: "color 0.2s",
                "&:hover": {
                  color: "#f99090ff",
                },
              }}
            >
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
              {recipe.description ? `Description: ${recipe.description}` : ""}
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
