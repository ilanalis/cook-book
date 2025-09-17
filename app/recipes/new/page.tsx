import RecipeForm from "../../components/recipe/new-recipe-form";

const TITLE_TEXT = "Create new recipe";
const SUBMIT_BUTTON_TEXT = "Create recipe";

const NewRecipe = () => {
  return (
    <RecipeForm titleText={TITLE_TEXT} submitButtonText={SUBMIT_BUTTON_TEXT} />
  );
};

export default NewRecipe;
