import { fetchFilteredFeedbacks } from "@/lib/data";

import { Suspense } from "react";
import Grid from "@mui/material/Grid";
import FeedbackColumn from "@/components/roadmap/feedback-column";
import FeedbackColumnSkeleton from "@/components/roadmap/feedback column-skeleton";

export default async function Roadmap() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Suspense fallback={<FeedbackColumnSkeleton />}>
          <FeedbackColumn
            color="orange"
            title="Planned"
            description="Ideas prioritized for research"
            fetchFeedbacks={fetchFilteredFeedbacks.bind(null, "PLANNED")}
          />
        </Suspense>
      </Grid>
      <Grid item xs={12} md={4}>
        <Suspense fallback={<FeedbackColumnSkeleton />}>
          <FeedbackColumn
            color="purple"
            title="In Progress"
            description="Currently being developed"
            fetchFeedbacks={fetchFilteredFeedbacks.bind(null, "IN_PROGRESS")}
          />
        </Suspense>
      </Grid>
      <Grid item xs={12} md={4}>
        <Suspense fallback={<FeedbackColumnSkeleton />}>
          <FeedbackColumn
            title="Live"
            color="skyblue"
            description="Released features"
            fetchFeedbacks={fetchFilteredFeedbacks.bind(null, "LIVE")}
          />
        </Suspense>
      </Grid>
    </Grid>
  );
}
