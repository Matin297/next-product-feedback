import { fetchCategories, fetchFeedbackById } from "@/lib/data";

import EditFeedbackForm from "@/components/feedback/edit-form";

interface EditFeedbackProps {
  params: {
    id: string;
  };
}

export default async function EditFeedback({ params }: EditFeedbackProps) {
  const [categories, feedback] = await Promise.all([
    fetchCategories(),
    fetchFeedbackById(params.id),
  ]);

  return <EditFeedbackForm feedback={feedback} categories={categories} />;
}
