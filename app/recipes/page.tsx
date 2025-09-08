import RecipesList from "@/components/recipes/recipes-list";
import { fetchRecipes, fetchRecipesCount } from "@/lib/data/recipes";

const Recipes = async () => {
  const currentPage = 2;
  const recipes = await fetchRecipes(currentPage);
  const recipesCount = await fetchRecipesCount();
  return <RecipesList recipes={recipes} recipesCount={recipesCount} />;
};

export default Recipes;
