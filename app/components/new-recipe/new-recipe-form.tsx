"use client";

import { createRecipe } from "@/recipes/new/actions";
import { Button, Stack, TextField } from "@mui/material";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { enqueueSnackbar } from "notistack";

const NewRecipeForm: React.FC = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: crypto.randomUUID(), ingredientName: "", quantity: 0, unit: "" },
  ]);
  const [steps, setSteps] = useState<Step[]>([
    { id: crypto.randomUUID(), stepNumber: 1, description: "" },
  ]);
  const router = useRouter();
  const prevStepsRef = useRef<Step[]>(steps);
  const prevIngredientsRef = useRef<Ingredient[]>(ingredients);
  const [error, setError] = useState<NewRecipeErrors | null>(null);
  const [state, action] = useActionState(createRecipe, undefined);

  useEffect(() => {
    if (!error) return;
    const prevSteps = prevStepsRef.current;
    const prevIngredients = prevIngredientsRef.current;

    const stepsDeleted = steps.length < prevSteps.length;
    const ingredientsDeleted = ingredients.length < prevIngredients.length;

    if (stepsDeleted || ingredientsDeleted) {
      validate();
    }

    prevStepsRef.current = steps;
    prevIngredientsRef.current = ingredients;
  }, [steps, ingredients]);

  useEffect(() => {
    if (state?.success) {
      enqueueSnackbar("Recipe created successfully!", { variant: "success" });
      setTimeout(() => router.push("/recipes"), 2000);
    }
    if (state?.errors) {
      enqueueSnackbar("Failed to create recipe! Please try again", {
        variant: "error",
      });
    }
  }, [state]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const handleDescriptionValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionValue(e.target.value);
  };

  const validate = () => {
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
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    validate();
    const formData = new FormData();
    formData.append("title", titleValue);
    formData.append("description", descriptionValue);
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("steps", JSON.stringify(steps));

    startTransition(() => {
      action(formData);
    });
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
        autoFocus={true}
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
        validate={validate}
      />
      <StepInputs
        steps={steps}
        setSteps={setSteps}
        error={error}
        validate={validate}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2, fontSize: "1.3rem" }}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Create recipe"}
      </Button>
    </Stack>
  );
};

export default NewRecipeForm;
