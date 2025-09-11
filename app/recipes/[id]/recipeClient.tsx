import React from "react";
import { recipeWithAllRelations } from "@/lib/definitions/recipes";
import { Box, Typography } from "@mui/material";

interface RecipeClientProps {
  recipe: recipeWithAllRelations;
}

export const RecipeClient: React.FC<RecipeClientProps> = async ({ recipe }) => {
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
            maxWidth: 350,
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
    </Box>
  );
};
