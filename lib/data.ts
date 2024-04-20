import db from "@/prisma/client";
import { Status } from "@prisma/client";
import { FeedbackSortOption } from "@/lib/types";

export async function fetchCategories() {
  try {
    const categories = await db.category.findMany();
    return categories;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch categories!");
  }
}

export async function fetchFeedbacksByStatus(
  status: Status = "SUGGESTION",
  orderOptions: FeedbackSortOption = {}
) {
  try {
    const { field, order } = orderOptions;

    const feedbacks = await db.feedback.findMany({
      ...(field &&
        order && {
          orderBy: {
            [field]: order,
          },
        }),
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
