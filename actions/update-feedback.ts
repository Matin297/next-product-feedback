"use server";

import { revalidatePath } from "next/cache";
import db from "@/prisma/client";

export async function updateVotes(id: string, votes: number) {
  try {
    await db.feedback.update({
      where: {
        id,
      },
      data: {
        upvotes: votes,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to update feedback votes!",
    };
  }

  revalidatePath("/");
}
