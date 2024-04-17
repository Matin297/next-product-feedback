"use client";

import { useFormState } from "react-dom";
import { Category } from "@prisma/client";
import { createFeedbackAction } from "@/actions";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormButton from "@/components/form-button";

interface CreateFeedbackFormProps {
  categories: Category[];
}

export default function CreateFeedbackForm({
  categories,
}: CreateFeedbackFormProps) {
  const [state, action] = useFormState(createFeedbackAction, {});

  return (
    <Box
      action={action}
      maxWidth={500}
      marginInline="auto"
      component="form"
      display="flex"
      flexDirection="column"
      gap={4}
    >
      {state.message && <Alert severity="error">{state.message}</Alert>}
      <Typography variant="h6">Feedback Details</Typography>
      <TextField
        label="Title"
        name="title"
        error={Boolean(state.errors?.title)}
        helperText={
          state.errors?.title
            ? state.errors?.title.join(", ")
            : "Add a short, descriptive headline"
        }
      />
      <FormControl fullWidth error={Boolean(state.errors?.category_id)}>
        <InputLabel id="category">Category</InputLabel>
        <Select
          defaultValue=""
          label="Category"
          name="category_id"
          labelId="category"
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
            : "Choose a category for your feedback"}
        </FormHelperText>
      </FormControl>
      <TextField
        multiline
        rows={8}
        label="Description"
        name="description"
        error={Boolean(state.errors?.description)}
        helperText={
          state.errors?.description
            ? state.errors?.description.join(", ")
            : "Include any specific comments on what should be improved, added, etc."
        }
      />
      <Box display="flex" gap={2} alignSelf="end">
        <Button variant="outlined" color="error" href="/">
          Cancel
        </Button>
        <FormButton>Submit</FormButton>
      </Box>
    </Box>
  );
}
