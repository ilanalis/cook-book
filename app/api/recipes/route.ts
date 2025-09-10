import { fetchRecipes } from "@/lib/data/recipes";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const recipes = await fetchRecipes(page, pageSize);

  return NextResponse.json(recipes);
}
