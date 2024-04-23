import { fetchFeedbacksByStatus } from "@/lib/data";
import { FeedbackSortOption, FeedbackFilterOption } from "@/lib/types";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import FeedbackCard from "@/components/feedback-card";
import Skeleton from "./skeleton";

interface FeedbackListProps extends FeedbackSortOption, FeedbackFilterOption {}

export default async function FeedbackList({
  order,
  field,
  categoryId,
}: FeedbackListProps) {
  const feedbacks = await fetchFeedbacksByStatus("SUGGESTION", {
    field,
    order,
    categoryId,
  });

  return (
    <Box flexGrow={1}>
      <Box>
        <Typography variant="h4" color="secondary" display="inline-block">
          {feedbacks.length}
        </Typography>
        <Typography marginInlineStart={1} display="inline-block">
          {`Suggestion${feedbacks.length > 1 ? "s" : ""}`}
        </Typography>
      </Box>
      <List>
        {feedbacks.map(({ category, _count, ...feedback }) => (
          <ListItem disableGutters key={feedback.id}>
            <FeedbackCard
              {...feedback}
              category={category.title}
              comments={_count.comments}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export { Skeleton as FeedbackListSkeleton };
