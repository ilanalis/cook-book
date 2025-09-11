import { fetchRecipeById } from "@/lib/data/recipes";
import { RequestMethod } from "@/lib/definitions/request";
import { auth } from "../../../../auth";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const recipe = await fetchRecipeById(params.id);

  if (!recipe) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(recipe, { status: 200 });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userId = await getUserId();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const canUserDeleteRecipe = await canDeleteRecipe(params.id, userId);
  if (!canUserDeleteRecipe) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  await prisma.recipe.delete({
    where: { id: params.id },
  });
  return NextResponse.json({ message: "Recipe deleted" }, { status: 200 });
}

const getUserId = async () => {
  const session = await auth();
  if (!session) return;

  return session.user?.id;
};

const canDeleteRecipe = async (recipeId: string, userId: string) => {
  const recipe = await fetchRecipeById(recipeId);
  const canDelete = recipe?.user.id === userId;

  return canDelete;
};
