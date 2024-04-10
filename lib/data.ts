import db from "@/prisma/client";

export async function fetchCategories() {
  try {
    const categories = await db.category.findMany();
    return categories;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch categories!");
  }
}
