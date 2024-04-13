import { fetchFeedbacksByStatus } from "@/lib/data";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export default async function FeedbackList() {
  const feedbacks = await fetchFeedbacksByStatus();

  return (
    <List>
      {feedbacks.map(({ id, title, description, upvotes, category }) => (
        <ListItem disableGutters key={id}>
          <Paper
            component={Box}
            elevation={3}
            width="100%"
            paddingBlock={2}
            paddingInline={1}
            paddingInlineEnd={2}
            gap={2}
            display="flex"
          >
            <Box
              alignSelf="flex-start"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <IconButton>
                <ArrowUpward />
              </IconButton>
              <Typography fontWeight="bold">{upvotes}</Typography>
            </Box>
            <Box>
              <Link underline="hover" href={`/feedback/1`}>
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
              <Typography fontWeight="bold">10</Typography>
            </Box>
          </Paper>
        </ListItem>
      ))}
    </List>
  );
}
