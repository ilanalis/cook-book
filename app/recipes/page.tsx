import RecipesList from "@/components/recipes/recipes-list";
import { fetchRecipes, fetchRecipesCount } from "@/lib/data/recipes";
import { auth } from "../../auth";

const Recipes = async () => {
  const currentPage = 1;
  const recipes = await fetchRecipes(currentPage);
  const recipesCount = await fetchRecipesCount();
  const session = await auth();
  const isLoggedIn = !!session;
  return (
    <RecipesList
      recipes={recipes}
      recipesCount={recipesCount}
      isLoggedIn={isLoggedIn}
    />
  );
};

export default Recipes;
