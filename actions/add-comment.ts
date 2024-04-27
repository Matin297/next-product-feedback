"use server";

import { z } from "zod";
import { auth } from "@/auth";
import db from "@/prisma/client";
import { revalidatePath } from "next/cache";

const AddCommentSchema = z.object({
  parent_id: z.string(),
  feedback_id: z.string(),
  content: z.string().min(1),
});

interface AddCommentState {
  message?: string;
  errors?: {
    content?: string[];
  };
  successSubmitTimestamp?: number;
}

export async function addComment(
  _: AddCommentState,
  formData: FormData
): Promise<AddCommentState> {
  const validationResult = AddCommentSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validationResult.success) {
    const errors = validationResult.error.flatten().fieldErrors;

    if (errors["feedback_id"]) {
      return {
        message: "Missing feedback id.",
      };
    }

    return {
      message: "Validation Error!",
      errors,
    };
  }

  const session = await auth();

  if (!session?.user || !session.user.id) {
    return {
      message: "Authentication Error: please login first.",
    };
  }

  const { content, feedback_id, parent_id } = validationResult.data;

  try {
    await db.comment.create({
      data: {
        content,
        feedback_id,
        user_id: session.user.id,
        parent_id: parent_id || null,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: "Server Error: failed to create the comment.",
    };
  }

  revalidatePath(`/feedback/${feedback_id}`);

  return {
    successSubmitTimestamp: Date.now(),
  };
}
