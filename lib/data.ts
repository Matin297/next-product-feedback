import db from "@/prisma/client";
import { Status } from "@prisma/client";

export async function fetchCategories() {
  try {
    const categories = await db.category.findMany();
    return categories;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch categories!");
  }
}

export async function fetchFeedbacksByStatus(status: Status = "SUGGESTION") {
  try {
    const feedbacks = await db.feedback.findMany({
      where: {
        status: status,
      },
      include: {
        _count: {
          select: {
            comments: true,
          },
        },
        category: {
          select: {
            title: true,
          },
        },
      },
    });
    return feedbacks;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Feedbacks!");
  }
}
