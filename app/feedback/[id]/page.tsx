import { Suspense } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import FeedbackInfo, {
  FeedbackInfoSkeleton,
} from "@/components/feedback/information";
import CommentList, {
  CommentListSkeleton,
} from "@/components/feedback/comment-list";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CommentForm from "@/components/feedback/comment-form";

interface FeedbackDetailsProps {
  params: {
    id: string;
  };
}

export default async function FeedbackDetails({
  params,
}: FeedbackDetailsProps) {
  return (
    <Stack spacing={5}>
      <Box>
        <Box display="flex" alignItems="center" gap={1} marginBlockEnd={2}>
          <Typography variant="h6">Feedback Details</Typography>
          <IconButton
            size="small"
            color="secondary"
            href={`/feedback/${params.id}/edit`}
          >
            <EditIcon />
          </IconButton>
        </Box>
        <Suspense fallback={<FeedbackInfoSkeleton />}>
          <FeedbackInfo feedbackId={params.id} />
        </Suspense>
      </Box>

      <CommentForm feedbackId={params.id} />

      <Box>
        <Typography variant="h6">Comments</Typography>
        <Suspense fallback={<CommentListSkeleton />}>
          <CommentList feedbackId={params.id} />
        </Suspense>
      </Box>
    </Stack>
  );
}
