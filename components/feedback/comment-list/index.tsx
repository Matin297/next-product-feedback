import { fetchFeedbackComments } from "@/lib/data";

import Skeleton from "./skeleton";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CommentReply from "../comment-reply";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import DeleteCommentButton from "./delete-button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

interface CommentListProps {
  parentId?: string;
  feedbackId: string;
}

export default async function CommentList({
  feedbackId,
  parentId,
}: CommentListProps) {
  const comments = await fetchFeedbackComments(feedbackId);

  return (
    <List>
      {comments
        .filter((comment) => comment.parent_id === (parentId || null))
        .map((comment) => (
          <ListItem key={comment.id}>
            <Card variant="outlined" sx={{ width: "100%" }}>
              <CardContent>
                <Box display="flex" gap={2}>
                  <Avatar src={comment.user.image || ""} />
                  <Box>
                    <Typography variant="subtitle2">
                      {comment.user.name}
                    </Typography>
                    <Typography variant="caption">
                      {comment.user.email}
                    </Typography>
                  </Box>
                  <Box marginInlineStart="auto">
                    <DeleteCommentButton comment={comment} />
                  </Box>
                </Box>
                <Typography marginBlockStart={3}>{comment.content}</Typography>
              </CardContent>
              <CardActions>
                <CommentReply feedbackId={feedbackId} parentId={comment.id} />
              </CardActions>
              <CommentList feedbackId={feedbackId} parentId={comment.id} />
            </Card>
          </ListItem>
        ))}
    </List>
  );
}

export { Skeleton as CommentListSkeleton };
