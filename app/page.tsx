import { FeedbackSortOption, FeedbackFilterOption } from "@/lib/types";

import { Suspense } from "react";
import Box from "@mui/material/Box";
import FeedbackSort from "@/components/home/feedback-sort";
import FeedbackList, {
  FeedbackListSkeleton,
} from "@/components/home/feedback-list";
import RoadmapSummary, {
  RoadmapSummarySkeleton,
} from "@/components/home/roadmap-summary";
import FeedbackFilter from "@/components/home/feedback-filter";

interface HomeProps {
  searchParams?: FeedbackSortOption & FeedbackFilterOption & { page?: string };
}

export default function Home({ searchParams }: HomeProps) {
  const field = searchParams?.field;
  const order = searchParams?.order;
  const categoryId = searchParams?.categoryId;
  const page = Number(searchParams?.page) || 1;

  return (
    <Box display="flex" gap={5}>
      <Suspense
        key={`${field || ""}${order || ""}${categoryId || ""}${page}`}
        fallback={<FeedbackListSkeleton />}
      >
        <FeedbackList
          page={page}
          field={field}
          order={order}
          categoryId={categoryId}
        />
      </Suspense>
      <Box
        component="aside"
        width="100%"
        maxWidth={250}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <FeedbackSort />
        <FeedbackFilter />
        <Suspense fallback={<RoadmapSummarySkeleton />}>
          <RoadmapSummary />
        </Suspense>
      </Box>
    </Box>
  );
}
