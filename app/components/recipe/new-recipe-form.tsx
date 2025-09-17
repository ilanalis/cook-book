"use client";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
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
  recipeWithAllRelations,
  Step,
} from "@/lib/definitions/recipes";
import z from "zod";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import Overlay from "../overlay";
import MyContainer from "../myContainer";
import { createOrEditRecipe } from "@/recipes/actions";

interface RecipeFormProps {
  titleText: string;
  submitButtonText: string;
  recipeId?: string;
  recipeData?: recipeWithAllRelations;
}

const RecipeForm: React.FC<RecipeFormProps> = ({
  titleText,
  submitButtonText,
  recipeId,
  recipeData,
}) => {
  const formattedIngredients = recipeData?.recipeIngredients.map((recIng) => {
    return {
      id: recIng.id,
      clientId: crypto.randomUUID(),
      ingredientName: recIng.ingredient.name,
      quantity: recIng.quantity,
      unit: recIng.unit,
    };
  });
  const formattedSteps = recipeData?.steps
    .map((step) => {
      return {
        id: step.id,
        clientId: crypto.randomUUID(),
        stepNumber: step.stepNumber,
        description: step.description,
      };
    })
    .sort((a, b) => a.stepNumber - b.stepNumber);

  const [state, formAction] = useActionState(createOrEditRecipe, undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [titleValue, setTitleValue] = useState(recipeData?.title || "");
  const [descriptionValue, setDescriptionValue] = useState(
    recipeData?.description || ""
  );
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    formattedIngredients || [
      {
        clientId: crypto.randomUUID(),
        ingredientName: "",
        quantity: 0,
        unit: "",
      },
    ]
  );
  const [steps, setSteps] = useState<Step[]>(
    formattedSteps || [
      { clientId: crypto.randomUUID(), stepNumber: 1, description: "" },
    ]
  );
  const router = useRouter();
  const prevStepsRef = useRef<Step[]>(steps);
  const prevIngredientsRef = useRef<Ingredient[]>(ingredients);
  const [error, setError] = useState<NewRecipeErrors | null>(null);

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
      return false;
    }
    setError(null);
    return true;
  };

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
  }, [steps, ingredients, error]);

  useEffect(() => {
    if (state?.success) {
      if (recipeId) {
        enqueueSnackbar("Recipe edited successfully!", { variant: "success" });
      } else {
        enqueueSnackbar("Recipe created successfully!", { variant: "success" });
      }
      setTimeout(() => router.push("/recipes"), 2000);
    }
    if (state?.errors) {
      if (recipeId) {
        enqueueSnackbar("Failed to edit recipe! Please try again", {
          variant: "error",
        });
      } else {
        enqueueSnackbar("Failed to create recipe! Please try again", {
          variant: "error",
        });
      }
    }
  }, [state, recipeId, router]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const handleDescriptionValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const isValid = validate();
    if (!isValid) return;

    const formData = new FormData();
    formData.append("title", titleValue);
    formData.append("description", descriptionValue);
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("steps", JSON.stringify(steps));

    startTransition(() => {
      if (recipeId) {
        formAction({ formData, type: "edit", recipeId });
        return;
      }
      formAction({ formData, type: "create" });
    });
  };

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
          {titleText}
        </Typography>
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
            isLoading={isLoading}
          />
          <StepInputs
            steps={steps}
            setSteps={setSteps}
            error={error}
            validate={validate}
            isLoading={isLoading}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2, fontSize: "1.3rem" }}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : submitButtonText}
          </Button>
        </Stack>
      </MyContainer>
    </Box>
  );
};

export default RecipeForm;
