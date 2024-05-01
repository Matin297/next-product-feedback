import { FeedbacksByStatusType } from "@/lib/data";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import FeedbackCard from "@/components/common/feedback-card";

interface FeedbackColumnProps {
  title: string;
  description: string;
  fetchFeedbacks: () => Promise<FeedbacksByStatusType>;
}

export default async function FeedbackColumn({
  title,
  description,
  fetchFeedbacks,
}: FeedbackColumnProps) {
  const feedbacks = await fetchFeedbacks();

  return (
    <>
      <Box
        borderRadius={1}
        borderBottom={3}
        paddingBlockEnd={1}
        borderColor="orange"
      >
        <Typography variant="h6">
          {title}
          <Typography
            variant="subtitle1"
            marginInlineStart={1}
            display="inline-block"
          >
            ({feedbacks.length})
          </Typography>
        </Typography>
        <Typography color="GrayText" fontWeight="normal" variant="subtitle2">
          {description}
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
    </>
  );
}
