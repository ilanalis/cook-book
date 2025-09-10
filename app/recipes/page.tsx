import RecipesList from "@/components/recipes/recipes-list";
import { fetchRecipes, fetchRecipesCount } from "@/lib/data/recipes";
import { auth } from "../../auth";
import { Box, Button, Typography } from "@mui/material";
import Overlay from "@/ui/overlay";
import MyContainer from "@/ui/myContainer";
import Link from "next/link";

const Recipes = async () => {
  const currentPage = 1;
  const pageSize = 10;
  const recipes = await fetchRecipes(currentPage, pageSize);
  const recipesCount = await fetchRecipesCount();
  const session = await auth();
  const isLoggedIn = !!session;

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
          Recipes
        </Typography>
        {isLoggedIn && (
          <Box display={"flex"} justifyContent={"end"}>
            <Button
              component={Link}
              variant="contained"
              size="large"
              sx={{ fontSize: "20px" }}
              href="/recipes/new"
            >
              Create new recipe
            </Button>
          </Box>
        )}
        <RecipesList
          initialRecipes={recipes}
          recipesCount={recipesCount}
          pageSize={pageSize}
        />
      </MyContainer>
    </Box>
  );
};

export default Recipes;
