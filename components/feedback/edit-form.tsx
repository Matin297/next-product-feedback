"use client";

import { Category, Status } from "@prisma/client";
import { FeedbackByIdReturnType } from "@/lib/data";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import FormButton from "@/components/form-button";
import FormControl from "@mui/material/FormControl";
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
  return (
    <Box
      gap={4}
      maxWidth={500}
      display="flex"
      component="form"
      marginInline="auto"
      flexDirection="column"
    >
      <Typography variant="h6">Feedback Info</Typography>
      <TextField
        required
        label="Title"
        defaultValue={feedback?.title || ""}
        helperText="Add a short, descriptive headline"
      />
      <FormControl fullWidth required>
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
        <FormHelperText>Choose a status for your feedback</FormHelperText>
      </FormControl>
      <FormControl fullWidth required>
        <InputLabel id="status">Status</InputLabel>
        <Select
          label="status"
          labelId="status"
          name="status_id"
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
        <FormHelperText>Choose a category for your feedback</FormHelperText>
      </FormControl>
      <TextField
        rows={8}
        multiline
        name="description"
        label="Description"
        defaultValue={feedback?.description || ""}
        helperText="Include any specific comments on what should be improved, added, etc."
      />
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button
          color="error"
          variant="outlined"
          href={`/feedback/${feedback?.id}`}
        >
          Cancel
        </Button>
        <FormButton>Submit</FormButton>
      </Box>
    </Box>
  );
}
