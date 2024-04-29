"use client";

import { useFormState } from "react-dom";
import { editFeedback } from "@/actions";
import { deleteFeedback } from "@/actions";
import { Category, Status } from "@prisma/client";
import { FeedbackByIdReturnType } from "@/lib/data";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import FormButton from "@/components/form-button";
import FormControl from "@mui/material/FormControl";
import DeleteDialog from "@/components/delete-dialog";
import FormHelperText from "@mui/material/FormHelperText";

interface CreateFeedbackFormProps {
  categories: Category[];
  feedback: FeedbackByIdReturnType;
}

const STATUS: Status[] = ["SUGGESTION", "PLANNED", "IN_PROGRESS", "LIVE"];

export default function EditFeedbackForm({
  feedback,
  categories,
}: CreateFeedbackFormProps) {
  const [state, action] = useFormState(editFeedback, {});

  return (
    <Box
      gap={4}
      maxWidth={500}
      display="flex"
      action={action}
      component="form"
      marginInline="auto"
      flexDirection="column"
    >
      {state.message && <Alert severity="error">{state.message}</Alert>}
      <input type="hidden" name="id" value={feedback?.id} />
      <DeleteDialog deleteAction={deleteFeedback.bind(null, feedback?.id)} />
      <Typography variant="h6">Feedback Info</Typography>
      <TextField
        required
        name="title"
        label="Title"
        defaultValue={feedback?.title || ""}
        error={Boolean(state.errors?.title)}
        helperText={
          state.errors?.title
            ? state.errors?.title.join(", ")
            : "Add a short, descriptive headline."
        }
      />
      <FormControl
        fullWidth
        required
        error={Boolean(state.errors?.category_id)}
      >
        <InputLabel id="category">Category</InputLabel>
        <Select
          label="Category"
          labelId="category"
          name="category_id"
          defaultValue={feedback?.category_id || ""}
        >
          {categories.map(({ id, title }) => (
            <MenuItem key={id} value={id}>
              {title}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {state.errors?.category_id
            ? state.errors?.category_id.join(", ")
            : "Choose a category for your feedback."}
        </FormHelperText>
      </FormControl>
      <FormControl fullWidth required error={Boolean(state.errors?.status)}>
        <InputLabel id="status">Status</InputLabel>
        <Select
          name="status"
          label="status"
          labelId="status"
          defaultValue={feedback?.status || ""}
          sx={{ textTransform: "capitalize" }}
        >
          {STATUS.map((status) => (
            <MenuItem
              key={status}
              value={status}
              sx={{ textTransform: "capitalize" }}
            >
              {status.toLocaleLowerCase()}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {state.errors?.status
            ? state.errors?.status.join(", ")
            : "Choose a status for your feedback."}
        </FormHelperText>
      </FormControl>
      <TextField
        rows={8}
        multiline
        name="description"
        label="Description"
        defaultValue={feedback?.description || ""}
        error={Boolean(state.errors?.description)}
        helperText={
          state.errors?.description
            ? state.errors?.description.join(", ")
            : "Include any specific comments on what should be improved, added, etc."
        }
      />
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button
          color="error"
          variant="outlined"
          href={`/feedback/${feedback?.id}`}
        >
          Cancel
        </Button>
        <FormButton>Save</FormButton>
      </Box>
    </Box>
  );
}
