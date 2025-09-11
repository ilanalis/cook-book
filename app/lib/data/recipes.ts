import { prisma } from "../prisma";

export const fetchRecipesCount = async () => {
  const recipesAmount = await prisma.recipe.count();
  return recipesAmount;
};

export const fetchRecipes = async (page: number, pageSize: number) => {
  const recipes = await prisma.recipe.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      recipeIngredients: {
        include: {
          ingredient: true,
        },
      },
    },
  });
  return recipes;
};

export const fetchRecipeById = async (id: string) => {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id,
    },
    include: {
      recipeIngredients: {
        include: {
          ingredient: true,
        },
      },
      steps: true,
      user: true,
    },
  });
  return recipe;
};
