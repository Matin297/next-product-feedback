import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import FeedbackList from "@/components/home/feedback-list";

export default function Home() {
  return (
    <div>
      <Button
        href="/feedback/create"
        variant="contained"
        startIcon={<AddIcon />}
      >
        Add Feedback
      </Button>
      <FeedbackList />
    </div>
  );
}
