import { fetchFeedbacksByStatus } from "@/lib/data";

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
            title="Planned"
            description="Ideas prioritized for research"
            fetchFeedbacks={fetchFeedbacksByStatus.bind(null, "PLANNED")}
          />
        </Suspense>
      </Grid>
      <Grid item xs={12} md={4}>
        <Suspense fallback={<FeedbackColumnSkeleton />}>
          <FeedbackColumn
            title="In Progress"
            description="Currently being developed"
            fetchFeedbacks={fetchFeedbacksByStatus.bind(null, "IN_PROGRESS")}
          />
        </Suspense>
      </Grid>
      <Grid item xs={12} md={4}>
        <Suspense fallback={<FeedbackColumnSkeleton />}>
          <FeedbackColumn
            title="Live"
            description="Released features"
            fetchFeedbacks={fetchFeedbacksByStatus.bind(null, "LIVE")}
          />
        </Suspense>
      </Grid>
    </Grid>
  );
}
