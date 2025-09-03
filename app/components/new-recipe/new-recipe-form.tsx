"use client";

import { createRecipe } from "@/recipes/new/actions";
import { Alert, Button, Snackbar, Stack, TextField } from "@mui/material";
import React, { startTransition, useActionState, useState } from "react";
import IngredientInputs from "./ingredient-inputs";
import StepInputs from "./step-inputs";
import {
  Ingredient,
  NewRecipeErrors,
  newRecipeSchema,
  Step,
} from "@/lib/definitions/recipes";
import z from "zod";
import { useRouter } from "next/navigation";

const NewRecipeForm: React.FC = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { ingredientName: "", quantity: 0, unit: "" },
  ]);
  const [steps, setSteps] = useState<Step[]>([
    { stepNumber: 1, description: "" },
  ]);

  const [error, setError] = useState<NewRecipeErrors | null>(null);
  const [state, action] = useActionState(createRecipe, undefined);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const handleDescriptionValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const dataToValidate = {
      title: titleValue,
      description: descriptionValue,
      ingredients,
      steps,
    };

    const validationResult = newRecipeSchema.safeParse(dataToValidate);

    if (!validationResult.success) {
      const validationErrors = z.treeifyError(validationResult.error);
      setError(validationErrors?.properties ?? null);
      setIsLoading(false);

      return;
    }
    setError(null);

    const formData = new FormData();
    formData.append("title", titleValue);
    formData.append("description", descriptionValue);
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("steps", JSON.stringify(steps));

    try {
      startTransition(() => {
        action(formData);
      });
      setOpen(true);
      setTimeout(() => router.push("/recipes"), 2000);
    } catch {}
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        type="text"
        name="title"
        label="Title"
        value={titleValue}
        onChange={handleTitleChange}
        error={!!error?.title?.errors[0]}
        helperText={error?.title?.errors[0]}
        variant="standard"
      />
      <TextField
        type="text"
        name="description"
        label="Description (optional)"
        value={descriptionValue}
        onChange={handleDescriptionValue}
        error={!!error?.description?.errors[0]}
        helperText={error?.description?.errors[0]}
        variant="standard"
      />
      <IngredientInputs
        ingredients={ingredients}
        setIngredients={setIngredients}
        error={error}
      />
      <StepInputs steps={steps} setSteps={setSteps} error={error} />
      {state?.errors && (
        <Alert severity="error">Some error occurred. Plese try again</Alert>
      )}
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2, fontSize: "1.3rem" }}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Create recipe"}
      </Button>
      <Snackbar open={open} autoHideDuration={2000}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Recipe created successfully!
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default NewRecipeForm;
