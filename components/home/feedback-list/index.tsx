import {
  fetchFilteredFeedbacks,
  fetchTotalFilteredFeedbackPages,
} from "@/lib/data";
import { FeedbackSortOption, FeedbackFilterOption } from "@/lib/types";

import Skeleton from "./skeleton";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Tooltip from "@mui/material/Tooltip";
import ListItem from "@mui/material/ListItem";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FeedbackCard from "@/components/common/feedback-card";
import Pagination from "@/components/common/pagination/wrapper";

interface FeedbackListProps extends FeedbackSortOption, FeedbackFilterOption {
  page: number;
}

export default async function FeedbackList({
  page,
  order,
  field,
  query,
  categoryId,
}: FeedbackListProps) {
  const feedbacks = await fetchFilteredFeedbacks("SUGGESTION", {
    page,
    field,
    order,
    query,
    categoryId,
  });

  return (
    <Box flexGrow={1}>
      <Box display="flex" alignItems="center">
        <Typography variant="h6">Suggestions</Typography>
        <Tooltip title="Add Feedback">
          <IconButton color="secondary" href="/feedback/create">
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <List>
        {feedbacks.map(({ category, _count, ...feedback }) => (
          <ListItem disableGutters key={feedback.id} sx={{ width: "100%" }}>
            <FeedbackCard
              {...feedback}
              category={category.title}
              comments={_count.comments}
            />
          </ListItem>
        ))}
      </List>
      <Pagination
        fetchTotalPages={fetchTotalFilteredFeedbackPages.bind(
          null,
          "SUGGESTION",
          { categoryId, query }
        )}
      />
    </Box>
  );
}

export { Skeleton as FeedbackListSkeleton };
