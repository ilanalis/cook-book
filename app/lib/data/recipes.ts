import { prisma } from "../prisma";

const pageSize = 5;

export const fetchRecipesCount = async () => {
  const recipesAmount = await prisma.recipe.count();
  return recipesAmount;
};

export const fetchRecipes = async (page: number) => {
  const recipes = await prisma.recipe.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {
      createdAt: "desc",
    },
  });
  return recipes;
};
