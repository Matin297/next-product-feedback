"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import db from "@/prisma/client";
import { auth } from "@/auth";

const CreateFeedbackSchema = z
  .object({
    title: z.string().min(1).max(255),
    category_id: z.string().min(1, "Please select a category"),
    description: z.string().min(1),
  })
  .required();

interface CreateFeedbackState {
  message?: string;
  errors?: {
    title?: string[];
    description?: string[];
    category_id?: string[];
  };
}

export async function createFeedbackAction(
  _: CreateFeedbackState,
  formData: FormData
): Promise<CreateFeedbackState> {
  const validationResult = CreateFeedbackSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validationResult.success) {
    return {
      message: "Validation Error",
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { title, description, category_id } = validationResult.data;

  const session = await auth();

  if (!session || !session.user?.id) {
    return {
      message: "Authentication Error: please login first.",
    };
  }

  try {
    await db.feedback.create({
      data: {
        title,
        description,
        category_id,
        user_id: session.user.id,
      },
    });
  } catch {
    return {
      message: "Server Error: Failed to create the feedback!",
    };
  }

  revalidatePath("/");
  redirect("/");
}
