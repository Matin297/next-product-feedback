"use client";

import { useReducer } from "react";

import CommentForm from "./comment-form";
import Button from "@mui/material/Button";

interface CommentReplyProps {
  feedbackId: string;
  parentId: string;
}

export default function CommentReply({
  parentId,
  feedbackId,
}: CommentReplyProps) {
  const [isOpen, toggleOpen] = useReducer((prev) => !prev, false);

  if (isOpen) {
    return (
      <CommentForm
        parentId={parentId}
        onSuccess={toggleOpen}
        feedbackId={feedbackId}
      >
        <Button variant="outlined" color="error" onClick={toggleOpen}>
          Cancel
        </Button>
      </CommentForm>
    );
  }

  return <Button onClick={toggleOpen}>Reply</Button>;
}
