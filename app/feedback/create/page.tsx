import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

export default function CreateFeedback() {
  return (
    <Box
      maxWidth={500}
      marginInline="auto"
      component="form"
      display="flex"
      flexDirection="column"
      gap={4}
    >
      <Typography variant="h6">Feedback Details</Typography>
      <TextField
        required
        label="Title"
        name="title"
        helperText="Add a short, descriptive headline"
      />
      <FormControl fullWidth>
        <InputLabel id="category">Category</InputLabel>
        <Select required labelId="category" name="category" label="Category">
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Choose a category for your feedback</FormHelperText>
      </FormControl>
      <TextField
        required
        multiline
        rows={8}
        label="Description"
        name="description"
        helperText="Include any specific comments on what should be improved, added, etc."
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
}
