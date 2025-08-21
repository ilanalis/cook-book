import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient()

export async function fetchRecipes(){
    const recipes = await prisma.recipe.findMany();
    return recipes;
}