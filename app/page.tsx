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
    <>
      <Box
        gap={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <FeedbackSort />
        <Button
          href="/feedback/create"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add Feedback
        </Button>
      </Box>
      <Suspense
        key={`${field || ""}${order || ""}`}
        fallback={<FeedbackListSkeleton />}
      >
        <FeedbackList field={field} order={order} />
      </Suspense>
    </>
  );
}
