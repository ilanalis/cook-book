import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { Ingredient, NewRecipeErrors } from "@/lib/definitions/recipes";
import DeleteIconComponent from "./delete-button";

interface IngredientInputsProps {
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  error: NewRecipeErrors | null;
  validate: () => void;
}

const IngredientInputs: React.FC<IngredientInputsProps> = ({
  ingredients,
  setIngredients,
  error,
  validate,
}) => {
  const handleIngredientChange = <K extends keyof Ingredient>(
    ingredientId: string,
    key: K,
    value: Ingredient[K]
  ) => {
    setIngredients((prev) =>
      prev.map((ing) =>
        ing.id === ingredientId ? { ...ing, [key]: value } : ing
      )
    );
  };
  const handleAddingIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      { id: crypto.randomUUID(), ingredientName: "", quantity: 0, unit: "" },
    ]);
  };

  return (
    <Box>
      <Typography variant="h2">Ingredients</Typography>
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        {ingredients.map((ing, i) => {
          return (
            <Box key={ing.id}>
              <Box display={"flex"} gap={3}>
                <TextField
                  type="text"
                  name="name"
                  label="Name"
                  value={ing.ingredientName}
                  onChange={(e) =>
                    handleIngredientChange(
                      ing.id,
                      "ingredientName",
                      e.target.value
                    )
                  }
                  error={
                    !!error?.ingredients?.items?.[i]?.properties?.ingredientName
                      ?.errors?.length
                  }
                  helperText={
                    error?.ingredients?.items?.[i]?.properties?.ingredientName
                      ?.errors?.[0]
                  }
                  variant="standard"
                  autoFocus={i === ingredients.length - 1}
                />
                <TextField
                  label="Quantity"
                  name="quantity"
                  value={ing.quantity}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    handleIngredientChange(ing.id, "quantity", Number(val));
                  }}
                  inputMode="numeric"
                  variant="standard"
                  error={
                    !!error?.ingredients?.items?.[i]?.properties?.quantity
                      ?.errors?.length
                  }
                  helperText={
                    error?.ingredients?.items?.[i]?.properties?.quantity
                      ?.errors?.[0]
                  }
                />
                <TextField
                  type="text"
                  name="unit"
                  label="Unit"
                  value={ing.unit}
                  onChange={(e) =>
                    handleIngredientChange(ing.id, "unit", e.target.value)
                  }
                  variant="standard"
                  error={
                    !!error?.ingredients?.items?.[i]?.properties?.unit?.errors
                      ?.length
                  }
                  helperText={
                    error?.ingredients?.items?.[i]?.properties?.unit
                      ?.errors?.[0]
                  }
                />
                <Box sx={{ width: 350 }}>
                  {i !== 0 && (
                    <DeleteIconComponent
                      id={ing.id}
                      setItems={setIngredients}
                      type={"ingredient"}
                      validate={validate}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>

      <Button onClick={handleAddingIngredient} sx={{ fontSize: "1.3rem" }}>
        + add ingredient
      </Button>
    </Box>
  );
};

export default IngredientInputs;
