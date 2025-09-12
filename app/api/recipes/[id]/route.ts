import { fetchRecipeById } from "@/lib/data/recipes";
import { auth } from "../../../../auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const recipe = await fetchRecipeById(id);
  if (!recipe) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(recipe, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const userId = await getUserId();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const canUserDeleteRecipe = await canDeleteRecipe(id, userId);
  if (!canUserDeleteRecipe) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  await prisma.recipe.delete({
    where: { id },
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
