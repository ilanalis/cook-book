"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "../../../auth";
import { Ingredient, newRecipeSchema, Step } from "@/lib/definitions/recipes";

export const createRecipe = async (_state: unknown, formData: FormData) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      console.log("user is nor logged in");
      return null;
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const ingredients = JSON.parse(formData.get("ingredients") as string);
    const steps = JSON.parse(formData.get("steps") as string);

    const result = newRecipeSchema.safeParse({
      title,
      description,
      ingredients,
      steps,
    });

    if (!result.success) {
      return {
        success: false,
        errors: result.error,
      };
    }

    await prisma.$transaction(async (tx) => {
      const recipe = await tx.recipe.create({
        data: { userId, title, description },
      });
      await Promise.all(
        ingredients.map(async (ing: Ingredient) => {
          let ingredientId;
          const existing = await tx.ingredient.findUnique({
            where: { name: ing.ingredientName },
          });
          if (existing) {
            ingredientId = existing.id;
          } else {
            const created = await tx.ingredient.create({
              data: { name: ing.ingredientName },
            });
            ingredientId = created.id;
          }

          await tx.recipeIngredient.create({
            data: {
              recipeId: recipe.id,
              ingredientId,
              quantity: ing.quantity,
              unit: ing.unit,
            },
          });
        })
      );

      await Promise.all(
        steps.map(async (step: Step) => {
          await tx.step.create({
            data: {
              recipeId: recipe.id,
              stepNumber: step.stepNumber,
              description: step.description,
            },
          });
        })
      );
    });
  } catch (err) {
    console.error(err);
    return { success: false, errors: ["Internal server error"] };
  }
};
