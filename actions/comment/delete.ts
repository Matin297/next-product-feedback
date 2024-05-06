"use server";

import { auth } from "@/auth";
import db from "@/prisma/client";
import { Comment } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function deleteComment(comment: Comment) {
  const { id, user_id, feedback_id } = comment;

  const session = await auth();

  if (!session || !session.user?.id) {
    return {
      error: "Authentication Error: please login first.",
    };
  }

  if (session.user.id !== user_id) {
    return {
      error: "Access Error: Delete permission denied.",
    };
  }

  try {
    await db.comment.deleteMany({
      where: {
        OR: [{ id }, { parent_id: id }],
      },
    });
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to delete the comment.",
    };
  }

  revalidatePath(`/feedback/${feedback_id}`);
}
