import { Feedback } from "@prisma/client";

import Voting from "./voting";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

interface FeedbackCardProps extends Feedback {
  category: string;
  comments: number;
}

export default function FeedbackCard({
  id,
  upvotes,
  title,
  description,
  category,
  comments,
}: FeedbackCardProps) {
  return (
    <Card elevation={3} sx={{ width: "100%" }}>
      <CardContent component={Box} display="flex" gap={2}>
        <Voting id={id} upvotes={upvotes} />
        <Box flexGrow={1}>
          <Link underline="hover" href={`/feedback/${id}`}>
            <Typography variant="h6">{title}</Typography>
          </Link>
          <Typography marginBlock={2} variant="body1">
            {description}
          </Typography>
          <Chip label={category} color="secondary" />
        </Box>
        <Box alignSelf="flex-end" display="flex" alignItems="center" gap={1}>
          <ChatBubbleOutlineIcon color="action" />
          <Typography fontWeight="bold">{comments}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
