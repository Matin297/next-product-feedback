import { cache } from "react";
import db from "@/prisma/client";
import { Status } from "@prisma/client";
import {
  FeedbackSortOption,
  FeedbackFilterOption,
  FeedbackPaginationOptions,
} from "@/lib/types";

export async function fetchCategories() {
  try {
    const categories = await db.category.findMany();
    return categories;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch categories!");
  }
}

const ITEMS_PER_PAGE = 6;

export async function fetchTotalFilteredFeedbackPages(
  status: Status = "SUGGESTION",
  orderOptions: FeedbackFilterOption = {}
) {
  try {
    const { categoryId } = orderOptions;

    const total = await db.feedback.aggregate({
      where: {
        status,
        ...(categoryId && { category_id: categoryId }),
      },
      _count: {
        id: true,
      },
    });

    return Math.ceil(total._count.id / ITEMS_PER_PAGE);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch total pages for feedbacks!");
  }
}

export type FilteredFeedbacksType = Awaited<
  ReturnType<typeof fetchFilteredFeedbacks>
>;

export async function fetchFilteredFeedbacks(
  status: Status = "SUGGESTION",
  orderOptions: FeedbackSortOption &
    FeedbackFilterOption &
    FeedbackPaginationOptions = {}
) {
  try {
    const { field, order, categoryId, page } = orderOptions;

    const feedbacks = await db.feedback.findMany({
      ...(field &&
        order && {
          orderBy: {
            ...(field === "comments"
              ? { comments: { _count: order } }
              : { [field]: order }),
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
      ...(page && {
        skip: (page - 1) * ITEMS_PER_PAGE,
        take: ITEMS_PER_PAGE,
      }),
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

export type FeedbackByIdReturnType = Awaited<
  ReturnType<typeof fetchFeedbackById>
>;

export async function fetchFeedbackById(id: string) {
  try {
    const feedback = await db.feedback.findFirst({
      where: {
        id,
      },
      include: {
        category: {
          select: { title: true },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    return feedback;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch the feedback!");
  }
}

export const fetchFeedbackComments = cache(async (feedbackId: string) => {
  try {
    const comments = await db.comment.findMany({
      where: {
        feedback_id: feedbackId,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            email: true,
          },
        },
      },
    });

    return comments;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch feedback comments!");
  }
});
