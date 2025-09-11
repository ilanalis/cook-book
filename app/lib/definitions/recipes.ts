import { Prisma } from "@prisma/client";
import z from "zod";

const ingredientSchema = z.object({
  ingredientName: z.string().min(1, { message: "Ingredient name is required" }),
  quantity: z
    .number()
    .min(0.01, { message: "Quantity must be greater than 0" }),
  unit: z.string().min(1, { message: "Unit is required" }),
});

const stepSchema = z.object({
  stepNumber: z.number(),
  description: z.string().min(1, { message: "Step description is required" }),
});

export const newRecipeSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().optional(),
  steps: z.array(stepSchema).min(1, { message: "Add at least one step" }),
  ingredients: z
    .array(ingredientSchema)
    .min(1, { message: "Add at least one ingredient" }),
});

export type Ingredient = {
  ingredientName: string;
  quantity: number;
  unit: string;
  id: string;
};

export type Step = {
  stepNumber: number;
  description: string;
  id: string;
};

type TreeifiedIngredientError = {
  errors: string[];
  items?: {
    errors: string[];
    properties?: {
      ingredientName?: { errors: string[] };
      quantity?: { errors: string[] };
      unit?: { errors: string[] };
    };
  }[];
};

type TreeifiedStepError = {
  errors: string[];
  items?: {
    errors: string[];
    properties?: {
      stepNumber?: { errors: string[] };
      description?: { errors: string[] };
    };
  }[];
};

export type NewRecipeErrors = {
  title?: { errors: string[] };
  description?: { errors: string[] };
  ingredients?: TreeifiedIngredientError;
  steps?: TreeifiedStepError;
};

const recipeWithIngredientsRelations =
  Prisma.validator<Prisma.RecipeDefaultArgs>()({
    include: {
      recipeIngredients: {
        include: {
          ingredient: true,
        },
      },
    },
  });

export type recipeWithIngredientsRelations = Prisma.RecipeGetPayload<
  typeof recipeWithIngredientsRelations
>;

const RecipeWithAllRelations = Prisma.validator<Prisma.RecipeDefaultArgs>()({
  include: {
    recipeIngredients: {
      include: {
        ingredient: true,
      },
    },
    steps: true,
  },
});

export type recipeWithAllRelations = Prisma.RecipeGetPayload<
  typeof RecipeWithAllRelations
>;
