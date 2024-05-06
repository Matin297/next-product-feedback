"use server";

import { auth } from "@/auth";
import db from "@/prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function deleteFeedback(id?: string) {
  if (!id) {
    return {
      error: "Feedback id is invalid. Please try again.",
    };
  }

  const session = await auth();

  if (!session || !session.user?.id) {
    return {
      error: "Authentication Error: please login first.",
    };
  }

  try {
    await db.feedback.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      error: "Server Error: Failed to delete the feedback!",
    };
  }

  revalidatePath("/");
  redirect("/");
}
