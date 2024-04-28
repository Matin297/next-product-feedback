"use server";

import { z } from "zod";
import { auth } from "@/auth";
import db from "@/prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Status } from "@prisma/client";

const EditFeedbackSchema = z.object({
  id: z.string().min(1),
  status: z.string().min(1),
  category_id: z.string().min(1),
  description: z.string().min(1),
  title: z.string().min(1).max(255),
});

interface EditFeedbackState {
  message?: string;
  errors?: {
    id?: string[];
    title?: string[];
    status?: string[];
    category_id?: string[];
    description?: string[];
  };
}

export async function editFeedback(
  _: EditFeedbackState,
  formData: FormData
): Promise<EditFeedbackState> {
  const validationResult = EditFeedbackSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validationResult.success) {
    const errors = validationResult.error.flatten().fieldErrors;
    if (errors.id) {
      return {
        message: "Feedback id is invalid.",
      };
    }

    return {
      message: "Validation Error.",
      errors,
    };
  }

  const session = await auth();

  if (!session?.user || !session.user.id) {
    return {
      message: "Authentication Error: please login first.",
    };
  }

  const { id, status, ...data } = validationResult.data;

  try {
    await db.feedback.update({
      where: {
        id,
      },
      data: {
        status: status as Status,
        ...data,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: "Server Error: Failed to edit feedback information.",
    };
  }

  revalidatePath("/");
  redirect("/");
}
