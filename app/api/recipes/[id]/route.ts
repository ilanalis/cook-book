import { fetchRecipeById } from "@/lib/data/recipes";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return null;
  const recipe = await fetchRecipeById(id);
}
