import { FeedbackSortOption, FeedbackFilterOption } from "@/lib/types";

import { Suspense } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import FeedbackSort from "@/components/home/feedback-sort";
import FeedbackList from "@/components/home/feedback-list";
import FeedbackFilter from "@/components/home/feedback-filter-wrapper";
import FeedbackListSkeleton from "@/components/home/feedback-list-skeleton";

interface HomeProps {
  searchParams?: FeedbackSortOption & FeedbackFilterOption;
}

export default function Home({ searchParams }: HomeProps) {
  const field = searchParams?.field;
  const order = searchParams?.order;
  const categoryId = searchParams?.categoryId;

  return (
    <Box display="flex" gap={5}>
      <Suspense
        key={`${field || ""}${order || ""}`}
        fallback={<FeedbackListSkeleton />}
      >
        <FeedbackList field={field} order={order} categoryId={categoryId} />
      </Suspense>
      <Box
        component="aside"
        minWidth={200}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <Button
          href="/feedback/create"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add Feedback
        </Button>
        <FeedbackSort />
        <FeedbackFilter />
      </Box>
    </Box>
  );
}
