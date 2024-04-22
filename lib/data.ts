import db from "@/prisma/client";
import { Status } from "@prisma/client";
import { FeedbackSortOption, FeedbackFilterOption } from "@/lib/types";

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
  orderOptions: FeedbackSortOption & FeedbackFilterOption = {}
) {
  try {
    const { field, order, categoryId } = orderOptions;

    const feedbacks = await db.feedback.findMany({
      ...(field &&
        order && {
          orderBy: {
            [field]: order,
          },
        }),
      where: {
        status,
        ...(categoryId && { category_id: categoryId }),
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

export async function fetchRoadmapSummary() {
  try {
    const summary = await db.feedback.groupBy({
      by: ["status"],
      where: {
        status: {
          not: "SUGGESTION",
        },
      },
      _count: {
        id: true,
      },
    });

    return summary.reduce<Partial<Record<Status, number>>>((acc, row) => {
      acc[row.status] = row._count.id;
      return acc;
    }, {});
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Roadmap summary!");
  }
}
