"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "../../auth";
import { Ingredient, newRecipeSchema, Step } from "@/lib/definitions/recipes";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export type RecipeActionState = {
  success?: boolean;
  errors?: string[] | ZodError;
};

export type RecipeActionPayload = {
  formData: FormData;
  type: "create" | "edit";
  recipeId?: string;
};

type RecipeData = {
  userId: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  steps: Step[];
  recipeId?: string;
};

interface IngredientsParams {
  tx: Prisma.TransactionClient;
  recipeId?: string;
  ingredients: Ingredient[];
}

export const createOrEditRecipe = async (
  _state: unknown,
  actionPayload: RecipeActionPayload
) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return { success: false, errors: ["user is not logged in"] };
    }

    const title = actionPayload.formData.get("title") as string;
    const description = actionPayload.formData.get("description") as string;
    const ingredients = JSON.parse(
      actionPayload.formData.get("ingredients") as string
    );
    const steps = JSON.parse(actionPayload.formData.get("steps") as string);

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
    if (actionPayload.type === "create") {
      createRecipe({ userId, title, description, ingredients, steps });
    }
    if (actionPayload.type === "edit") {
      editRecipe({
        userId,
        title,
        description,
        ingredients,
        steps,
        recipeId: actionPayload.recipeId,
      });
    }
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, errors: ["Internal server error"] };
  }
};

const createRecipe = async ({
  userId,
  title,
  description,
  ingredients,
  steps,
}: RecipeData) => {
  await prisma.$transaction(async (tx) => {
    const recipe = await tx.recipe.create({
      data: { userId, title, description },
    });
    await createIngredients({ ingredients, tx, recipeId: recipe.id });
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
};

const diffById = <T extends { id?: string }>(
  existing: { id: string }[],
  incoming: T[]
) => {
  const incomingSet = new Set(incoming.map((item) => item.id));
  const existingSet = new Set(existing.map((item) => item.id));

  const toDelete = existing.filter((item) => !incomingSet.has(item.id));
  const toCreate = incoming.filter(
    (item) => !item.id || !existingSet.has(item.id)
  );
  const toEdit = incoming.filter(
    (item): item is T & { id: string } => !!item.id && existingSet.has(item.id)
  );

  return { toDelete, toCreate, toEdit };
};

const editRecipe = async ({
  title,
  description,
  ingredients,
  steps,
  recipeId,
}: RecipeData) => {
  if (!recipeId) throw new Error("No recipeId provided");

  const existingSteps = await prisma.step.findMany({
    where: { recipeId },
  });

  const existingIngredients = await prisma.recipeIngredient.findMany({
    where: {
      recipeId,
    },
    include: { ingredient: true },
  });
  const stepsDiff = diffById(existingSteps, steps);
  const ingredientsDiff = diffById(existingIngredients, ingredients);
  await prisma.$transaction(async (tx) => {
    await tx.recipe.update({
      where: { id: recipeId },
      data: {
        title,
        description,
      },
    });

    await Promise.all(
      stepsDiff.toCreate.map(async (step) => {
        await tx.step.create({
          data: {
            recipeId: recipeId,
            stepNumber: step.stepNumber,
            description: step.description,
          },
        });
      })
    );

    await Promise.all(
      stepsDiff.toDelete.map(
        async (step) =>
          await tx.step.delete({
            where: {
              id: step.id,
            },
          })
      )
    );

    await Promise.all(
      stepsDiff.toEdit.map(
        async (step) =>
          await tx.step.update({
            where: {
              id: step.id,
            },
            data: {
              stepNumber: step.stepNumber,
              description: step.description,
            },
          })
      )
    );

    await Promise.all(
      ingredientsDiff.toDelete.map(async (recIng) => {
        await tx.recipeIngredient.delete({
          where: {
            id: recIng.id,
          },
        });
      })
    );

    await createIngredients({
      ingredients: ingredientsDiff.toCreate,
      tx,
      recipeId,
    });

    await updateIngredients({ ingredients: ingredientsDiff.toEdit, tx });
  });
};

const createIngredients = async ({
  ingredients,
  tx,
  recipeId,
}: IngredientsParams) => {
  if (!recipeId) return;

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
          recipeId,
          ingredientId,
          quantity: ing.quantity,
          unit: ing.unit,
        },
      });
    })
  );
};

const updateIngredients = async ({ ingredients, tx }: IngredientsParams) => {
  await Promise.all(
    ingredients.map(async (ing) => {
      const existingRI = await tx.recipeIngredient.findUnique({
        where: { id: ing.id },
        include: { ingredient: true },
      });

      if (!existingRI) return;

      if (existingRI.ingredient.name !== ing.ingredientName) {
        const newIngredient = await tx.ingredient.create({
          data: { name: ing.ingredientName },
        });

        await tx.recipeIngredient.update({
          where: {
            id: existingRI.id,
          },
          data: {
            ingredientId: newIngredient.id,
            quantity: ing.quantity,
            unit: ing.unit,
          },
        });
      } else {
        await tx.recipeIngredient.update({
          where: { id: existingRI.id },
          data: {
            quantity: ing.quantity,
            unit: ing.unit,
          },
        });
      }
    })
  );
};
