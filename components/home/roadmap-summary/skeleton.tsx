import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

export default function FeedbackListSkeleton() {
  return (
    <Card elevation={3}>
      <CardContent>
        <Typography fontWeight="bold" variant="body1" gutterBottom>
          Roadmap
        </Typography>
        <Skeleton width="100%" height={30} />
        <Skeleton width="100%" height={30} />
        <Skeleton width="100%" height={30} />
      </CardContent>
      <CardActions>
        <Button size="small" href="/roadmap">
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}
