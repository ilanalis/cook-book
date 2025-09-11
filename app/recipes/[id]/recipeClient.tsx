"use client";

import React from "react";
import { recipeWithAllRelations } from "@/lib/definitions/recipes";
import { Box, Button, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

interface RecipeClientProps {
  recipe: recipeWithAllRelations;
  isUserAuthor: boolean;
}

export const RecipeClient: React.FC<RecipeClientProps> = ({
  recipe,
  isUserAuthor,
}) => {
  const router = useRouter();

  const handleDeleteRecipe = async () => {
    const res = await fetch(`/api/recipes/${recipe.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      enqueueSnackbar("Failed to delete recipe!", { variant: "error" });
      return;
    }
    enqueueSnackbar("Recipe deleted successfully!", { variant: "success" });
    setTimeout(() => router.push("/recipes"), 2000);
  };

  return (
    <Box>
      <Typography variant="h1" textAlign={"center"}>
        {recipe.title}
      </Typography>
      <Box>
        {recipe.description && (
          <Typography
            sx={{
              fontSize: "1.5rem",
            }}
          >
            Description: {recipe.description}.
          </Typography>
        )}
        <Box
          sx={{
            marginTop: 3,
            border: "0.2px solid ",
            maxWidth: 400,
            padding: 2,
            borderRadius: 5,
          }}
        >
          <Typography
            sx={{
              fontSize: "1.5rem",
            }}
          >
            Ingredients:{" "}
          </Typography>
          if()
          {recipe.recipeIngredients.map((recIng) => (
            <Box
              key={recIng.id}
              sx={{
                display: "flex",
                alignItems: "center",
                wordBreak: "break-word",
                borderBottom: "0.5px solid",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{ textAlign: "left", maxWidth: 220, fontSize: "1.3rem" }}
              >
                {recIng.ingredient.name}
              </Typography>

              <Typography
                sx={{
                  textAlign: "right",
                  minWidth: 30,
                  maxWidth: 100,
                  fontSize: "1.3rem",
                }}
              >
                {recIng.quantity} {recIng.unit}{" "}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box>
        <Typography variant="h2" textAlign={"center"}>
          Steps
        </Typography>
        {recipe.steps.map((step) => {
          return (
            <Typography
              sx={{
                fontSize: "1.5rem",
              }}
              key={step.id}
            >
              {step.stepNumber}. {step.description}
            </Typography>
          );
        })}
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={2}
      >
        {isUserAuthor && (
          <Box>
            <Button
              sx={{ backgroundColor: "red" }}
              onClick={handleDeleteRecipe}
            >
              delete
            </Button>
          </Box>
        )}

        <Typography textAlign={"end"}>Author: {recipe.user.name}</Typography>
      </Box>
    </Box>
  );
};
