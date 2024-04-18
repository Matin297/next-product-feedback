import { fetchFeedbacksByStatus } from "@/lib/data";

import Voting from "./voting";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export default async function FeedbackList() {
  const feedbacks = await fetchFeedbacksByStatus();

  return (
    <List>
      {feedbacks.map(
        ({ id, title, description, upvotes, category, _count }) => (
          <ListItem disableGutters key={id}>
            <Paper
              component={Box}
              width="100%"
              display="flex"
              gap={2}
              elevation={3}
              paddingBlock={2}
              paddingInline={1}
              paddingInlineEnd={2}
            >
              <Voting id={id} upvotes={upvotes} />
              <Box>
                <Link underline="hover" href={`/feedback/${id}`}>
                  <Typography variant="h6">{title}</Typography>
                </Link>
                <Typography marginBlock={2} variant="body1">
                  {description}
                </Typography>
                <Chip label={category.title} color="secondary" />
              </Box>
              <Box
                alignSelf="flex-end"
                display="flex"
                alignItems="center"
                gap={1}
              >
                <ChatBubbleOutlineIcon color="action" />
                <Typography fontWeight="bold">{_count.comments}</Typography>
              </Box>
            </Paper>
          </ListItem>
        )
      )}
    </List>
  );
}
