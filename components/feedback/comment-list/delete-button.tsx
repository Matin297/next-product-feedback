"use client";

import { Comment } from "@prisma/client";
import { deleteComment } from "@/actions";
import { useSession } from "next-auth/react";

import DeleteDialog from "@/components/common/delete-dialog";

interface DeleteCommentButtonProps {
  comment: Comment;
}

export default function DeleteCommentButton({
  comment,
}: DeleteCommentButtonProps) {
  const { data } = useSession();

  if (data?.user?.id !== comment.user_id) {
    return null;
  }

  return <DeleteDialog deleteAction={deleteComment.bind(null, comment)} />;
}
