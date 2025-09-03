import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { Ingredient, NewRecipeErrors } from "@/lib/definitions/recipes";

interface IngredientInputsProps {
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  error: NewRecipeErrors | null;
}

const IngredientInputs: React.FC<IngredientInputsProps> = ({
  ingredients,
  setIngredients,
  error,
}) => {
  const handleIngredientChange = <K extends keyof Ingredient>(
    index: number,
    key: K,
    value: Ingredient[K]
  ) => {
    setIngredients((prev) => {
      const newIngredients = [...prev];
      newIngredients[index][key] = value;
      return newIngredients;
    });
  };
  const handleAddingIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      { ingredientName: "", quantity: 0, unit: "" },
    ]);
  };

  return (
    <Box>
      <Typography variant="h2">Ingredients</Typography>
      {ingredients.map((ing, i) => {
        return (
          <Box key={i}>
            <Box display={"flex"} gap={3}>
              <TextField
                type="text"
                name="name"
                label="Name"
                value={ingredients[i].ingredientName}
                onChange={(e) =>
                  handleIngredientChange(i, "ingredientName", e.target.value)
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
              />
              <TextField
                label="Quantity"
                name="quantity"
                value={ingredients[i].quantity}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  handleIngredientChange(i, "quantity", Number(val));
                }}
                inputMode="numeric"
                variant="standard"
                error={
                  !!error?.ingredients?.items?.[i]?.properties?.quantity?.errors
                    ?.length
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
                value={ingredients[i].unit}
                onChange={(e) =>
                  handleIngredientChange(i, "unit", e.target.value)
                }
                variant="standard"
                error={
                  !!error?.ingredients?.items?.[i]?.properties?.unit?.errors
                    ?.length
                }
                helperText={
                  error?.ingredients?.items?.[i]?.properties?.unit?.errors?.[0]
                }
              />
            </Box>
          </Box>
        );
      })}
      <Button onClick={handleAddingIngredient} sx={{ fontSize: "1.3rem" }}>
        + add ingredient
      </Button>
    </Box>
  );
};

export default IngredientInputs;
