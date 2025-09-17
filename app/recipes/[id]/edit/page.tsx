import RecipeForm from "@/components/recipe/new-recipe-form";
import { fetchRecipeById } from "@/lib/data/recipes";
import React from "react";

const TITLE_TEXT = "Edit recipe";
const SUBMIT_BUTTON_TEXT = "Edit recipe";

interface EditRecipeProps {
  params: Promise<{ id: string }>;
}

const EditRecipe: React.FC<EditRecipeProps> = async ({ params }) => {
  const { id } = await params;
  const recipeData = await fetchRecipeById(id);
  if (!recipeData) return;
  return (
    <RecipeForm
      titleText={TITLE_TEXT}
      submitButtonText={SUBMIT_BUTTON_TEXT}
      recipeId={id}
      recipeData={recipeData}
    />
  );
};
export default EditRecipe;
