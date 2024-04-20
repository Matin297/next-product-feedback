import { FeedbackSortOption } from "@/lib/types";

import { Suspense } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import FeedbackSort from "@/components/home/feedback-sort";
import FeedbackList from "@/components/home/feedback-list";
import FeedbackListSkeleton from "@/components/home/feedback-list-skeleton";

interface HomeProps {
  searchParams?: FeedbackSortOption;
}

export default function Home({ searchParams }: HomeProps) {
  const field = searchParams?.field;
  const order = searchParams?.order;

  return (
    <Box display="flex" gap={5}>
      <Suspense
        key={`${field || ""}${order || ""}`}
        fallback={<FeedbackListSkeleton />}
      >
        <FeedbackList field={field} order={order} />
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
      </Box>
    </Box>
  );
}
