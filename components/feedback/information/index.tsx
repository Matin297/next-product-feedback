import { notFound } from "next/navigation";
import { fetchFeedbackById } from "@/lib/data";

import FeedbackCard from "@/components/common/feedback-card";
import Skeleton from "./skeleton";

interface FeedbackInfoProps {
  feedbackId: string;
}

export default async function FeedbackInfo({ feedbackId }: FeedbackInfoProps) {
  const result = await fetchFeedbackById(feedbackId);

  if (!result) {
    return notFound();
  }

  const { category, _count, ...feedback } = result;

  return (
    <FeedbackCard
      {...feedback}
      category={category.title}
      comments={_count.comments}
    />
  );
}

export { Skeleton as FeedbackInfoSkeleton };
