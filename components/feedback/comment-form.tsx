"use client";

import { useRef, useEffect } from "react";
import { useFormState } from "react-dom";
import { addComment } from "@/actions";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import FormButton from "@/components/form-button";

interface CommentFormProps {
  parentId?: string;
  feedbackId: string;
}

export default function CommentForm({
  parentId,
  feedbackId,
}: CommentFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action] = useFormState(addComment, {});

  useEffect(() => {
    if (state.successSubmitTimestamp) {
      formRef.current?.reset();
    }
  }, [state.successSubmitTimestamp]);

  return (
    <Box component="form" action={action} ref={formRef}>
      {state.message && <Alert severity="error">{state.message}</Alert>}
      <TextField
        rows={6}
        required
        multiline
        name="content"
        label="Comment"
        sx={{ width: "100%", marginBlock: 2 }}
        error={Boolean(state.errors?.content)}
        helperText={state.errors?.content ? state.errors?.content[0] : ""}
      />
      <input type="hidden" name="parent_id" value={parentId} />
      <input type="hidden" name="feedback_id" value={feedbackId} />

      <Box display="flex" justifyContent="flex-end">
        <FormButton>Submit</FormButton>
      </Box>
    </Box>
  );
}
