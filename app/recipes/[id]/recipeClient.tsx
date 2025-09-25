"use client";

import React, { useState } from "react";
import { recipeWithAllRelations } from "@/lib/definitions/recipes";
import { Box, Button, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { AlertDialog } from "./alertDialog";
import Link from "next/link";

interface RecipeClientProps {
  recipe: recipeWithAllRelations;
  isUserAuthor: boolean;
}

export const RecipeClient: React.FC<RecipeClientProps> = ({
  recipe,
  isUserAuthor,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (isLoading) return;
    setOpen(false);
  };

  const handleDeleteRecipe = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/recipes/${recipe.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      enqueueSnackbar("Failed to delete recipe!", { variant: "error" });
      return;
    }
    enqueueSnackbar("Recipe deleted successfully!", { variant: "success" });
    setTimeout(() => {
      router.push("/recipes"), 2000;
      handleClose();
      setIsLoading(false);
    });
  };

  return (
    <Box>
      <Typography
        variant="h1"
        sx={{ fontSize: "clamp(2rem, 5vw, 70px)", textAlign: "center" }}
      >
        {recipe.title}
      </Typography>
      <Box>
        {recipe.description && (
          <Typography
            sx={{
              marginTop: { xs: 2, md: 4 },
            }}
          >
            Description: {recipe.description}.
          </Typography>
        )}
        <Box
          sx={{
            marginTop: { xs: 1, md: 3 },
            border: "0.2px solid ",
            maxWidth: 400,
            padding: 2,
            borderRadius: 5,
          }}
        >
          <Typography>Ingredients: </Typography>
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
                sx={{
                  textAlign: "left",
                  maxWidth: 220,
                  fontSize: "clamp(0.9rem, 1vw, 1.3rem)",
                }}
              >
                {recIng.ingredient.name}
              </Typography>

              <Typography
                sx={{
                  textAlign: "right",
                  minWidth: 30,
                  maxWidth: 100,
                  fontSize: "clamp(0.9rem, 1vw, 1.3rem)",
                }}
              >
                {recIng.quantity} {recIng.unit}{" "}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box>
        <Typography variant="h2" textAlign={"center"} sx={{ mt: 2 }}>
          Steps
        </Typography>
        {recipe.steps
          .sort((a, b) => a.stepNumber - b.stepNumber)
          .map((step) => {
            return (
              <Typography key={step.id}>
                {step.stepNumber}. {step.description}
              </Typography>
            );
          })}
      </Box>
      <Box
        display={"flex"}
        justifyContent={isUserAuthor ? "space-between" : "end"}
        alignItems={"center"}
        mt={2}
      >
        {isUserAuthor && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              href={`/recipes/${recipe.id}/edit`}
              component={Link}
              variant="outlined"
            >
              Edit
            </Button>
            <Button sx={{ backgroundColor: "red" }} onClick={handleClickOpen}>
              Delete
            </Button>
          </Box>
        )}
        <Typography textAlign={"end"}>Author: {recipe.user.name}</Typography>
      </Box>
      <AlertDialog
        open={open}
        handleClose={handleClose}
        handleDelete={handleDeleteRecipe}
        recipeTitle={recipe.title}
        isLoading={isLoading}
      />
    </Box>
  );
};
