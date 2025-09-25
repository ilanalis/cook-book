import RecipesList from "@/recipes/recipes-list";
import { fetchRecipes, fetchRecipesCount } from "@/lib/data/recipes";
import { auth } from "../../auth";
import { Box, Button, Typography } from "@mui/material";
import Overlay from "@/components/overlay";
import MyContainer from "@/components/myContainer";
import Link from "next/link";
import myTheme from "@/theme";

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
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography textAlign={"center"} variant="h1">
            Recipes
          </Typography>
          <Button
            component={Link}
            variant="contained"
            sx={{
              fontSize: "clamp(1rem, 4vw, 20px)",
              py: {
                xs: 0,
                sm: 1,
                md: 1.5,
              },
              px: {
                xs: 0,
                sm: 2,
              },
            }}
            href="/recipes/new"
          >
            <Typography sx={{ fontSize: { xs: 25 } }}>+</Typography>
            <Box
              component="span"
              sx={{ display: { xs: "none", sm: "inline" }, ml: 1 }}
            >
              Create new recipe
            </Box>
          </Button>
        </Box>
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
