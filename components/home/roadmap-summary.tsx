import { fetchRoadmapSummary } from "@/lib/data";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

export default async function FeedbackRoadmap() {
  const summary = await fetchRoadmapSummary();

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography fontWeight="bold" variant="body1" marginBlockEnd={2}>
          Roadmap
        </Typography>
        <Box display="flex" justifyContent="space-between" marginBlockEnd={1}>
          <Typography variant="body2">Planned</Typography>
          <Typography color="orange" fontWeight="bold" variant="body1">
            {summary.PLANNED}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" marginBlockEnd={1}>
          <Typography variant="body2">In Progress</Typography>
          <Typography color="purple" fontWeight="bold" variant="body1">
            {summary.IN_PROGRESS}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Live</Typography>
          <Typography color="skyblue" fontWeight="bold" variant="body1">
            {summary.LIVE}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" href="/roadmap">
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}
